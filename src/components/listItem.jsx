import React, { useRef } from "react";
import styles from "../styles/contentComp.module.scss";

const ListItem = ({
  center,
  isDummy,
  isSelected,
  onSingleClick,
  onDoubleClick,
  isStation,
}) => {
  const clickTimeout = useRef(null);

  const itemClass = [
    styles.item,
    isDummy ? styles.invisible : "",
    isSelected ? styles.selected : "",
  ]
    .join(" ")
    .trim();

  const handleClick = () => {
    if (isDummy) return;

    // 타이머가 이미 설정되어 있다면, 더블클릭으로 간주
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      if (onDoubleClick) {
        onDoubleClick(center);
      }
    } else {
      // 더블클릭을 기다리기 위해 타이머 설정
      clickTimeout.current = setTimeout(() => {
        if (onSingleClick) {
          onSingleClick();
        }
        clickTimeout.current = null;
      }, 250); // 250ms 안에 다른 클릭이 없으면 단일 클릭으로 처리
    }
  };

  // isStation 값에 따라 표시할 이름을 결정
  const displayName = isStation ? center.station_name : center.daycare_name;

  return (
    <div className={itemClass} key={center.id} onClick={handleClick}>
      <div className={styles.name}>{displayName}</div>
      <div className={styles.address}>{center.address}</div>
      <div className={styles.distance}>{center.distance}</div>
    </div>
  );
};

export default ListItem;
