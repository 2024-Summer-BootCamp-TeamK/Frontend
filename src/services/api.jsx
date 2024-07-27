// src/services/api.js
import axios from "axios";

// 기본 URL 설정
const api = axios.create({
  baseURL: "https://lawbot.store/api/v1", // 여기에 실제 API 기본 URL을 입력하세요
});

export default api;
