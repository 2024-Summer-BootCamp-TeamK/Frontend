import axios from 'axios';

const accessDocument = async (documentId, password) => {
  try {
    const response = await axios.post(`http://localhost/api/v1/documents/${documentId}/access`, {
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error connecting to the server');
  }
};

export default accessDocument;
