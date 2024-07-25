import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
import Textanimation from "../components/Textanimation";
import { useNavigate } from 'react-router-dom';

const Mainpage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

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
      <Header logoSrc={logoSrc} isScrolled={isScrolled} />

      <ImageContainer>
        <img src={main1Src} alt="main1" />
        <TextAnimationContainer>
          <Textanimation />
        </TextAnimationContainer>
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
        <Orangebutton onClick={() => navigate('/category')}>계약서 검토 받으러 가기</Orangebutton>
      </ButtonCenter>
      <SvgRow>
        <img src={main2_1Src} alt="main2_1" />
        <img src={arrowSrc} alt="arrow3" className="arrow" />
        <img src={main2_2Src} alt="main2_2" />
        <img src={arrowSrc} alt="arrow4" className="arrow" />
        <img src={main2_3Src} alt="main2_3" />
      </SvgRow>
      <ButtonCenter>
        <Orangebutton onClick={() => navigate('/fileuploadshare')}>상대방과 계약서 검토하러 가기</Orangebutton>
      </ButtonCenter>
      <ImageContainer>
        <img src={mainendSrc} alt="mainend" />
      </ImageContainer>
    </MainContainer>
  );
};

export default Mainpage;

const MainContainer = styled.div`
  background-color: #fefdf6;
  padding-top: 80px;
`;

const ImageContainer = styled.div`
  text-align: center;
  overflow: hidden;
  height: 100%;
  margin: 0;
  border: none;
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
    margin: 0;
    border: none;
  }
`;

const TextAnimationContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  pointer-events: none;
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
