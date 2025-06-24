import React, { useState, useEffect } from "react";
import styles from "../styles/fineDustForecast.module.scss";
import { ReactComponent as GoodIcon } from "../assets/good.svg";
import { ReactComponent as NormalIcon } from "../assets/normar.svg";
import { ReactComponent as BadIcon } from "../assets/bad.svg";
import { ReactComponent as VeryBadIcon } from "../assets/very bad.svg";
import useStore from "../hooks/store";
import getFineDustForecast from "../api/api/fineDust/fineDustForecastApi";
import getFineDustForecastByLocation from "../api/api/fineDust/fineDustForecastByLocationApi";

const FineDustForecast = () => {
  const currentLocation = useStore((state) => state.currentLocation);
  const selectedDaycareCenter = useStore((state) => state.selectedDaycareCenter);
  const [currentDate, setCurrentDate] = useState("");
  const [forecastData, setForecastData] = useState([
    { day: "오늘", pm10: null, grade: null },
    { day: "내일", pm10: null, grade: null },
    { day: "모레", pm10: null, grade: null },
  ]);
  const [error, setError] = useState(null);

  // 미세먼지 농도에 따른 등급 판정 함수
  const getGrade = (pm10) => {
    if (pm10 <= 30) return "좋음";
    if (pm10 <= 80) return "보통";
    if (pm10 <= 150) return "나쁨";
    return "매우나쁨";
  };

  // 등급에 따른 아이콘 컴포넌트 반환
  const getGradeIcon = (grade) => {
    switch (grade) {
      case "좋음":
        return <GoodIcon className={styles.gradeIcon} />;
      case "보통":
        return <NormalIcon className={styles.gradeIcon} />;
      case "나쁨":
        return <BadIcon className={styles.gradeIcon} />;
      case "매우나쁨":
        return <VeryBadIcon className={styles.gradeIcon} />;
      default:
        return null;
    }
  };

  // 등급에 따른 색상 반환
  const getGradeColor = (grade) => {
    switch (grade) {
      case "좋음":
        return "#85EA47";
      case "보통":
        return "#93C5FF";
      case "나쁨":
        return "#ECFF96";
      case "매우나쁨":
        return "#FF6C6C";
      default:
        return "#dee2e6";
    }
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    setCurrentDate(`${year}년 ${month}월 ${day}일 ${hours}시 기준`);
  }, []);

  useEffect(() => {
    if (selectedDaycareCenter?.id) {
      getFineDustForecast(selectedDaycareCenter.id).then((result) => {
        if (result.success) {
          // API 응답 데이터를 오늘/내일/모레에 매핑
          // 서버에서 받은 데이터 구조에 따라 조정 필요
          const mapped = [0, 1, 2].map((idx) => {
            const dayLabels = ["오늘", "내일", "모레"];
            const pm10 = result.data[idx]?.pm10 || null;
            return {
              day: dayLabels[idx],
              pm10: pm10,
              grade: pm10 ? getGrade(pm10) : null,
            };
          });
          setForecastData(mapped);
          setError(null);
        } else {
          setError(result.error);
          setForecastData([
            { day: "오늘", pm10: null, grade: null },
            { day: "내일", pm10: null, grade: null },
            { day: "모레", pm10: null, grade: null },
          ]);
        }
      });
    } else if (currentLocation?.lat && currentLocation?.lng) {
      getFineDustForecastByLocation(currentLocation.lat, currentLocation.lng).then((result) => {
        if (result.success) {
          // API에서 grade, pm10 모두 제공
          const today = new Date();
          const days = [0, 1, 2].map(i => {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            return d.toISOString().slice(0, 10);
          });
          const dayLabels = ["오늘", "내일", "모레"];
          const mapped = days.map((dateStr, idx) => {
            const found = result.data.find(d => d.date === dateStr);
            return {
              day: dayLabels[idx],
              pm10: found ? found.pm10 : null,
              grade: found ? found.grade : null,
            };
          });
          setForecastData(mapped);
          setError(null);
        } else {
          setError(result.error);
          setForecastData([
            { day: "오늘", pm10: null, grade: null },
            { day: "내일", pm10: null, grade: null },
            { day: "모레", pm10: null, grade: null },
          ]);
        }
      });
    }
  }, [selectedDaycareCenter, currentLocation]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.highlight}>미세먼지</span> 예보
        </h3>
        <span className={styles.date}>{currentDate}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.content}>
        {forecastData.map(({ day, grade }, idx) => (
          <div key={day} className={styles.forecastItem}>
            <div
              className={
                styles.tab +
                " " +
                (idx === 0
                  ? styles.today
                  : idx === 1
                  ? styles.tomorrow
                  : idx === 2
                  ? styles.dayAfter
                  : "")
              }
            >
              {day}
            </div>
            {grade ? (
              <div className={styles.forecastContent}>
                {getGradeIcon(grade)}
                <span className={styles.gradeText}>{grade}</span>
              </div>
            ) : (
              <div className={styles.unavailable}>
                <span>{day === "모레" ? "17시 이후 제공" : "점검중"}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default FineDustForecast;
