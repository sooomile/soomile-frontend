import React, { useState, useEffect } from "react";
import styles from "../styles/airQualityInfo.module.scss";
import getAirQualityByLocation from "../api/api/airQuality/airQualityApi";
import { transformAirQualityData } from "../api/utils/transformData";

const AirQualityInfo = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 대기질 등급에 따른 상태 점 색상
  const getStatusDotColor = (grade) => {
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

  // 농도 값에 따른 글자 색상
  const getValueColor = (type, value) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) return "#212529"; // 기본 색상

    if (type === "pm25") {
      if (numericValue <= 15) return "#85EA47"; // 좋음
      if (numericValue <= 35) return "#93C5FF"; // 보통
      if (numericValue <= 75) return "#ECFF96"; // 나쁨
      return "#FF6C6C"; // 매우나쁨
    }
    if (type === "pm10") {
      if (numericValue <= 30) return "#85EA47"; // 좋음
      if (numericValue <= 80) return "#93C5FF"; // 보통
      if (numericValue <= 150) return "#ECFF96"; // 나쁨
      return "#FF6C6C"; // 매우나쁨
    }
    return "#212529"; // 기본 색상
  };

  useEffect(() => {
    const fetchAirQualityData = async (lat, lng) => {
      try {
        setLoading(true);
        setError(null);

        const result = await getAirQualityByLocation(lat, lng);

        if (result.success) {
          const transformedData = transformAirQualityData(result.data);
          setAirQualityData(transformedData);
        } else {
          setError(result.error || "대기질 정보를 불러오는 데 실패했습니다.");
          setAirQualityData(null);
        }
      } catch (err) {
        setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setAirQualityData(null);
        console.error("대기질 정보 조회 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetchAirQualityData(lat, lng);
      },
      (err) => {
        console.error("위치 정보를 가져오는 데 실패했습니다:", err);
        // 위치 정보 실패 시 기본 좌표(서울시청)로 API 호출
        fetchAirQualityData(37.5665, 126.978);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error || !airQualityData) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error || "데이터를 불러올 수 없습니다."}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>
            <span className={styles.highlight}>{airQualityData.district}</span>{" "}
            대기질 정보
            <div
              className={styles.statusDot}
              style={{
                backgroundColor: getStatusDotColor(airQualityData.grade),
              }}
            ></div>
          </h3>
        </div>
        <span className={styles.date}>{airQualityData.date} 기준</span>
      </div>
      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <span className={styles.label}>{airQualityData.pm25.label}</span>
          <span
            className={styles.value}
            style={{ color: getValueColor("pm25", airQualityData.pm25.value) }}
          >
            {airQualityData.pm25.value}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>{airQualityData.pm10.label}</span>
          <span
            className={styles.value}
            style={{ color: getValueColor("pm10", airQualityData.pm10.value) }}
          >
            {airQualityData.pm10.value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AirQualityInfo;
