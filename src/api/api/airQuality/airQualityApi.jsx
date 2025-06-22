import defaultInstance from "../../utils/instance";

const getAirQualityByLocation = async (lat, lng) => {
    try {
      

        const response = await defaultInstance.get(`/stations/air-quality?lat=${lat}&lng=${lng}`);
        
        if (response.status === 200) {
            console.log("대기질 정보 조회 성공");
            return {
                success: true,
                data: response.data.data
            };
        } else {
            console.log("API 응답 오류:", response.status);
            return {
                success: false,
                error: "API 응답 오류가 발생했습니다."
            };
        }
    } catch (e) {
        console.log("대기질 정보 조회 오류:", e);
        return {
            success: false,
            error: e.message || "네트워크 오류가 발생했습니다."
        };
    }
};

export default getAirQualityByLocation; 