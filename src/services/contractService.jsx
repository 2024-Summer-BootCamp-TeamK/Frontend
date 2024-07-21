// src/services/contractService.jsx
import api from "./api";

// 특정 계약을 가져오기
export const getContractMainById = async (contractId) => {
  try {
    const response = await api.get(`/contracts/${contractId}/main`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contract:", error);
    throw error;
  }
};


// 특정 계약의 toxin 정보를 가져오기
export const getContractToxinById = async (contractId) => {
  try {
    const response = await api.get(`/contracts/${contractId}/toxin`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contract toxin:", error);
    throw error;
  }
};
