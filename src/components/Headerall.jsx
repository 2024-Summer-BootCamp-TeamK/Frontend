import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import logoSrc from "../images/logo.svg";

const Headerall = ({ logoSrc: logoImage, isScrolled }) => {
  const navigate = useNavigate();

  return (
    <StyledHeaderall $isScrolled={isScrolled}>
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
    </StyledHeaderall>
  );
};

export default Headerall;

const StyledHeaderall = styled.header`
  position: fixed; /* 상단에 고정 */
  top: 0;
  left: 0;
  right: 0;
  height: 10vh; /* 화면 높이의 10% */
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  background-color: #fefdf6;
  padding: 0 20px;
  text-align: center;
  font-size: 24px;
  z-index: 1000; /* 다른 요소보다 위에 표시되도록 함 */
  justify-content: space-between; /* 왼쪽 끝에 로고, 오른쪽 끝에 버튼들 */

  /* 구분선 추가 */
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -1px; /* Headerall 컴포넌트 바로 아래에 선을 위치시키기 위해 */
    left: 0;
    right: 0;
    height: 2px; /* 선의 두께 */
    background-color: #141f7b; /* 선의 색상 */
  }
`;

const LogoContainer = styled.div`
  height: 90%; /* 로고 이미지 높이를 헤더 높이에 맞춤 */
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 100%;
  cursor: pointer; // 포인터 커서 추가
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; /* 버튼 간의 간격 */
  margin-right: calc(
    100vw - 101%
  ); /* 스크롤바 공간을 제거하기 위한 여백 추가 */
`;
