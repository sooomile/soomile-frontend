import React, { useEffect, useState } from "react";
import { Map as KakaoMap } from "react-kakao-maps-sdk";
import CurrentLocationMarker from "./currentLocationMarker";
import MonitoringStationMarker from "./monitoringStationMarker";
import DaycareCenterMarker from "./daycareCenterMarker";
import useStore from "../hooks/store";
import axios from "axios";
import { API } from "../hooks/config";

const Map = () => {
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);
  const currentLocation = useStore((state) => state.currentLocation);

  const [isLoading, setIsLoading] = useState(true);
  const monitoringCenter = useStore((state) => state.monitoringCenter);

  const stationInfo = useStore((state) => state.stationInfo);
  const setStationInfo = useStore((state) => state.setStationInfo);
  const selectedStation = useStore((state) => state.selectedStation);
  const daycareCenters = useStore((state) => state.daycareCenters);
  const selectedDaycareCenter = useStore(
    (state) => state.selectedDaycareCenter
  );
  const clickedDaycareCenter = useStore((state) => state.clickedDaycareCenter);
  // 현위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        alert("위치 정보를 가져오는 데 실패했습니다.");
        setIsLoading(false);
      }
    );
  }, [setCurrentLocation]);

  // 측정소 정보 가져오기
  useEffect(() => {
    if (monitoringCenter && monitoringCenter.length > 0) {
      // Promise.all을 사용해 모든 API 요청을 병렬로 처리
      const promises = monitoringCenter.map((item) =>
        axios.get(`${API.GET_STATIONS}${item}/air-quality`)
      );

      Promise.all(promises)
        .then((responses) => {
          const newInfo = responses.map((res) => res.data.data);
          setStationInfo(newInfo); // 모든 정보를 한 번에 업데이트
        })
        .catch((err) => {
          console.error("측정소 정보 조회 실패:", err);
        });
    }
  }, [monitoringCenter, setStationInfo]);
  // console.log(stationInfo);

  // console.log("selectedDaycareCenter", selectedDaycareCenter);
  console.log("clickedDaycareCenter", clickedDaycareCenter);
  return (
    <KakaoMap
      center={currentLocation}
      style={{ width: "100%", height: "100vh" }}
      level={3}
    >
      {!isLoading && (
        <div>
          {/* 현위치 마커 */}
          <CurrentLocationMarker location={currentLocation} />

          {/* 측정소 마커 - 동적으로 렌더링 */}
          {stationInfo.map((stationInfo, index) => (
            <MonitoringStationMarker
              key={index}
              info={stationInfo}
              selectedStation={selectedStation}
            />
          ))}
          {/* 어린이집 마커 - 동적으로 렌더링 */}
          {daycareCenters.map((daycareCenters, index) => (
            <DaycareCenterMarker
              key={index}
              info={daycareCenters}
              selectedDaycareCenter={clickedDaycareCenter}
            />
          ))}
          {selectedDaycareCenter && (
            <DaycareCenterMarker
              info={selectedDaycareCenter}
              selectedDaycareCenter={selectedDaycareCenter}
            />
          )}
        </div>
      )}
    </KakaoMap>
  );
};

export default Map;
