import defaultInstance from "../../utils/instance";

/**
 * 미세먼지 예보 예측 API 호출
 * @param {string} daycareId - 예보를 조회할 어린이집의 고유 ID
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
const getFineDustForecast = async (daycareId) => {
  try {
    const url = `/predict/${daycareId}`;
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

export default getFineDustForecast; 