import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MangoDdobak-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2') format('woff2');
    font-style: normal;
  }

  body {
    font-family: 'MangoDdobak-B', sans-serif;
  }
`;

const Button = ({ children, onClick, isActive }) => (
  <>
    <GlobalStyle />
    <StyledButton onClick={onClick} isActive={isActive}>
      {children}
    </StyledButton>
  </>
);

export default Button;

const StyledButton = styled.button`
  background-color: #ffffff;
  color: #141f7b;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #141f7b;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
  margin: 0;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'MangoDdobak-B', sans-serif;
    -webkit-text-stroke: 0.5px #141F7B;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #141f7b;
      color: white;
      z-index: 10;
      &::after {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px solid #141f7b;
        border-radius: 20px;
      }
    `}

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: #141f7b;
    color: white;
    border: 2px solid #141f7b;

    /* 이미지 대비 */
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg)
        brightness(105%) contrast(102%);
    }
  }

  &:active {
    transform: scale(1.1);
    background-color: #141f7b;
    color: white;
    outline: none;
  }

  &:focus {
    outline: none;
  }

  svg {
    fill: rgba(255, 255, 255, 0.8);
    stroke: #edeac5;
    stroke-width: 1;
  }
`;
