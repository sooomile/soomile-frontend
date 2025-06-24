import { useState } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import marker from "../assets/marker.svg";
import markerNone from "../assets/marker-none.svg";
import styles from "../styles/monitoringStationMarker.module.scss";

const MonitoringStationMarker = ({ info, selectedStation }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // info 객체가 유효하고, lat, lng 속성이 있을 때만 렌더링
  if (!info || !info.latitude || !info.longitude) {
    return null;
  }

  const position = { lat: info.latitude, lng: info.longitude };

  const isSelected =
    selectedStation.station_name === info.구이름 ||
    selectedStation === info.구이름;

  return (
    <div>
      {isOverlayOpen && (
        <CustomOverlayMap position={position}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.gu}>{info.구이름}</div>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className={styles.closeButton}
              >
                X
              </button>
            </div>
            <div className={styles.body}>
              <div className={styles.label}>미세먼지(PM-10):</div>
              <div className={styles.value}>{info.pm10}㎍/㎥</div>
              <div className={styles.status}>{info.grade}</div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
      <MapMarker
        position={position}
        image={{
          src: isSelected ? marker : markerNone,
          size: {
            width: 28,
            height: 40,
          },
          options: {
            offset: {
              x: 14,
              y: 40,
            },
          },
        }}
        onClick={() => setIsOverlayOpen(true)}
      ></MapMarker>
    </div>
  );
};

export default MonitoringStationMarker;
