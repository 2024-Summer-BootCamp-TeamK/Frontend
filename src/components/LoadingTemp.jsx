// src/components/LoadingTemp.jsx
import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fa;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: #343a40;
`;

const LoadingTemp = () => {
  return (
    <LoadingWrapper>
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};

export default LoadingTemp;
