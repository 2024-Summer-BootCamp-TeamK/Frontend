import React, { useEffect } from "react";
import Lottie from "react-lottie";
import animationData2 from "../lottie/Loading3.json";
import Button from "../components/Button";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
    Headerall,
    LogoContainer,
    Logo,
    ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
`;

const bgColor = '#DFDFDF';
const foldColor = '#F7F7F6';
const activeColor = '#868686';

const loadingAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;


const Document = styled.div`
  width: 15em;
  height: 25em;
  position: relative;
  cursor: pointer;

  &.loading .bottom .bar:nth-child(2)::before {
    animation: ${loadingAnimation} 1s infinite;
  }

  &.loading .bottom .bar:nth-child(3)::before {
    animation: ${loadingAnimation} 1s 0.1s infinite;
  }

  &.loading .bottom .bar:nth-child(4)::before {
    animation: ${loadingAnimation} 1s 0.2s infinite;
  }

  &:hover .bottom .bar, &:hover .bottom .icon {
    background: ${activeColor};
  }

  &:hover .bottom .icon.fa {
    color: ${activeColor};
  }

  .name {
    color: ${bgColor};
    width: 100%;
    text-align: center;
    font-size: 1.5em;
    line-height: 2em;
    padding: 1em 0;
  }

  .bottom {
    width: 15em;
    height: 15em;
    background-color: ${bgColor};
    padding-top: 5em;
    box-sizing: border-box;

    .icon {
      position: absolute;
      width: 5em;
      height: 5em;
      background: #ccc;
      margin: 0 auto;
      border-radius: 0.5em;
      top: 4em;
      left: 3em;
      padding: 0.5em;
      box-sizing: border-box;
      text-align: center;

      span {
        font-size: 3.5em;
        font-weight: bold;
        color: ${bgColor};
        line-height: 1.25em;
      }
    }

    .bar, .icon {
      transition: all 0.5s;
    }

    .fa.icon {
      background-color: transparent;
      color: #ccc;
      font-size: 5em;
      top: 0.25em;
      left: 0em;
      text-align: left;
    }

    .bar {
      width: 10em;
      height: 1em;
      border-radius: 0.5em;
      background: #ccc;
      margin: 1.25em auto;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10%;
        height: 80%;
        width: 0%;
        background-color: ${activeColor};
      }
    }
  }

  .top {
    width: 10em;
    height: 5em;
    background-color: ${bgColor};

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      right: 0;
      border-top: solid 5em transparent;
      border-left: 5em solid ${foldColor};
      box-shadow: -0.5em 0.5em 0.5em #ccc;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 10em; // 여기서 상단 패딩을 추가합니다.

`;


const animationDuration = '10s'; // 원하는 애니메이션 지속 시간 설정

const loaderAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const counterAnimation = keyframes`
  from { left: -25px; }
  to { left: 323px; }
`;

const Wrapper = styled.div`
  width: 370px;
  margin: 100px auto;

  .load-bar {
    width: 100%;
    height: 25px;
    border-radius: 30px;
    background: #dcdbd7;
    position: relative;
    box-shadow:
      0 1px 0 rgba(255,255,255,0.8),
      inset 0 2px 3px rgba(0,0,0,0.2);
  }

  .load-bar:hover .load-bar-inner,
  .load-bar:hover #counter {
    animation-play-state: paused;
  }

  .load-bar-inner {
    height: 99%;
    width: 0%;
    border-radius: inherit;
    position: relative;
    background: #c2d7ac;
    background: linear-gradient(#F6D767, #FAD23F);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,1),
      0 1px 5px rgba(0,0,0,0.3),
      0 4px 5px rgba(0,0,0,0.3);
    animation: ${loaderAnimation} ${animationDuration} linear forwards;
  }

  #counter {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #141F7B;
    background: linear-gradient(#141F7B, #141F7B);
    padding: 5px 10px;
    border-radius: 0.4em;
    box-shadow: 
      inset 0 1px 0 rgba(255,255,255,2),
      0 2px 4px 1px rgba(0,0,0,0.1),
      0 1px 3px 1px rgba(0,0,0,0.1);
    left: -25px;
    top: -50px;
    font-size: 12px;
    font-color: #FEFDF6;
    font-weight: bold;
    width: 44px;
    height: 25px;
    animation: ${counterAnimation} ${animationDuration} linear forwards;
  }

  #counter:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: #141F7B;
    transform: rotate(45deg);
    left: 50%;
    margin-left: -4px;
    bottom: -4px;
    box-shadow:
      3px 3px 4px rgba(0,0,0,0.2),
      1px 1px 1px 1px rgba(0,0,0,0.1);
    border-radius: 0 0 3px 0;
  }

  h1 {
    font-size: 34px;
    padding: 30px 0 8px 0;
    color: #141F7B;
    text-align: center;
  }

  p {
    font-size: 13px;
  }
`;

const Loading = () => {
  useEffect(() => {
    let interval = setInterval(increment, 100); // 15초 동안 100%로 증가하도록 수정
    let current = 0;

    function increment() {
      current++;
      document.getElementById('counter').innerHTML = Math.min(current, 100) + '%';
      document.querySelector('.load-bar-inner').style.width = Math.min(current, 100) + '%';
      if (current === 100) {
        clearInterval(interval);
      }
    }

    const loadBar = document.querySelector('.load-bar');

    function pauseInterval() {
      clearInterval(interval);
    }

    function resumeInterval() {
      if (current < 100) {
        interval = setInterval(increment, 150); // 15초 동안 100%로 증가하도록 수정
      }
    }

    loadBar.addEventListener('mouseover', pauseInterval);
    loadBar.addEventListener('mouseout', resumeInterval);

    return () => {
      clearInterval(interval);
      loadBar.removeEventListener('mouseover', pauseInterval);
      loadBar.removeEventListener('mouseout', resumeInterval);
    };
  }, []);


  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      <GlobalStyle />
      <div>
        <Headerall>
          <LogoContainer>
            <Logo data={logoSrc} type="image/svg+xml" />
          </LogoContainer>
          <ButtonContainer>
            <Button>AI 검토 받으러 가기</Button>
            <Button>상대방과 계약서 검토하기</Button>
          </ButtonContainer>
        </Headerall>
      </div>
      <Container>
        <Lottie 
            options={defaultOptions2} 
            loop
            autoplay
            height={400} 
            width={400} />
        <Wrapper>
          <div className="load-bar">
            <div className="load-bar-inner" data-loading="0">
                <span id="counter"></span>
            </div>
          </div>
          <h1>계약서를 검토중입니다...</h1>
        </Wrapper>
      </Container>
    </>
  );
};

export default Loading;
