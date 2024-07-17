import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
<<<<<<< HEAD
=======
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
>>>>>>> design/카테고리-페이지-기능구현
import Button from "../components/Button";
import arrowLSrc from '../images/arrowL.svg';
import arrowRSrc from '../images/arrowR.svg';
import fileSrc from "../images/file.svg";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg"; // logo.svg 파일 경로를 올바르게 설정

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

const items = [
  { id: 1, label: "계약서 1" },
  { id: 2, label: "계약서 2" },
  { id: 3, label: "근로 계약서" },
  { id: 4, label: "계약서 4" },
  { id: 5, label: "계약서 5" },
];

<<<<<<< HEAD
const Category = () => {

  const [activeIndex, setActiveIndex] = useState(2);
  const [itemsQueue, setItemsQueue] = useState(items);

  const handlePrev = () => {
    setItemsQueue((prevItems) => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
  };

  const handleNext = () => {
    setItemsQueue((prevItems) => [...prevItems.slice(1), prevItems[0]]);
  };

=======
// 카드 슬라이더 애니메이션
const slideLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-20%);
  }
`;

const slideRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20%);
  }
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;  // width를 100%로 유지
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Slider = styled.div`
  display: flex;
  ${({ direction }) =>
    direction &&
    css`
      animation: ${direction === "left" ? slideLeft : slideRight} 0.5s ease-in-out;
    `}
`;

const SlideItem = styled.div`
  flex: 0 0 20%;
  transition: transform 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [activeIndex, setActiveIndex] = useState(2);
  const [itemsQueue, setItemsQueue] = useState(items);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => {
        if (direction === "left") {
          setItemsQueue((prevItems) => [...prevItems.slice(1), prevItems[0]]);
        } else if (direction === "right") {
          setItemsQueue((prevItems) => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
        }
        setDirection(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  const handlePrev = () => {
    setDirection("right");
  };

  const handleNext = () => {
    setDirection("left");
  };

  const handleCardClick = (index) => {
    if (index === activeIndex) {
      navigate('/fileupload');
    }
  };
>>>>>>> design/카테고리-페이지-기능구현

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
      <Title>계약서의 카테고리를 선택해주세요</Title>
<<<<<<< HEAD
      <Container>
        <ArrowButton onClick={handlePrev}>{"<"}</ArrowButton>
        <Carousel>
          <CardSlider>
            {itemsQueue.slice(0, 5).map((item, index) => (
              <CarouselItem key={item.id} active={index === activeIndex}>
                <IconWrapper active={index === activeIndex}>
                  <Icon src={fileSrc} alt={item.label} />
                </IconWrapper>
                <Label>{item.label}</Label>
              </CarouselItem>
            ))}
          </CardSlider>
=======
      <Container style={{ height: 'calc(100vh - 120px)' }}>
        <Carousel style={{ height: '70%' }}>
          <SliderWrapper style={{ height: '100%' }}>
            <Slider direction={direction} style={{ height: '100%' }}>
              {itemsQueue.slice(0, 5).map((item, index) => (
                <SlideItem key={item.id} style={{ height: '100%' }}>
                  <CarouselItem
                    active={index === activeIndex}
                    style={{ height: '300px' }}
                    onClick={() => handleCardClick(index)} // 클릭 핸들러 추가
                  >
                    <IconWrapper active={index === activeIndex} style={{ height: '100%' }}>
                      <Icon src={fileSrc} alt={item.label} />
                    </IconWrapper>
                    <Label>{item.label}</Label>
                  </CarouselItem>
                </SlideItem>
              ))}
            </Slider>
          </SliderWrapper>
          <ButtonL onClick={handlePrev}><img src={arrowLSrc} alt="Previous" /></ButtonL>
          <ButtonR onClick={handleNext}><img src={arrowRSrc} alt="Next" /></ButtonR>
>>>>>>> design/카테고리-페이지-기능구현
        </Carousel>
      </Container>
    </>
  );
};

export default Category;

// Styled-components
const Title = styled.h1`
  text-align: center;
<<<<<<< HEAD
  margin: 120px 0 50px 0;
  font-size: 24px;
  color: #141F7B;
=======
  margin: 20px 0 20px 0;
  font-size: 35px;
  color: #141F7B;
  margin-top: 150px;
>>>>>>> design/카테고리-페이지-기능구현
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
<<<<<<< HEAD
  height: calc(100vh - 120px);
  width: 100%;
  overflow: hidden;
  position: relative; // Container에 상대 위치 지정
=======
  width: 100%;
  position: relative;
>>>>>>> design/카테고리-페이지-기능구현
`;

const CarouselWrapper = styled.div`
  width: 80%;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
<<<<<<< HEAD
  width: 80%;
  height: 100%;
  overflow: hidden;
=======
  width: 100%;
  overflow: visible; // overflow visible로 변경
>>>>>>> design/카테고리-페이지-기능구현
`;

const CardSlider = styled.div`
  display: flex;
<<<<<<< HEAD
  justify-content: center;  // 중앙 정렬 추가
=======
  justify-content: center;
>>>>>>> design/카테고리-페이지-기능구현
  transition: transform 0.5s ease-in-out;
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD
  width: 220px; // 카드 너비 설정
  height: 300px; // 카드 높이 설정
  margin: 0 10px;
=======
  width: 220px;
  margin: 0 100px;
>>>>>>> design/카테고리-페이지-기능구현
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: ${(props) => (props.active ? "scale(1.2)" : "scale(1)")};
  transition: transform 0.3s ease, opacity 0.3s ease;

  @media (max-width: 768px) {
    width: 150px;
    height: 175px;
    margin: 0 5px;
  }
`;

const IconWrapper = styled.div`
  width: 100%;
<<<<<<< HEAD
  height: 80%; // 아이콘 래퍼 높이를 키움
=======
>>>>>>> design/카테고리-페이지-기능구현
  background-color: ${(props) => (props.active ? "#141F7B" : "#FAD23F")};
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
<<<<<<< HEAD
`;

const Icon = styled.img`
  width: 70%; // 아이콘의 크기를 부모 요소에 맞게 조정
=======

  ${(props) =>
    props.active &&
    css`
      &:hover {
        box-shadow: 0px 0px 10px 10px rgba(250, 210, 63, 0.5);
      }
    `}
`;


const Icon = styled.img`
  width: 70%;
>>>>>>> design/카테고리-페이지-기능구현
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Label = styled.span`
  font-size: 16px;
  color: black;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

<<<<<<< HEAD
const ArrowButton = styled.button`
  background-color: #141f7b;
  color: white;
  border: none;
  width: 50px; /* 원형 버튼의 너비와 높이를 설정 */
  height: 50px; /* 원형 버튼의 너비와 높이를 설정 */
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
=======
const ButtonL = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  left: calc(50% - 250px); // 원하는 위치로 조정
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0;
  outline: none;
>>>>>>> design/카테고리-페이지-기능구현

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    left: calc(50% - 180px);
  }
`;

const ButtonR = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: calc(50% - 250px); // 원하는 위치로 조정
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0;
  outline: none;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    right: calc(50% - 180px);
  }

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    right: 0;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 5px 10px;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  margin-left: 50vh;
  margin-right: 60vh;
  z-index: 1;
`;
