import React from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";

const Map = () => {
  return (
    <KakaoMap
      center={{ lat: 37.5665, lng: 126.978 }} // 서울 시청
      style={{ width: "100%", height: "100vh" }}
      level={3}
    >
      <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
        <div style={{ padding: "5px", color: "#000" }}>서울시청</div>
      </MapMarker>
    </KakaoMap>
  );
};

export default Map;
