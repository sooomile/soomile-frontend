import React, { useState, useEffect } from "react";
import styles from "../styles/fineDustForecast.module.scss";
import { ReactComponent as GoodIcon } from "../assets/good.svg";
import { ReactComponent as VeryBadIcon } from "../assets/very bad.svg";

const FineDustForecast = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    setCurrentDate(`${year}년 ${month}월 ${day}일 ${hours}시 기준`);
  }, []);

  const forecastData = [
    { day: "오늘", Icon: VeryBadIcon, status: "매우나쁨", type: "today" },
    { day: "내일", Icon: GoodIcon, status: "좋음", type: "tomorrow" },
    { day: "모레", status: "17시 이후 제공", type: "dayAfter" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.highlight}>초미세먼지</span> 예보
        </h3>
        <span className={styles.date}>{currentDate}</span>
      </div>
      <div className={styles.content}>
        {forecastData.map(({ day, Icon, status, type }) => (
          <div key={day} className={styles.forecastItem}>
            <span className={`${styles.dayLabel} ${styles[type]}`}>{day}</span>
            {Icon ? (
              <>
                <Icon className={styles.icon} />
                <span className={styles.fineDustStatus}>{status}</span>
              </>
            ) : (
              <div className={styles.unavailable}>
                <span>{status}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FineDustForecast;
