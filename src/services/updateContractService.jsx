// src/services/updateContractService.jsx
import api from "./api";

// 특정 계약서 수정
export const updateContractById = async (contractId, articleIds) => {
  try {
    const response = await api.put(`/contracts/${contractId}`, {
      article_ids: articleIds
    });
    return response.data;
  } catch (error) {
    console.error("Error updating contract:", error);
    throw error;
  }
};
