import { useState } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import marker from "../assets/marker.svg";
import styles from "../styles/monitoringStationMarker.module.scss";

const MonitoringStationMarker = ({ station, info }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div>
      {isOverlayOpen && (
        <CustomOverlayMap position={station}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.gu}>{info.gu}</div>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className={styles.closeButton}
              >
                X
              </button>
            </div>
            <div className={styles.body}>
              <div className={styles.label}>{info.label}:</div>
              <div className={styles.value}>{info.value}</div>
              <div className={styles.status}>{info.status}</div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
      <MapMarker
        position={station}
        image={{
          src: marker,
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
