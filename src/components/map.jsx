import React, { useEffect, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import CustomOverlay from "./customOverlay";
import marker from "../assets/marker.svg";
import currentLocation from "../assets/currentLocation.svg";

const Map = () => {
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

  // 측정소 정보
  const [info, setInfo] = useState({
    gu: "성북구",
    label: "초미세먼지(PM-2.5)",
    value: "23㎍/㎥",
    status: "보통",
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
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
  }, []);

  return (
    <KakaoMap
      center={location}
      style={{ width: "100%", height: "100vh" }}
      level={3}
    >
      {!isLoading && (
        <>
          {/* 현위치 마커 */}
          <MapMarker
            position={location}
            image={{
              src: currentLocation,
              size: {
                width: 64,
                height: 64,
              },
              options: {
                offset: {
                  x: 32,
                  y: 32,
                },
              },
            }}
          ></MapMarker>
          {/* 측정소 마커 */}
          <MapMarker
            position={station}
            image={{
              src: marker,
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
            onClick={() => setIsOverlayOpen(true)}
          ></MapMarker>

          {/* 커스텀 오버레이 */}
          {isOverlayOpen && (
            <CustomOverlay
              station={station}
              info={info}
              setIsOverlayOpen={setIsOverlayOpen}
            />
          )}
        </>
      )}
    </KakaoMap>
  );
};

export default Map;
