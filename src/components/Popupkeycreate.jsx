import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import contractShare from '../services/share_API';

const Popupkeycreate = ({ closePopup, pdfFile }) => {
  const [emails, setEmails] = useState(['']);

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    if (emails.length < 5) {
      setEmails([...emails, '']);
    } else {
      alert('You can add up to 5 email addresses only.');
    }
  };

  const removeEmailField = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleConfirm = async () => {
    const formData = new FormData();
    const emailString = emails.join(',');
    formData.append('emails', emailString);
    formData.append('pdfFile', pdfFile);
    try {
      const data = await contractShare(formData);
      console.log('공유계약서 업로드 성공:', data);
      // 성공 시 추가 작업
    } catch (error) {
      console.error('공유계약서 업로드 에러:', error.data?.data || error.message);
      alert('계약서 공유에 실패했습니다.');
      // 에러 처리 추가
    }
  };

  return (
    <PopupWrapper>
      <PopupTitle>
        화면 공유 링크와 접속 비밀번호를 <br /> 전달받을 이메일을 입력해주세요
      </PopupTitle>
      <EmailContainer>
        {emails.map((email, index) => (
          <FormGroup key={index}>
            <Emailform>이메일 {index + 1}:</Emailform>
            <EmailInput
              type="email"
              placeholder="이메일 주소를 입력해주세요."
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
            {index === 0 && (
              <AddEmailButton onClick={addEmailField}>+</AddEmailButton>
            )}
            {index > 0 && (
              <RemoveEmailButton onClick={() => removeEmailField(index)}>-</RemoveEmailButton>
            )}
          </FormGroup>
        ))}
      </EmailContainer>
      <ConfirmButton onClick={handleConfirm}>이메일 전송</ConfirmButton>
    </PopupWrapper>
  );
};

export default Popupkeycreate;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 3px solid #141F7B;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  width: 50%;
  max-width: 600px; 
  min-width: 300px; 
  max-height: 80vh; /* 최대 높이 */
  overflow-y: auto; /* 내용이 넘치면 스크롤 */
  position: fixed; 
  top: 50%;
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

const EmailContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px; /* 여백을 줄였습니다. */
`;

const Emailform = styled.h4`
  color: #141F7B;
  font-size: 17px;
  margin-right: 10px;
  white-space: nowrap; 
  flex-shrink: 0; 
  padding-top: 1.1vh;
`;

const EmailInput = styled.input`
  flex: 1; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  font-size: 13px;
  color: black;
`;

const AddEmailButton = styled.button`
  margin-left: 10px; /* 첫 번째 입력창 오른쪽에 배치될 여백을 추가했습니다. */
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #141F7B; /* 기본 버튼 색상 */
  color: white; /* 글자 색상 */
  text-align: center;
  border-radius: 5px;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    outline: none; /* 포커스 시 outline 제거 */
  }
`;

const RemoveEmailButton = styled.button`
  margin-left: 10px; /* 여백을 추가했습니다. */
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: red; /* 기본 버튼 색상 */
  color: white; /* 글자 색상 */
  text-align: center;
  border-radius: 5px;

  &:hover {
    background-color: darkred;
  }
  &:active,
  &:focus {
    outline: none; /* 포커스 시 outline 제거 */
  }
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
  margin-top: 20px; /* 여백을 줄였습니다. */

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
