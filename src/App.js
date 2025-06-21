import "./App.css";
import Header from "./components/header";
import Map from "./components/map";
import { useKakaoLoader } from "react-kakao-maps-sdk";

function App() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
    libraries: ["services"],
  });

  return (
    <div className="App">
      <Header />
      {loading && <div>지도 로딩 중...</div>}
      {error && (
        <div>
          <h2>지도 로딩 중 에러가 발생했습니다.</h2>
          <p>{error.message}</p>
        </div>
      )}
      {!loading && !error && <Map />}
    </div>
  );
}

export default App;
