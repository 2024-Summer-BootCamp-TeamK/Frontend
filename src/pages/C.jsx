import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import Button from "../components/Button";
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
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
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
      <Container style={{ height: 'calc(100vh - 120px)' }}>
        <ArrowButton onClick={handlePrev}>{"<"}</ArrowButton>
        <Carousel style={{ height: '70%' }}>
          <SliderWrapper style={{ height: '100%' }}>
            <Slider direction={direction} style={{ height: '100%' }}>
              {itemsQueue.slice(0, 5).map((item, index) => (
                <SlideItem key={item.id} style={{ height: '100%' }}>
                  <CarouselItem active={index === activeIndex} style={{ height: '300px' }}>
                    <IconWrapper active={index === activeIndex} style={{ height: '100%' }}>
                      <Icon src={fileSrc} alt={item.label} />
                    </IconWrapper>
                    <Label>{item.label}</Label>
                  </CarouselItem>
                </SlideItem>
              ))}
            </Slider>
          </SliderWrapper>
        </Carousel>
        <ArrowButton onClick={handleNext}>{">"}</ArrowButton>
      </Container>
    </>
  );
};

export default Category;

// Styled-components
const Title = styled.h1`
  text-align: center;
  margin: 20px 0 20px 0;
  font-size: 24px;
  color: #141F7B;
  margin-top: 150px
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  /* height: calc(100vh - 120px); // height를 이곳에 넣어도 됩니다 */
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: visible; // overflow visible로 변경
`;

const CardSlider = styled.div`
  display: flex;
  justify-content: center;
  transition: transform 0.5s ease-in-out;
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin: 0 60px;
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
  background-color: ${(props) => (props.active ? "#141F7B" : "#FAD23F")};
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 70%;
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

const ArrowButton = styled.button`
  background-color: #141F7B;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;

  &:hover {
    background-color: #0F154B;
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
`;
