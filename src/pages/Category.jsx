import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
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
  const [activeIndex, setActiveIndex] = useState(items.length);
  const containerRef = useRef(null);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (activeIndex >= items.length * 2) {
      setTimeout(() => {
        container.style.transition = "none";
        setActiveIndex(items.length);
        setTimeout(() => {
          container.style.transition = "transform 0.5s ease-in-out";
        }, 50);
      }, 500);
    } else if (activeIndex < 0) {
      setTimeout(() => {
        container.style.transition = "none";
        setActiveIndex(items.length - 1);
        setTimeout(() => {
          container.style.transition = "transform 0.5s ease-in-out";
        }, 50);
      }, 500);
    }
  }, [activeIndex]);

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
      <CarouselContainer>
        <ArrowButton onClick={handlePrev} style={{ left: 0 }}>
          {"<"}
        </ArrowButton>
        <CarouselWrapper>
          <Carousel ref={containerRef} activeIndex={activeIndex}>
            {[...items, ...items, ...items].map((item, index) => (
              <CarouselItem
                key={index}
                active={index % items.length === activeIndex % items.length}
                onClick={() => setActiveIndex(index)}
              >
                <IconWrapper
                  active={index % items.length === activeIndex % items.length}
                >
                  <Icon src={fileSrc} />
                </IconWrapper>
                <Label>{item.label}</Label>
              </CarouselItem>
            ))}
          </Carousel>
        </CarouselWrapper>
        <ArrowButton onClick={handleNext} style={{ right: 0 }}>
          {">"}
        </ArrowButton>
      </CarouselContainer>
    </>
  );
};

export default Category;

// Styled-components
const Title = styled.h1`
  text-align: center;
  margin: 20vh 0 0vh 0; /* 위쪽 마진을 20vh로 설정 */
  font-size: 30px;
  color: #141f7b;
`;

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh; /* 전체 높이에서 타이틀의 위쪽 마진을 뺀 값으로 설정 */
  width: 100%;
  overflow: visible;
  gap: 30px; /* ArrowButton과 Carousel 간의 간격 설정 */
`;

const CarouselWrapper = styled.div`
  width: 80%;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Carousel = styled.div`
  display: flex;
  transform: ${({ activeIndex }) =>
    `translateX(calc(50% - ${activeIndex * 280}px))`}; /* 간격을 벌리기 위해 값 조정 */
  transition: transform 0.5s ease-in-out;
`;

const CarouselItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px; /* 컴포넌트 간의 간격 설정 */
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: ${(props) => (props.active ? "scale(1)" : "scale(1)")};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  width: 16vw;
  height: 33vh;
  flex: 0 0 auto;
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.active ? "#141F7B" : "#FAD23F")};
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
  }
`;

const Icon = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const Label = styled.span`
  font-size: 24px;
  color: black;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ArrowButton = styled.button`
  background-color: #141f7b;
  color: white;
  border: none;
  width: 50px; /* 원형 버튼의 너비와 높이를 설정 */
  height: 50px; /* 원형 버튼의 너비와 높이를 설정 */
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%; /* 원형으로 만들기 위해 50% 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    background-color: #0f154b;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  margin-left: 50vh;
  margin-right: 60vh;
  z-index: 1;
`;
