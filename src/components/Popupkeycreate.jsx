import React, { useState } from 'react';
import styled from 'styled-components';
import Buttonall from '../components/Buttonall';

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 5px solid #141F7B;
  border-radius: 30px;
  padding: 40px;
  margin-top: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 50%; /* 기본 너비 */
  height: 50%; /* 기본 높이 */
  max-width: 600px; /* 최대 너비 */
  max-height: 400px; /* 최대 높이 */
  min-width: 300px; /* 최소 너비 */
  min-height: 200px; /* 최소 높이 */
`;

const PopupTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  color: #a6a6a6;
  font-size: 23px;
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
  border-radius: 5px;
  font-size: 13px;
`;
const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #141F7B; /* 기본 버튼 색상 */
  color: white; /* 글자 색상 */
  text-align: center;
  border-radius: 100px;
  margin-top : 150px;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #fefdf6; /* 눌렸을 때 배경색 */
    color: #141F7B; /* 눌렸을 때 글씨색 */
    outline: none; /* 포커스 시 outline 제거 */

  svg {
    fill: rgba(255, 255, 255, 0.8); /* fill 속성에 투명도가 80%인 흰색 적용 */
    stroke: #edeac5; /* stroke 속성 설정 */
    stroke-width: 1; /* stroke-width 속성 설정 */
  }

`;

const Popupkeycreate = ({ closePopup }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirm = () => {
    console.log('Confirmed email:', email);
    if (closePopup) {
      closePopup();
    }
  };

  return (
    <PopupWrapper>
      <PopupTitle>
        화면 공유 링크와 접속 비밀번호를 <br /> 전달받을 이메일을 입력해주세요
      </PopupTitle>
      <FormGroup>
        <Emailform>이메일 입력:</Emailform>
        <EmailInput
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>
      <ConfirmButton onClick={handleConfirm}>이메일 전송</ConfirmButton>
    </PopupWrapper>
  );
};

export default Popupkeycreate;
