import axios from 'axios';
import api from "./api";

export const modifiedContract = async (contractId, type) => {
    try {
        const url = `/contracts/${contractId}/result`;
        const response = await api.get(url);
        const s3Url = type == 'origin' ? response.data.origin_url : response.data.result_url ;
        
        // S3에서 파일 가져오기
        const fileResponse = await axios.get(s3Url, { responseType: 'blob' });
        
        // Blob URL 생성
        const blob = new Blob([fileResponse.data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        
        return blobUrl;
    } catch(error) {
        console.error("Error fetching modified contract: ", error);
        throw error;
    }
};