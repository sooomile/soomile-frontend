import defaultInstance from "../../utils/instance";

const getFineDustForecastByLocation = async (lat, lng) => {
  try {
    const url = `/predict/forecast?lat=${lat}&lng=${lng}`;
    console.log("[FineDustForecast API] GET:", url);
    const response = await defaultInstance.get(url);
    if (response.status === 200) {
      return { success: true, data: response.data.data };
    }
    return { success: false, error: "예측 데이터 조회 실패" };
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export default getFineDustForecastByLocation; 