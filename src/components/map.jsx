import React, { useEffect, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import CurrentLocationMarker from "./currentLocationMarker";
import MonitoringStationMarker from "./monitoringStationMarker";
import useStore from "../hooks/store";

const Map = () => {
  const currentLocation = useStore((state) => state.currentLocation);
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);

  console.log(currentLocation);

  // 현위치
  const [location, setLocation] = useState({
    lat: 37.5665, // 서울 시청
    lng: 126.978, // 서울 시청
  });
  const [isLoading, setIsLoading] = useState(true);

  // 측정소 위치
  const [station, setStation] = useState({
    lat: 37.572013,
    lng: 127.005014,
  });
  // 측정소 위치2
  const [station2, setStation2] = useState({
    lat: 37.606769,
    lng: 127.027364,
  });

  // 측정소 정보
  const [info, setInfo] = useState({
    gu: "성북구",
    label: "초미세먼지(PM-2.5)",
    value: "23㎍/㎥",
    status: "보통",
  });

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

  return (
    <KakaoMap
      center={location}
      style={{ width: "100%", height: "100vh" }}
      level={3}
    >
      {!isLoading && (
        <div>
          {/* 현위치 마커 */}
          <CurrentLocationMarker location={location} />
          {/* 측정소 마커 */}
          <MonitoringStationMarker station={station} info={info} />
          <MonitoringStationMarker station={station2} info={info} />
        </div>
      )}
    </KakaoMap>
  );
};

export default Map;
