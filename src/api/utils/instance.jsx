import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://soomile.r-e.kr/";

const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

export default defaultInstance; 