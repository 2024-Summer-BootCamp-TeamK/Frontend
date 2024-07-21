import axios from 'axios';
import api from "./api";

const accessDocument = async (documentId, password) => {
  try {
    const response = await api.post(`/documents/${documentId}/access`, {
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error connecting to the server');
  }
};

export default accessDocument;
