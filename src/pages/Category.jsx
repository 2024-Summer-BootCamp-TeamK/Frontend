import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import arrowLSrc from "../images/arrowL.svg";
import arrowRSrc from "../images/arrowR.svg";
import fileSrc from "../images/file.svg";
import Headerall from "../components/Headerall";
// logo.svg 파일 경로를 올바르게 설정

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
  { id: 1, label: "임대차 계약서" },
  { id: 2, label: "매매 계약서 " },
  { id: 3, label: "근로 계약서" },
  { id: 4, label: "증여 계약서" },
  { id: 5, label: "채무이행 계약서" },
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
  width: 100%; // width를 100%로 유지
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
      animation: ${direction === "left" ? slideLeft : slideRight} 0.5s
        ease-in-out;
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
          setItemsQueue((prevItems) => [
            prevItems[prevItems.length - 1],
            ...prevItems.slice(0, -1),
          ]);
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
      const selectedCategory = itemsQueue[activeIndex].label;
      navigate("/fileupload", { state: { category: selectedCategory } });
    }
  };

  return (
    <>
      <GlobalStyle />
      <Headerall />
      <Title>계약서의 카테고리를 선택해주세요</Title>
      <Container style={{ height: "calc(100vh - 120px)" }}>
        <Carousel style={{ height: "70%" }}>
          <SliderWrapper style={{ height: "100%" }}>
            <Slider direction={direction} style={{ height: "100%" }}>
              {itemsQueue.slice(0, 5).map((item, index) => (
                <SlideItem key={item.id} style={{ height: "100%" }}>
                  <CarouselItem
                    active={index === activeIndex}
                    style={{ height: "300px" }}
                    onClick={() => handleCardClick(index)} // 클릭 핸들러 추가
                  >
                    <IconWrapper
                      active={index === activeIndex}
                      style={{ height: "100%" }}
                    >
                      <Icon src={fileSrc} alt={item.label} />
                    </IconWrapper>
                    <Label>{item.label}</Label>
                  </CarouselItem>
                </SlideItem>
              ))}
            </Slider>
          </SliderWrapper>
          <ButtonL onClick={handlePrev}>
            <img src={arrowLSrc} alt="Previous" />
          </ButtonL>
          <ButtonR onClick={handleNext}>
            <img src={arrowRSrc} alt="Next" />
          </ButtonR>
        </Carousel>
      </Container>
    </>
  );
};

export default Category;

// Styled-components
const Title = styled.h1`
  text-align: center;
  margin: 20px 0 20px 0;
  font-size: 35px;
  color: #141f7b;
  margin-top: 220px;
  -webkit-text-stroke: 0.7px #141f7b;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 200px); // 150px을 뺀 높이 설정
  margin-top: -170px; // 상단 마진 설정
  overflow: visible; // overflow visible로 변경
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin: 0 100px;
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: ${(props) => (props.active ? "scale(1.2)" : "scale(1)")};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

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
  height: auto;
  margin: 0 0 10px 20px;
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

const ButtonL = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  left: calc(50% - 250px); // 원하는 위치로 조정
  top: 37%;
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
    left: calc(50% - 180px);
  }
`;

const ButtonR = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: calc(50% - 250px); // 원하는 위치로 조정
  top: 37%;
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
`;
