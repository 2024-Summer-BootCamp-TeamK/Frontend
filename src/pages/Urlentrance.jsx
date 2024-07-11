import React, { useState } from "react";
import styled from "styled-components";
import Buttonall from "../components/Buttonall";
const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 2px solid #0077b6;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;

  width: 50%;
  height: 50%;
  padding-top: 100px;
`;

const PopupTitle = styled.h2`
  margin-top: 0;
  color: #a6a6a6;
  font-size: 20px;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ConfirmButton = styled.button`
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const Urlentrance = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirm = () => {
    // 이메일 주소 처리 로직 추가
    console.log("Confirmed email:", email);
  };

  return (
    <PopupWrapper>
      <PopupTitle>
        계약서의 보안을 위해 설정된 비밀번호를 입력해주세요.
      </PopupTitle>
      <EmailInput
        type="email"
        placeholder="비밀번호를 입력해주세요."
        value={email}
        onChange={handleEmailChange}
      />
      <Buttonall onClick={handleConfirm}>확인</Buttonall>
    </PopupWrapper>
  );
};

export default Urlentrance;
