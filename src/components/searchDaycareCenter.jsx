import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../hooks/config";
import styles from "../styles/searchDaycareCenter.module.scss";
import search from "../assets/search.svg";
import logo from "../assets/logo.svg";
import ContentComp from "./contentComp";
import useStore from "../hooks/store";

const SearchDaycareCenter = () => {
  const [daycareCenters, setDaycareCenters] = useState([]);
  const [searchDaycareCenter, setSearchDaycareCenter] = useState("");
  const [selectedCenterId, setSelectedCenterId] = useState(null);
  const currentLocation = useStore((state) => state.currentLocation);
  // console.log(currentLocation);

  useEffect(() => {
    if (searchDaycareCenter) {
      axios
        .get(
          `${API.BASE_URL}daycares?name=${searchDaycareCenter}&lat=${currentLocation.lat}&lng=${currentLocation.lng}`
        )
        .then((res) => {
          setDaycareCenters(res.data.data);
        });
    } else {
      setDaycareCenters([]);
    }
  }, [currentLocation, searchDaycareCenter]);
  console.log(daycareCenters);

  const handleCenterClick = (id) => {
    setSelectedCenterId(id === selectedCenterId ? null : id);
  };

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
              isSelected={center.id === selectedCenterId}
              onClick={handleCenterClick}
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
              isSelected={center.id === selectedCenterId}
              onClick={handleCenterClick}
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
            {daycareCenters.slice(0, 5).map((center) => (
              <ContentComp
                center={center}
                key={center.id}
                isSelected={center.id === selectedCenterId}
                onClick={handleCenterClick}
              />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span style={{ color: "#4A3AFF" }}>어린이집</span> 근처 측정소 정보
        </div>
        <div className={styles.search}>
          <img src={search} alt="search" />
          <input
            type="text"
            placeholder="어린이집 이름을 검색하세요."
            value={searchDaycareCenter}
            onChange={(e) => setSearchDaycareCenter(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.body}>{renderBody()}</div>
    </div>
  );
};

export default SearchDaycareCenter;
