/**
 * API 응답 데이터를 컴포넌트에서 사용할 수 있는 형태로 변환하는 함수
 * 서버에서 받은 원본 데이터를 컴포넌트에서 사용하기 편한 형태로 바꿔준다.
 * @param {Object} apiData - API 응답 데이터
 * @returns {Object} 변환된 데이터
 */
export const transformAirQualityData = (apiData) => {
  return {
    district: apiData.구이름 || '알 수 없음',
    date: apiData.date || '',
    grade: apiData.grade || 'unknown',
    pm25: {
      label: '초미세먼지',
      value: apiData.pm25 ? `${apiData.pm25}µg/m³` : '점검 중',
    },
    pm10: {
      label: '미세먼지',
      value: apiData.pm10 ? `${apiData.pm10}µg/m³` : '점검 중',
    },
  };
}; 