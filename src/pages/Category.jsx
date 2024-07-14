import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import fileSrc from "../images/file.svg";

import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg"; // logo.svg 파일 경로를 올바르게 설정
const items = [
  { id: 1, label: "계약서 1" },
  { id: 2, label: "계약서 2" },
  { id: 3, label: "근로 계약서" },
  { id: 4, label: "계약서 4" },
  { id: 5, label: "계약서 5" },
];
const Category = () => {
  const [activeIndex, setActiveIndex] = React.useState(2);
  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };
  return (
    <>
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
          <CarouselTrack activeIndex={activeIndex}>
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <IconWrapper active={index === activeIndex}>
                  <Icon src={fileSrc} /> {/* logoSrc를 올바르게 설정 */}
                </IconWrapper>
                <Label>{item.label}</Label>
              </CarouselItem>
            ))}
          </CarouselTrack>
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
  margin: 50px 0;
  font-size: 24px;
  color: #141F7B; 
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 900px; /* 필요한 높이로 설정 */
  width: 100%;
  overflow: hidden;
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 150%;
  white-space: nowrap;
  overflow: hidden;
`;
const CarouselItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: ${(props) => (props.active ? "scale(1.2)" : "scale(1)")};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
`;
const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ activeIndex }) =>
    `translateX(calc(50% - ${activeIndex * 246.73 + 123.365}px))`};
`;
const IconWrapper = styled.div`
  width: 236.73px;
  height: 276.43px;
  background-color: ${(props) => (props.active ? "#141F7B" : "#FAD23F")};
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 118.36px;
    height: 138.21px;
  }
`;
const Icon = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-left: 20px; /* 오른쪽으로 이동 */
`;
const Label = styled.span`
  font-size: 30px;
  color: black;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const ArrowButton = styled.button`
  background-color: #141F7B;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 5px;
  &:hover {
    background-color: #0F154B;
  }
`;