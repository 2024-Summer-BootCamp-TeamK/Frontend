import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import animationData2 from "../lottie/Loading3.json";
import Button from "../components/Button2";
import styled, { createGlobalStyle, keyframes } from "styled-components";

import Headerall from "../components/Headerall";
import logoSrc from "../images/logo.svg";

const animationDuration = "15s"; // 애니메이션 지속 시간 설정

const loaderAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const counterAnimation = keyframes`
  from { left: -25px; }
  to { left: 323px; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 10em; // 상단 패딩 추가
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
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 2px 3px rgba(0, 0, 0, 0.2);
  }

  .load-bar-inner {
    height: 99%;
    width: 100%; // 0에서 시작해 100%로 애니메이션
    border-radius: inherit;
    position: relative;
    background: #c2d7ac;
    background: linear-gradient(#f6d767, #fad23f);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 1), 0 1px 5px rgba(0, 0, 0, 0.3),
                0 4px 5px rgba(0, 0, 0, 0.3);
    animation: ${loaderAnimation} ${animationDuration} linear forwards;
  }

  #counter {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #141f7b;
    background: linear-gradient(#141f7b, #141f7b);
    padding: 5px 10px;
    border-radius: 0.4em;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 2), 0 2px 4px 1px rgba(0, 0, 0, 0.1),
                0 1px 3px 1px rgba(0, 0, 0, 0.1);
    left: -25px;
    top: -50px;
    font-size: 12px;
    color: #fff;
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
    background: #141f7b;
    transform: rotate(45deg);
    left: 50%;
    margin-left: -4px;
    bottom: -4px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2), 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 3px 0;
  }

  h1 {
    font-size: 34px;
    padding: 30px 0 8px 0;
    color: #141f7b;
    text-align: center;
  }

  p {
    font-size: 13px;
  }
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  outline: none;

  &:focus {
    outline: none; /* 버튼 포커스 시 아웃라인 제거 */
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
`;

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let current = 0;
    const counterElement = document.getElementById("counter");

    // counter 업데이트 함수
    const increment = () => {
      current++;
      if (current <= 100) {
        counterElement.innerHTML = current + "%";
      }
    };

    // 150ms 간격으로 counter 업데이트
    const interval = setInterval(increment, 150);

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 interval 클리어
    };
  }, []);

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div>
        <Headerall>

        </Headerall>
      </div>
      <Container>
        <Lottie
          options={defaultOptions2}
          loop
          autoplay
          height={400}
          width={400}
        />
        <Wrapper>
          <div className="load-bar">
            <div className="load-bar-inner">
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
