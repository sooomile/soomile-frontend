import styles from "../styles/stationInfo.module.scss";

const StationInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.gu}>성북구</div>
        <div className={styles.address}>
          서울 성북구 삼양로 2길 70 길음2동 주민센터
        </div>
        <div className={styles.distance}>400m</div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <div className={styles.pm}>
            <div className={styles.wraper}>
              <div className={styles.label}>미세먼지</div>
              <div className={styles.value}>23㎍/㎥</div>
            </div>
            <div className={styles.status}>보통</div>
          </div>
          <div className={styles.pm}>
            <div className={styles.wraper}>
              <div className={styles.label}>초미세먼지</div>
              <div className={styles.value} style={{ color: "#FF6C6C" }}>
                23㎍/㎥
              </div>
            </div>
            <div
              className={styles.status}
              style={{ backgroundColor: "#FF6C6C" }}
            >
              매우나쁨
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
