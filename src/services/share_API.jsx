import axios from 'axios';

const docuShare = async (formData) => {
    try {
        const response = await axios.post('http://localhost/api/v1/documents/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('공유계약서 업로드 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('공유계약서 업로드 에러:', error.response?.data || error.message);
        throw new Error('업로드에 실패했습니다.');
    }
};

export default docuShare;
