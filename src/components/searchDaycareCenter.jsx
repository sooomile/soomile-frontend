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
  const [stationList, setStationList] = useState([]);
  const [searchDaycareCenter, setSearchDaycareCenter] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedDaycareCenterName, setSelectedDaycareCenterName] =
    useState("");
  const currentLocation = useStore((state) => state.currentLocation);

  // 어린이집 이름 검색 Effect
  useEffect(() => {
    if (searchDaycareCenter) {
      setStationList([]);
      setSelectedDaycareCenterName("");
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
  }, [searchDaycareCenter, currentLocation]);

  // 항목 단일 클릭 (배경색 변경)
  const handleItemSingleClick = (id) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };

  // 어린이집 더블 클릭 -> 측정소 목록 표시
  const handleCenterDoubleClick = (center) => {
    if (stationList.length > 0) return;

    axios
      .get(`${API.GET_DAYCARE_STATIONS}${center.id}/nearby-stations`)
      .then((res) => {
        setStationList(res.data.data);
        setSearchDaycareCenter("");
        setSelectedItemId(null);
        setSelectedDaycareCenterName(center.daycare_name);
      });
  };

  // 현재 뷰가 측정소 뷰인지 확인
  const isStationView = stationList.length > 0;
  // 렌더링할 목록과 제목 결정
  const listToRender = (isStationView ? stationList : daycareCenters).slice(
    0,
    5
  );

  const titleText = isStationView ? selectedDaycareCenterName : "어린이집";

  // titleText의 길이에 따라 동적으로 클래스 이름 결정
  const titleClassName = `${styles.title} ${
    titleText.length > 10 ? styles.small : ""
  }`;

  const renderBody = () => {
    const dummiesNeeded = 5 - listToRender.length;
    const dummyItems = Array.from({ length: dummiesNeeded }, (_, i) => ({
      id: `dummy-${i}`,
      isDummy: true,
    }));
    const combinedList = [...listToRender, ...dummyItems];

    return (
      <div className={styles.list}>
        {combinedList.map((item) => {
          const key = isStationView ? item.station_name : item.id;
          const id = isStationView ? item.station_name : item.id;
          return (
            <ContentComp
              center={item}
              key={key}
              isDummy={item.isDummy}
              isSelected={id === selectedItemId}
              isStation={isStationView}
              onSingleClick={() => handleItemSingleClick(id)}
              onDoubleClick={handleCenterDoubleClick}
            />
          );
        })}
        {listToRender.length === 0 && (
          <div className={styles.empty}>
            <img src={logo} alt="logo" />
            <div className={styles.description}>
              {searchDaycareCenter
                ? "검색 결과가 없어요."
                : "주변에 어린이집이 없어요."}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={titleClassName}>
          <span style={{ color: "#4A3AFF" }}>{titleText}</span> 근처 측정소 정보
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
