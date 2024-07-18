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

// 전역 스타일 정의
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 37.5em; // 여기서 상단 패딩을 추가합니다.

`;

// 로딩 바 애니메이션 키 프레임
const loaderAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

// 카운터 애니메이션 키 프레임
const counterAnimation = keyframes`
  from { left: -25px; }
  to { left: 323px; }
`;

const animationDuration = '10s'; // 원하는 애니메이션 지속 시간 설정

const Wrapper = styled.div`
  width: 370px;
  margin: 100px auto;
  position: relative; /* Add this to position the description box */

  .description-box {
    position: absolute;
    top: -300px; /* Adjust this value to position it correctly */
    left: 50%; /* Position 50% from the left */
    transform: translate(-50%, -50%); /* Center horizontally and vertically */
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 550px;
    text-align: center;
    font-size: 14px;
    color: #333333;
    z-index: 1; /* Ensure it's above the loading bar */
  }

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
    color: #ffffff;
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

  h2 {
      font-size: 34px;
      padding: 10px 0 8px 0;
      color: #141F7B;
      text-align: center;
    }

  subtitle {
    font-size: 15px;
    padding: 30px 0 8px 0;
    color: #141F7B;
    text-align: center;
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
const Loading2 = () => {
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
      <Wrapper>
        <div className="description-box">
          <h2>LawBot</h2>
          <br></br>
          <subtitle>LawBot은 학습되어 있는 법률 데이터로 사용자의 계약서를 면밀히 검토해줍니다.</subtitle>
          <br></br>
          <br></br>
          <p>검토 내용은 2가지 항목입니다 [ 주요 | 독소 ] </p>
          <p>주요: 사용자가 꼭 인지하고 있어야 할 계약서 내 주요 조항들을 대상으로 합니다.</p>
          <p>독소: 사용자에게 불리하게 작용할 수 있는 계약서 내 독소 조항들을 대상으로 합니다.</p>
          <br></br>
          <p>검토결과</p>
          <p>검토 결과로 '원문 / 이유 / 법 조항 / 대체 문장' 을 제시 해줍니다.</p>
          <br></br>
          <p>계약서 수정</p>
          <p>사용자는 검토 결과 중 원하는 문장들을 선택하여 대체 문장으로의 수정을 요청할 수 있습니다. </p>
          <br></br>
          <p>계약서 저장</p>
          <p>☑️수정된 계약서는 사용자에게 PDF파일로 제공됩니다.</p>
          <p>☑️사용자의 계약서는 7일 뒤 데이터베이스에서 자동으로 삭제됩니다.</p>
        </div>
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

export default Loading2;
