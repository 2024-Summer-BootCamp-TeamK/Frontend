import React, { useState, useEffect } from "react";
import styled, { keyframes, css, createGlobalStyle } from "styled-components";
import Header from "../components/Header";
import Orangebutton from "../components/Orangebutton";
import logoSrc from "../images/logo.svg";
import main1Src from "../images/main1.svg";
import main2Src from "../images/main2.svg";
import main1_1Src from "../images/main1-1.svg";
import main1_2Src from "../images/main1-2.svg";
import main1_3Src from "../images/main1-3.svg";
import arrowSrc from "../images/arrow.svg";
import main2_1Src from "../images/main2-1.svg";
import main2_2Src from "../images/main2-2.svg";
import main2_3Src from "../images/main2-3.svg";
import mainendSrc from "../images/mainend.svg";
import { useNavigate } from 'react-router-dom';
import UseIntersectionObserver from '../components/UseIntersectionObserver';

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Cafe24Decobox', serif;
  }
`;

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
  100% {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const cliptext = keyframes`
  0% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
    transform: translateY(100%);
  }
  95% {
    transform: translateY(0%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

const Mainpage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const [ref1_1, inView1_1] = UseIntersectionObserver({ threshold: 0.1 });
  const [ref1_2, inView1_2] = UseIntersectionObserver({ threshold: 0.1 });
  const [ref1_3, inView1_3] = UseIntersectionObserver({ threshold: 0.1 });
  const [ref2_1, inView2_1] = UseIntersectionObserver({ threshold: 0.1 });
  const [ref2_2, inView2_2] = UseIntersectionObserver({ threshold: 0.1 });
  const [ref2_3, inView2_3] = UseIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const applyAnimation = (id, delay = 0) => {
      const dom = document.getElementById(id); // 주어진 id를 사용하여 DOM 요소를 가져옴
      const chars = dom.innerText.split(""); // 텍스트를 개별 문자로 분할하여 배열에 저장
      dom.innerHTML = ""; // DOM 요소의 기존 내용을 비움
      chars.forEach((char, index) => { // 각 문자를 순회하며 처리
        const span = document.createElement("span"); // 새로운 span 요소 생성
        span.innerText = char === " " ? "\u00A0" : char; // 공백 문자는 특수 공백 문자로, 나머지는 그대로 설정
        span.style.animationDelay = `${0.1 * index + delay}s`; // 애니메이션 지연 시간을 설정
        span.classList.add('clip'); // span 요소에 'clip' 클래스를 추가하여 애니메이션 적용

        // 부모 요소의 폰트 스타일을 span에 직접 적용
        span.style.fontFamily = getComputedStyle(dom).fontFamily; // 부모 요소의 font-family 스타일을 상속
        span.style.fontSize = getComputedStyle(dom).fontSize; // 부모 요소의 font-size 스타일을 상속
        span.style.fontWeight = getComputedStyle(dom).fontWeight; // 부모 요소의 font-weight 스타일을 상속
        span.style.fontStyle = getComputedStyle(dom).fontStyle; // 부모 요소의 font-style 스타일을 상속

        dom.appendChild(span); // 새로 만든 span 요소를 DOM에 추가
      });
    };

    applyAnimation("text-overlay1"); // 'text-overlay1' 요소에 애니메이션 적용
    applyAnimation("text-overlay2", 1.5); // 'text-overlay2' 요소에 1.5초 지연 후 애니메이션 적용
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Header logoSrc={logoSrc} isScrolled={isScrolled} />

        <ImageContainer>
          <img src={main1Src} alt="main1" />
          <TextOverlayContainer>
            <TextOverlayLine id="text-overlay1">
              SHARE YOUR
            </TextOverlayLine>
            <TextOverlayLine id="text-overlay2" offset>
              CONTRACT WITH US
            </TextOverlayLine>
          </TextOverlayContainer>
        </ImageContainer>
        <ImageContainer>
          <img src={main2Src} alt="main2" />
        </ImageContainer>
        <SvgRow>
          <AnimatedImage ref={ref1_1} src={main1_1Src} alt="main1_1" inView={inView1_1} />
          <img src={arrowSrc} alt="arrow1" className="arrow" />
          <AnimatedImage ref={ref1_2} src={main1_2Src} alt="main1_2" inView={inView1_2} />
          <img src={arrowSrc} alt="arrow2" className="arrow" />
          <AnimatedImage ref={ref1_3} src={main1_3Src} alt="main1_3" inView={inView1_3} />
        </SvgRow>
        <ButtonCenter>
          <Orangebutton onClick={() => navigate('/category')}>계약서 검토 받으러 가기</Orangebutton>
        </ButtonCenter>
        <SvgRow>
          <AnimatedImage ref={ref2_1} src={main2_1Src} alt="main2_1" inView={inView2_1} />
          <img src={arrowSrc} alt="arrow3" className="arrow" />
          <AnimatedImage ref={ref2_2} src={main2_2Src} alt="main2_2" inView={inView2_2} />
          <img src={arrowSrc} alt="arrow4" className="arrow" />
          <AnimatedImage ref={ref2_3} src={main2_3Src} alt="main2_3" inView={inView2_3} />
        </SvgRow>
        <ButtonCenter>
          <Orangebutton onClick={() => navigate('/fileuploadshare')}>상대방과 계약서 검토하러 가기</Orangebutton>
        </ButtonCenter>
        <ImageContainer>
          <img src={mainendSrc} alt="mainend" />
        </ImageContainer>
      </MainContainer>
    </>
  );
};

export default Mainpage;

const MainContainer = styled.div`
  background-color: #fefdf6;
  padding-top: 80px;
  position: relative;
`;

const ImageContainer = styled.div`
  text-align: center;
  margin: 0;
  border: none;
  position: relative;
  z-index: 1;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    margin: 0;
    border: none;
    position: relative;
    z-index: 1;
  }
`;

const TextOverlayContainer = styled.div`
  @font-face {
    font-family: 'Cafe24Decobox';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Decobox.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  position: absolute;
  top: 10%; /* 첫 번째 줄의 시작 위치 */
  left: 55%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: left;
  width: 100%;
`;

const TextOverlayLine = styled.div`
  color: #E7470A;
  font-size: clamp(140%, 5vw, 500%); /* 폰트 크기를 동적으로 조정 */
  font-weight: 900; /* Cafe24Decobox 폰트의 굵기 설정 */
  font-style: normal; /* Cafe24Decobox 폰트 스타일 설정 */
  line-height: 1.2; /* 줄 간격 조정 */
  padding: 5px 0; /* 텍스트 위아래 공간 조정 */
  margin-top: 0px;
  font-family: 'Cafe24Decobox', serif !important; /* 폰트 적용에 !important 추가 */

  span {
    display: inline-block;
    animation: ${cliptext} 1s ease-in-out both;
    font-family: inherit; /* 부모 요소의 폰트 상속 */
    font-size: inherit; /* 부모 요소의 폰트 크기 상속 */
    font-weight: inherit; /* 부모 요소의 폰트 두께 상속 */
    font-style: inherit; /* 부모 요소의 폰트 스타일 상속 */
  }

  @media (max-width: 768px) {
    padding: 2px 0;
  }
`;



const SvgRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2% 0;
  margin-top: ${({ marginTop }) => marginTop || "0"};

  img {
    width: 20%;
    height: auto;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .arrow {
    width: 5%;
    height: auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    img,
    .arrow {
      width: 60%;
      margin-bottom: 2%;
    }
  }
`;

const ButtonCenter = styled.div`
  display: flex;
  justify-content: center;
  padding: 5% 0;
`;

const AnimatedImage = styled.img`
  ${({ inView }) =>
    inView &&
    css`
      animation: ${fadeInDown} 2s;
    `}
`;
