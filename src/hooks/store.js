import { create } from "zustand";

const useStore = create((set) => ({
  currentLocation: {
    lat: 37.5665,
    lng: 126.978,
  },
  setCurrentLocation: (location) => set({ currentLocation: location }),

  monitoringCenter: [],
  setMonitoringCenter: (monitoringCenter) =>
    set({ monitoringCenter: monitoringCenter }),

  stationInfo: [{}],
  setStationInfo: (stationInfo) => set({ stationInfo: stationInfo }),

  stationSelected: false,
  setStationSelected: (stationSelected) =>
    set({ stationSelected: stationSelected }),

  selectedStationInfo: {},
  setSelectedStationInfo: (selectedStationInfo) =>
    set({ selectedStationInfo: selectedStationInfo }),
}));

export default useStore;
