// Mainpage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Orangebutton from "../components/Orangebutton";
import logoSrc from "../images/logo.svg"; // 로고 이미지 파일 경로
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

import {
  Header,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Header"; // Header 컴포넌트를 가져옴

// 메인 컨테이너 스타일 정의
const MainContainer = styled.div`
  background-color: #fefdf6;
  padding-top: 80px; /* 헤더 높이만큼 패딩 추가 */
`;

// 이미지 컨테이너 스타일 정의
const ImageContainer = styled.div`
  text-align: center;
  overflow: hidden;
  height: 100%;
  margin: 0;
  border: none;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    margin: 0;
    border: none;
  }
`;

// SVG 행 스타일 정의
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

// 버튼 센터 스타일 정의
const ButtonCenter = styled.div`
  display: flex;
  justify-content: center;
  padding: 5% 0;
`;

const Mainpage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <MainContainer>
      <Header isScrolled={isScrolled}>
        <LogoContainer>
          <Logo data={logoSrc} type="image/svg+xml" />
        </LogoContainer>
        <ButtonContainer>
          <Button>AI 검토 받으러 가기</Button>
          <Button>상대방과 계약서 검토하기</Button>
        </ButtonContainer>
      </Header>

      <ImageContainer>
        <img src={main1Src} alt="main1" />
      </ImageContainer>
      <ImageContainer>
        <img src={main2Src} alt="main2" />
      </ImageContainer>
      <SvgRow>
        <img src={main1_1Src} alt="main1_1" />
        <img src={arrowSrc} alt="arrow1" className="arrow" />
        <img src={main1_2Src} alt="main1_2" />
        <img src={arrowSrc} alt="arrow2" className="arrow" />
        <img src={main1_3Src} alt="main1_3" />
      </SvgRow>
      <ButtonCenter>
        <Orangebutton>계약서 검토 받으러 가기</Orangebutton>
      </ButtonCenter>
      <SvgRow>
        <img src={main2_1Src} alt="main2_1" />
        <img src={arrowSrc} alt="arrow3" className="arrow" />
        <img src={main2_2Src} alt="main2_2" />
        <img src={arrowSrc} alt="arrow4" className="arrow" />
        <img src={main2_3Src} alt="main2_3" />
      </SvgRow>
      <ButtonCenter>
        <Orangebutton>상대방과 계약서 검토하러 가기</Orangebutton>
      </ButtonCenter>
      <ImageContainer>
        <img src={mainendSrc} alt="mainend" />
      </ImageContainer>
    </MainContainer>
  );
};

export default Mainpage;
