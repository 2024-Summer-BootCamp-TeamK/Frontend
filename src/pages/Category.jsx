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

const Category = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [itemsQueue, setItemsQueue] = useState(items);

  const handlePrev = () => {
    setItemsQueue((prevItems) => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
  };

  const handleNext = () => {
    setItemsQueue((prevItems) => [...prevItems.slice(1), prevItems[0]]);
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
  margin: 120px 0 50px 0;
  font-size: 24px;
  color: #141F7B;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  width: 100%;
  overflow: hidden;
  position: relative; // Container에 상대 위치 지정
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  overflow: hidden;
`;

const CardSlider = styled.div`
  display: flex;
  justify-content: center;  // 중앙 정렬 추가
  transition: transform 0.5s ease-in-out;
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px; // 카드 너비 설정
  height: 300px; // 카드 높이 설정
  margin: 0 10px;
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
  height: 80%; // 아이콘 래퍼 높이를 키움
  background-color: ${(props) => (props.active ? "#141F7B" : "#FAD23F")};
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 70%; // 아이콘의 크기를 부모 요소에 맞게 조정
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
