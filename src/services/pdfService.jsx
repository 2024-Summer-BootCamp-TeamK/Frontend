import axios from 'axios';
import { getAsset } from '../utils/prepareAssets';
import api from "./api";


export const fetchPdfDocument = async (documentId, password) => {
  try {
    const url = `/encryption/test/${documentId}`;
    const pdfjsLib = await getAsset('pdfjsLib');

    // Fetch the PDF file from the server
    const response = await api.get(url, { 
      responseType: 'blob',
      headers: {
        'X-Password': password
      }
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const file = new File([blob], "document.pdf", { type: "application/pdf" });

    const loadingTask = pdfjsLib.getDocument({ data: await blob.arrayBuffer() });
    const pdfDocument = await loadingTask.promise;

    return { pdfDocument, file };
  } catch (error) {
    throw new Error('Error loading PDF: ' + (error.response ? error.response.data : error.message));
  }
};
