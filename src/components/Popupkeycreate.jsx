import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import contractShare from '../services/share_API';

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 5px solid #141F7B;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 50%; /* 기본 너비 */
  height: 50%; /* 기본 높이 */
  max-width: 600px; /* 최대 너비 */
  max-height: 400px; /* 최대 높이 */
  min-width: 300px; /* 최소 너비 */
  min-height: 200px; /* 최소 높이 */
  position: fixed; /* 고정 위치 설정 */
  top: calc(100% - 320px); 
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* 기본 z-index 설정 */
`;

const PopupTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  color: #a6a6a6;
  font-size: 23px;
  text-align: center; /* 텍스트 중앙 정렬 추가 */
`;

const FormGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 50px;
`;

const Emailform = styled.h4`
  color: #141F7B;
  font-size: 17px;
  margin-right: 10px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  flex-shrink: 0; /* 크기 고정 */
`;

const EmailInput = styled.input`
  flex: 1; /* 남은 공간 채우기 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  font-size: 13px;
  color: black;
`;

const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #141F7B; /* 기본 버튼 색상 */
  color: white; /* 글자 색상 */
  text-align: center;
  border-radius: 100px;
  margin-top: 50px;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #fefdf6; /* 눌렸을 때 배경색 */
    color: #141F7B; /* 눌렸을 때 글씨색 */
    outline: none; /* 포커스 시 outline 제거 */
  }
  svg {
    fill: rgba(255, 255, 255, 0.8); /* fill 속성에 투명도가 80%인 흰색 적용 */
    stroke: #edeac5; /* stroke 속성 설정 */
    stroke-width: 1; /* stroke-width 속성 설정 */
  }
`;

const CustomAlert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 5px solid #141F7B;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 50%; /* 기본 너비 */
  height: 50%; /* 기본 높이 */
  max-width: 600px; /* 최대 너비 */
  max-height: 400px; /* 최대 높이 */
  min-width: 300px; /* 최소 너비 */
  min-height: 200px; /* 최소 높이 */
  position: fixed; /* 고정 위치 설정 */
  top: 58.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* 높은 z-index 설정 */
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

const Popupkeycreate = ({ closePopup, pdfFile }) => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirm = async () => {
    setLoading(true); // Show the loading spinner
    const formData = new FormData();
    formData.append('email', email);
    formData.append('pdfFile', pdfFile);
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
      <PopupWrapper>
        <PopupTitle>
          화면 공유 링크와 접속 비밀번호를 <br /> 전달받을 이메일을 입력해주세요
        </PopupTitle>
        <FormGroup>
          <Emailform>이메일 :</Emailform>
          <EmailInput
            type="email"
            placeholder="이메일 주소를 입력해주세요."
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <ConfirmButton onClick={handleConfirm}>이메일 전송</ConfirmButton>
      </PopupWrapper>
      {loading && (
        <LoadingOverlay className="loading" />
      )}
      {showAlert && (
        <CustomAlert>
          <AlertTitle>전송 완료</AlertTitle>
          <AlertMessage>이메일을 확인해주세요</AlertMessage>
          <AlertButton onClick={handleCloseAlert}>확인</AlertButton>
        </CustomAlert>
      )}
    </>
  );
};

export default Popupkeycreate;
