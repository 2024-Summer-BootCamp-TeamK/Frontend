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

// Import the font using createGlobalStyle
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Rakkas", serif;
    src: url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Rakkas&display=swap');
    font-weight: 400;
    font-style: normal;
  }
  
  body {
    font-family: 'Rakkas', serif;
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
      const dom = document.getElementById(id);
      const chars = dom.innerText.split("");
      dom.innerHTML = "";
      chars.forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.animationDelay = `${0.1 * index + delay}s`;
        span.classList.add('clip');
        dom.appendChild(span);
      });
    };

    applyAnimation("text-overlay1");
    applyAnimation("text-overlay2", 1.5); // `text-overlay2`는 1.5초 지연
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Header logoSrc={logoSrc} isScrolled={isScrolled} />

        <ImageContainer>
          <img src={main1Src} alt="main1" />
          <TextOverlayContainer>
            <TextOverlayLine id="text-overlay1">
              SHARE&nbsp;YOUR
            </TextOverlayLine>
            <TextOverlayLine id="text-overlay2" offset>
              CONTRACT&nbsp;WITH&nbsp;US
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
  font-size: 3vw; /* 뷰포트 크기에 맞춰 폰트 크기 조정 */
  font-weight: bold;
  line-height: 1; /* 줄 간격 조정 */
  padding: 5px 0; /* 텍스트 위아래 공간 조정 */
  margin-top: 20px;
  font-family: 'Rakkas', serif !important; /* 폰트 적용에 !important 추가 */

  span {
    display: inline-block;
    animation: ${cliptext} 1s ease-in-out both;
  }

  @media (max-width: 1200px) {
    font-size: 3vw; /* 1200px 이하 화면에서 폰트 크기 조정 */
    line-height: 1; /* 1200px 이하 화면에서 줄 간격 조정 */
  }

  @media (max-width: 992px) {
    font-size: 2.5vw; /* 992px 이하 화면에서 폰트 크기 조정 */
    line-height: 1; /* 992px 이하 화면에서 줄 간격 조정 */
  }

  @media (max-width: 768px) {
    font-size: 2.5vw; /* 768px 이하 화면에서 폰트 크기 조정 */
    line-height: 0.5; /* 768px 이하 화면에서 줄 간격 조정 */
  }

  @media (max-width: 576px) {
    font-size: 2vw; /* 576px 이하 화면에서 폰트 크기 조정 */
    line-height: 0.5; /* 576px 이하 화면에서 줄 간격 조정 */
  }

  @media (max-width: 480px) {
    font-size: 1.5vw; /* 480px 이하 화면에서 폰트 크기 조정 */
    line-height: 0.5; /* 480px 이하 화면에서 줄 간격 조정 */
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
