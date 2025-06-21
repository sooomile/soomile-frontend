import "./App.css";
import Main from "./pages/main";
import axios from "axios";
import { API } from "./hooks/config";

function App() {
  // axios.get(`${API.BASE_URL}daycares?name=명화`).then((res) => {
  //   console.log(res.data);
  // });

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
