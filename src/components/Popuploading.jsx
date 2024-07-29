import React from "react";
import styled, { keyframes } from "styled-components";

// spinner 애니메이션을 먼저 정의합니다.
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
  z-index: 9999;
  height: 100%; // 전체 화면을 덮도록 설정
  width: 100%; // 전체 화면을 덮도록 설정
  background-color: rgba(0, 0, 0, 0.3); // 배경색 설정
  top: 0;
  left: 0;
  display: flex; // 중앙 정렬을 위해 flex 사용
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  overflow: hidden;
`;

const Spinner = styled.div`
content: "";
display: block;
font-size: 10px;
width: 1em;
height: 1em;
margin-top: -0.5em;
  border-radius: 0.5em;
  animation: ${spinner} 1500ms infinite linear; // spinner 애니메이션 사용
  box-shadow:
  rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
  rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0,
  rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
  rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0,
  rgba(0, 0, 0, 0.75) -1.5em 0 0 0,
  rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0,
  rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
  rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}
`;

const Popuploading = () => {
  return (
    <LoadingOverlay>
      <Spinner />
    </LoadingOverlay>
  );
};

export default Popuploading;
