import Header from "../components/header";
import Map from "../components/map";
import SearchDaycareCenter from "../components/searchDaycareCenter";
import PmLegend from "../components/pmLegend";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import FineDustForecast from "../components/fineDustForecast";
import AirQualityInfo from "../components/airQualityInfo";

const Main = () => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
    libraries: ["services"],
  });
  return (
    <div>
      <Header />
      {loading && <div>지도 로딩 중...</div>}
      {error && (
        <div>
          <h2>지도 로딩 중 에러가 발생했습니다.</h2>
          <p>{error.message}</p>
        </div>
      )}
      {!loading && !error && <Map />}
      <SearchDaycareCenter />
      <PmLegend />
      <FineDustForecast />
      <AirQualityInfo />
    </div>
  );
};

export default Main;
