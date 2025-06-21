import React from "react";
import styles from "../styles/contentComp.module.scss";

const ContentComp = ({ center, isDummy }) => {
  const itemClass = isDummy
    ? `${styles.item} ${styles.invisible}`
    : styles.item;

  return (
    <div className={itemClass} key={center.id}>
      <div className={styles.name}>{center.daycare_name}</div>
      <div className={styles.address}>{center.address}</div>
      <div className={styles.distance}>{center.distance}m</div>
    </div>
  );
};

export default ContentComp;
