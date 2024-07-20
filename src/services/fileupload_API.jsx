import axios from 'axios';

const contractUpload = async (formData) => {
    try {
        const response = await axios.post('http://localhost/api/v1/contracts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('계약서 업로드 성공:', response.data.contractId);
        return response.data; // contract ID 돌려줌
    } catch (error) {
        console.error('계약서 업로드 에러:', error.response?.data || error.message);
        throw new Error('업로드에 실패했습니다.');
    }
};

export default contractUpload;
