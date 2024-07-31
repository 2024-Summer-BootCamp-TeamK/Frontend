import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Popupkeycreate from '../components/Popupkeycreate';
import Button from '../components/Button';
import contractShare from '../services/share_API';

import Headerall from "../components/Headerall";
import logoSrc from "../images/logo.svg"; // logo.svg 파일 경로를 올바르게 설정

const Key = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pdfFile } = location.state || {}; // state에서 file 가져오기
    const fileName = pdfFile ? pdfFile.name : '! 업로드 된 파일이 없습니다'; // 파일 이름 추출

    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async (formData) => {
        setLoading(true); // Show the loading spinner
        try {
            const data = await contractShare(formData);
            console.log('공유계약서 업로드 성공:', data);
            setShowAlert(true); // Show the custom alert
            // 성공 시 추가 작업
        } catch (error) {
            console.error('공유계약서 업로드 에러:', error.data?.data || error.message);
            alert('계약서 공유에 실패했습니다.');
            // 에러 처리 추가
        } finally {
            setLoading(false); // Hide the loading spinner
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <>
            <Headerall>
         
            </Headerall>
            <Container>
                <FileName>{fileName}</FileName> {/* 파일 이름 출력 */}
                <Popupkeycreate pdfFile={pdfFile} handleConfirm={handleConfirm} />
            </Container>
            {loading && <LoadingOverlay />}
            {showAlert && (
                <AlertBackground>
                    <CustomAlert>
                        <AlertTitle>전송 완료</AlertTitle>
                        <AlertMessage>이메일을 확인해주세요</AlertMessage>
                        <AlertButton onClick={handleCloseAlert}>확인</AlertButton>
                    </CustomAlert>
                </AlertBackground>
            )}
        </>
    );
};

export default Key;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5vh;
`;

const FileName = styled.h5`
  margin: 20px 0;
  margin-top: 150px;
  font-size: 16px;
  color: #c0c0c0;
  text-align: center;
`;

const AlertBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검정 배경 */
  z-index: 1000; /* 높은 z-index 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomAlert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 5px solid #141F7B;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 50%; /* 기본 너비 */
  max-width: 600px; /* 최대 너비 */
  min-width: 300px; /* 최소 너비 */
`;

const AlertTitle = styled.h3`
  margin: 0;
  font-size: 25px;
  color: black;
`;

const AlertMessage = styled.p`
  margin: 10px 0 0;
  font-size: 18px;
  color: gray;
`;

const AlertButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: #141F7B;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0f146b;
  }
`;

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
  }

  &:not(:required) {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  &:not(:required):after {
    content: '';
    display: block;
    font-size: 10px;
    width: 1em;
    height: 1em;
    margin-top: -0.5em;
    animation: ${spinner} 1500ms infinite linear;
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  }
`;
