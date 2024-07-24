import axios from 'axios';
import api from "./api";

const updateDocument = async (documentId, pdfFile) => {
  const url = `/documents/${documentId}`;
  const formData = new FormData();
  formData.append('pdfFile', pdfFile);

  try {
    const response = await api.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export default {
  updateDocument
};