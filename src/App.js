import "./App.css";
import Main from "./pages/main";

function App() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
    libraries: ["services"],
  });

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
