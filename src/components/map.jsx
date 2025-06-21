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

  // 종로구
  const [station, setStation] = useState({
    lat: 37.572013,
    lng: 127.005014,
  });

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
                  x: 14, // 마커 이미지의 너비 절반
                  y: 40, // 마커 이미지의 높이 (하단에 맞춤)
                },
              },
            }}
          ></MapMarker>
        </>
      )}
    </KakaoMap>
  );
};

export default Map;
