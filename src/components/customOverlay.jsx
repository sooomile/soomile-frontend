import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styles from "../styles/customOverlay.module.scss";

const CustomOverlay = ({ station, info, setIsOverlayOpen }) => {
  return (
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
  );
};

export default CustomOverlay;
