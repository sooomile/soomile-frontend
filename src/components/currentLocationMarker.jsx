import { MapMarker } from "react-kakao-maps-sdk";
import currentLocation from "../assets/currentLocation.svg";


const CurrentLocationMarker = ({ location }) => {
  return (
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
  );
};

export default CurrentLocationMarker;
