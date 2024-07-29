import React, { useState } from 'react';
import styled from 'styled-components';
import keySrc from "../images/key.svg";
import eyeOnSrc from "../images/Eye_on.svg";
import eyeOffSrc from "../images/Eye_off.svg";
import accessDocument from '../services/access_API';

const Popupkeyinput = ({ documentId, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // 사용자 이름 상태 추가
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirm = async () => {
    try {
      const data = await accessDocument(documentId, password);
      if (data.check) {
        onSuccess(password, username); // Pass username to onSuccess
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PopupWrapper>
      <KeyContainer>
        <KeyImage src={keySrc} alt="Key Icon" />
      </KeyContainer>
      <PopupTitle>
        계약서의 보안을 위해 설정된 비밀번호를 입력해주세요.
      </PopupTitle>
      <InputWrapper>
        <Input
          type="text"
          placeholder="이름을 입력해주세요."
          value={username}
          onChange={handleUsernameChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handlePasswordChange}
        />
        <ToggleButton onClick={handleTogglePassword}>
          <ToggleIcon src={showPassword ? eyeOffSrc : eyeOnSrc} alt="Toggle Password Visibility" />
        </ToggleButton>
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
    </PopupWrapper>
  );
};

export default Popupkeyinput;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 5px solid #141F7B;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 50%;
  height: auto;
  max-width: 600px;
  max-height: 400px;
  min-width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const KeyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const KeyImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;

const PopupTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  color: #a6a6a6;
  font-size: 20px;
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 80%;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 16px;
  box-sizing: border-box;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #141F7B;
  outline: none;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

const ToggleIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #141F7B;
  color: white;
  text-align: center;
  border-radius: 100px;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #fefdf6;
    color: #141F7B;
    outline: none;
  }
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 10px;
`;
