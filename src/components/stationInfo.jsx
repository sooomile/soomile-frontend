import styles from "../styles/stationInfo.module.scss";
import useStore from "../hooks/store";
import { useEffect, useState } from "react";

const StationInfo = () => {
  const selectedStation = useStore((state) => state.selectedStation);
  const stationInfo = useStore((state) => state.stationInfo);

  const [airQuality, setAirQuality] = useState({
    pm10: 0,
    pm25: 0,
    grade: "",
  });

  // 선택한 측정소 정보와 측정소 배열을 비교하여 측정소 정보를 가져옴
  useEffect(() => {
    if (stationInfo && selectedStation && selectedStation.station_name) {
      const matchedStation = stationInfo.find(
        (station) => station.구이름 === selectedStation.station_name
      );
      if (matchedStation) {
        setAirQuality(matchedStation);
      }
    }
  }, [selectedStation, stationInfo]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.gu}>{selectedStation.station_name}</div>
        <div className={styles.address}>{selectedStation.address}</div>
        <div className={styles.distance}>{selectedStation.distance}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <div className={styles.pm}>
            <div className={styles.wraper}>
              <div className={styles.label}>미세먼지</div>
              <div className={styles.value}>{airQuality.pm10}㎍/㎥</div>
            </div>
            <div className={styles.status}>{airQuality.grade}</div>
          </div>
          <div className={styles.pm}>
            <div className={styles.wraper}>
              <div className={styles.label}>초미세먼지</div>
              <div className={styles.value} style={{ color: "#FF6C6C" }}>
                {airQuality.pm25}㎍/㎥
              </div>
            </div>
            <div
              className={styles.status}
              style={{ backgroundColor: "#FF6C6C" }}
            >
              {airQuality.grade}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        외출 시에는 반드시 보건용 마스크를 착용하고, 외출 후에는 깨끗이 손과
        얼굴을 씻으십시오.
      </div>
    </div>
  );
};

export default StationInfo;
