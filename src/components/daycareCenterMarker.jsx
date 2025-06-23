import { useState } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import daycareMarker from "../assets/daycare-marker.svg";
import daycareMarkerNone from "../assets/daycare-none.svg";
import styles from "../styles/daycareCenterMarker.module.scss";

const DaycareCenterMarker = ({ info, selectedDaycareCenter }) => {
  // console.log("selectedDaycareCenter", selectedDaycareCenter);
  // info 객체가 유효하고, lat, lng 속성이 있을 때만 렌더링
  if (!info || !info.latitude || !info.longitude) {
    return null;
  }

  const position = { lat: info.latitude, lng: info.longitude };

  const isSelected = selectedDaycareCenter === info.id;
  return (
    <div>
      <CustomOverlayMap position={position}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.name}>{info.daycare_name}</div>
          </div>
        </div>
      </CustomOverlayMap>
      <MapMarker
        position={position}
        image={{
          src: isSelected ? daycareMarker : daycareMarkerNone,
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
      ></MapMarker>
    </div>
  );
};

export default DaycareCenterMarker;
