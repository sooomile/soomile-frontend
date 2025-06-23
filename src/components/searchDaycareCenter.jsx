import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../hooks/config";
import styles from "../styles/searchDaycareCenter.module.scss";
import search from "../assets/search.svg";
import List from "./list";
import useStore from "../hooks/store";
import StationInfo from "./stationInfo";

const SearchDaycareCenter = () => {
  // useState
  const [stationList, setStationList] = useState([]);
  const [searchDaycareCenter, setSearchDaycareCenter] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  // useStore
  const daycareCenters = useStore((state) => state.daycareCenters);
  const setDaycareCenters = useStore((state) => state.setDaycareCenters);
  const currentLocation = useStore((state) => state.currentLocation);
  const setMonitoringCenter = useStore((state) => state.setMonitoringCenter);
  const setStationInfo = useStore((state) => state.setStationInfo);
  const selectedStation = useStore((state) => state.selectedStation);
  const setSelectedStation = useStore((state) => state.setSelectedStation);
  const selectedDaycareCenter = useStore(
    (state) => state.selectedDaycareCenter
  );
  const setSelectedDaycareCenter = useStore(
    (state) => state.setSelectedDaycareCenter
  );
  // 어린이집 이름 검색 Effect
  useEffect(() => {
    if (searchDaycareCenter) {
      setStationList([]);
      setSelectedDaycareCenter({});
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
    setSelectedStation(id);
    setSelectedDaycareCenter(id);
  };

  // 어린이집 더블 클릭 -> 측정소 목록 표시
  // 측정소 더블 클릭 -> 측정소 정보 표시
  const handleCenterDoubleClick = (center) => {
    // 선택한게 측정소이면 측정소 정보 표시
    if (stationList.length > 0) {
      setSelectedStation(center);
      setSelectedDaycareCenter(center);
      // 선택한게 어린이집이면 측정소 목록 표시
    } else {
      axios
        .get(`${API.GET_DAYCARE_STATIONS}${center.id}/nearby-stations`)
        .then((res) => {
          setStationList(res.data.data);
          setSearchDaycareCenter("");
          setSelectedItemId(null);
          setSelectedDaycareCenter(center);
          setMonitoringCenter(res.data.data.map((item) => item.station_name));
        });
    }
  };

  // 현재 뷰가 측정소 뷰인지 확인
  const isStationView = stationList.length > 0;
  // 렌더링할 목록과 제목 결정
  const listToRender = (isStationView ? stationList : daycareCenters).slice(
    0,
    5
  );

  const titleText = isStationView
    ? selectedDaycareCenter.daycare_name
    : "어린이집";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span style={{ color: "#4A3AFF" }}>{titleText}</span> 근처 측정소 정보
        </div>
        <div className={styles.search}>
          <img src={search} alt="search" />
          <input
            type="text"
            placeholder="어린이집 이름을 검색하세요."
            value={searchDaycareCenter}
            onChange={(e) => {
              setSearchDaycareCenter(e.target.value);
              setSelectedStation({});
              setStationInfo([]);
            }}
          />
        </div>
      </div>
      <div className={styles.body}>
        {selectedStation.station_name ? (
          <div style={{ position: "relative" }}>
            <List
              listToRender={listToRender}
              isStationView={isStationView}
              selectedItemId={selectedItemId}
              style={{ visibility: "hidden" }}
              searchDaycareCenter={searchDaycareCenter}
            />
            <StationInfo />
          </div>
        ) : (
          <List
            listToRender={listToRender}
            isStationView={isStationView}
            selectedItemId={selectedItemId}
            handleItemSingleClick={handleItemSingleClick}
            handleCenterDoubleClick={handleCenterDoubleClick}
            searchDaycareCenter={searchDaycareCenter}
          />
        )}
      </div>
    </div>
  );
};

export default SearchDaycareCenter;
