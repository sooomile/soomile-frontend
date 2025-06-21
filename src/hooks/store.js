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
}));

export default useStore;
