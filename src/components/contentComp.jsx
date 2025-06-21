import React from "react";
import styles from "../styles/contentComp.module.scss";

const ContentComp = ({ center, isDummy, isSelected, onClick }) => {
  const itemClass = [
    styles.item,
    isDummy ? styles.invisible : "",
    isSelected ? styles.selected : "",
  ]
    .join(" ")
    .trim();

  const handleClick = () => {
    if (!isDummy && onClick) {
      onClick(center.id);
    }
  };

  return (
    <div className={itemClass} key={center.id} onClick={handleClick}>
      <div className={styles.name}>{center.daycare_name}</div>
      <div className={styles.address}>{center.address}</div>
      <div className={styles.distance}>{center.distance}</div>
    </div>
  );
};

export default ContentComp;
