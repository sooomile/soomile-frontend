import { useState } from "react";

import styles from "../styles/searchDaycareCenter.module.scss";
import search from "../assets/search.svg";
import logo from "../assets/logo.svg";
import ContentComp from "./contentComp";

const SearchDaycareCenter = () => {
  const [daycareCenters, setDaycareCenters] = useState([]);

  const renderBody = () => {
    if (daycareCenters.length === 0) {
      // 1. 검색 결과가 없을 때
      const dummiesNeeded = 5 - daycareCenters.length;
      const dummyItems = Array.from({ length: dummiesNeeded }, (_, i) => ({
        id: `dummy-${i}`,
        name: " ",
        address: " ",
        distance: " ",
        isDummy: true,
      }));
      const combinedList = [...daycareCenters, ...dummyItems];

      return (
        <div className={styles.list}>
          {combinedList.map((center) => (
            <ContentComp
              center={center}
              key={center.id}
              isDummy={center.isDummy}
            />
          ))}
          <div className={styles.empty}>
            <img src={logo} alt="logo" />
            <div className={styles.description}>주변에 어린이집이 없어요.</div>
          </div>
        </div>
      );
    }

    if (daycareCenters.length > 0 && daycareCenters.length < 5) {
      const dummiesNeeded = 5 - daycareCenters.length;
      const dummyItems = Array.from({ length: dummiesNeeded }, (_, i) => ({
        id: `dummy-${i}`,
        name: " ",
        address: " ",
        distance: " ",
        isDummy: true,
      }));
      const combinedList = [...daycareCenters, ...dummyItems];

      return (
        <div className={styles.list}>
          {combinedList.map((center) => (
            <ContentComp
              center={center}
              key={center.id}
              isDummy={center.isDummy}
            />
          ))}
        </div>
      );
    }

    if (daycareCenters.length >= 5) {
      // 3. 검색 결과가 5개 이상일 때
      return (
        <>
          <div className={styles.list}>
            {daycareCenters.slice(0, 5).map((center, index) => (
              <ContentComp center={center} key={index} />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>어린이집 검색</div>
        <div className={styles.search}>
          <img src={search} alt="search" />
          <input type="text" placeholder="어린이집 이름을 검색하세요." />
        </div>
      </div>
      <div className={styles.body}>{renderBody()}</div>
    </div>
  );
};

export default SearchDaycareCenter;
