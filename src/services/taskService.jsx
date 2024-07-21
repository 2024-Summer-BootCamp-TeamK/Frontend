// src/services/taskService.jsx
import api from "./api";

// 특정 태스크의 상태를 가져오기
export const getTaskStatusById = async (taskId) => {
  try {
    const response = await api.get(`/task_status/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task status:", error);
    throw error;
  }
};
