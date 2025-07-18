import styles from "../styles/pmLegend.module.scss";

const PmLegend = () => {
  const goToCleanAir = () => {
    window.open(
      "https://cleanair.seoul.go.kr/information/info12#emergency-response"
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span style={{ color: "#4A3AFF" }}>미세먼지</span> 범례
        </div>
        <div className={styles.modalButton} onClick={goToCleanAir}>
          미세먼지 예보등급 기준 보러가기 -{`>`}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bar}>
          <div className={styles.barItem}>점검중</div>
          <div
            className={styles.barItem}
            style={{ backgroundColor: "#85EA47" }}
          >
            좋음
          </div>
          <div
            className={styles.barItem}
            style={{ backgroundColor: "#93C5FF" }}
          >
            보통
          </div>
          <div
            className={styles.barItem}
            style={{ backgroundColor: "#FFC196" }}
          >
            나쁨
          </div>
          <div
            className={styles.barItem}
            style={{ backgroundColor: "#FF6C6C" }}
          >
            매우나쁨
          </div>
        </div>
        {/* <div className={styles.caption}>
          <div className={styles.captionItem}></div>
          <div className={styles.captionItem}>0-30</div>
          <div className={styles.captionItem}>31-80</div>
          <div className={styles.captionItem}>81-150</div>
          <div className={styles.captionItem}>150 초과</div>
        </div> */}
      </div>
    </div>
  );
};

export default PmLegend;
