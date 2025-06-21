import { create } from "zustand";

const useStore = create((set) => ({
  // 현위치 위도 경도
  currentLocation: {
    lat: 37.5665,
    lng: 126.978,
  },
  setCurrentLocation: (location) => set({ currentLocation: location }),

  // 측정소 목록
  monitoringCenter: [],
  setMonitoringCenter: (monitoringCenter) =>
    set({ monitoringCenter: monitoringCenter }),

  // 측정소 정보
  stationInfo: [{}],
  setStationInfo: (stationInfo) => set({ stationInfo: stationInfo }),

  // 선택한 측정소 정보
  selectedStationInfo: {},
  setSelectedStationInfo: (selectedStationInfo) =>
    set({ selectedStationInfo: selectedStationInfo }),
}));

export default useStore;
