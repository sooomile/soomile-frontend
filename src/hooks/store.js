import { create } from "zustand";

const useStore = create((set) => ({
  // 현위치 위도 경도
  currentLocation: {
    lat: 37.5665,
    lng: 126.978,
  },
  setCurrentLocation: (location) => set({ currentLocation: location }),

  // 측정소 목록 (구이름만)
  monitoringCenter: [],
  setMonitoringCenter: (monitoringCenter) =>
    set({ monitoringCenter: monitoringCenter }),

  // 측정소 정보 배열 (date, grade, latitude, longitude, pm10, pm25, 구이름, 오존, 일산화탄소)
  stationInfo: [],
  setStationInfo: (stationInfo) => set({ stationInfo: stationInfo }),

  // 측정소 더블클릭 -> 측정소 정보 저장(address, distance, station_name)
  // 측정소 단일 클릭 -> 측정소 이름 저장
  selectedStation: {},
  setSelectedStation: (selectedStation) =>
    set({ selectedStation: selectedStation }),
}));

export default useStore;
