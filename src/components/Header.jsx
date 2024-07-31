import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const Header = ({ logoSrc, isScrolled }) => {
  const navigate = useNavigate();

  return (
    <StyledHeader $isScrolled={isScrolled}>
      <LogoContainer>
        <Logo src={logoSrc} onClick={() => navigate("/")} alt="Logo" />
      </LogoContainer>
      <ButtonContainer>
        <Button onClick={() => navigate("/category")}>
          AI 검토 받으러 가기
        </Button>
        <Button onClick={() => navigate("/fileuploadshare")}>
          상대방과 계약서 검토하기
        </Button>
      </ButtonContainer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10vh;
  display: flex;
  align-items: center;
  background-color: #fefdf6;
  padding: 0 20px;
  text-align: center;
  font-size: 24px;
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
  z-index: 1000;
  justify-content: space-between;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
`;

const LogoContainer = styled.div`
  height: 90%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 100%;
  cursor: pointer; // 포인터 커서 추가
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
