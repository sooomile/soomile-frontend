import React, { useEffect, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import marker from "../assets/marker.svg";
import currentLocation from "../assets/currentLocation.svg";

const Map = () => {
  const [location, setLocation] = useState({
    lat: 37.5665, // 서울 시청
    lng: 126.978, // 서울 시청
  });
  const [isLoading, setIsLoading] = useState(true);

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
        <MapMarker
          position={location}
          image={{
            src: currentLocation,
            size: {
              width: 64,
              height: 64,
            },
            options: {
              // 기준점 이미지의 중앙으로 이동
              offset: {
                x: 32,
                y: 32,
              },
            },
          }}
        ></MapMarker>
      )}
    </KakaoMap>
  );
};

export default Map;
