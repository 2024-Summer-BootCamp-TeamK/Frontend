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
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => prevIndex - 1);
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => prevIndex + 1);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (activeIndex === -1) {
            setActiveIndex(items.length - 1);
        } else if (activeIndex === items.length) {
            setActiveIndex(0);
        }
    };

    return (
        <>
            <Headerall>
                <LogoContainer>
                    <Logo data={logoSrc} type="image/svg+xml" />
                </LogoContainer>
                <ButtonContainer>
                    <Button>AI 검토 받으러 가기</Button>
                    <Button>상대방과 계약서 검토하기</Button>
                </ButtonContainer>
            </Headerall>
            <MainContent>
                <Title>계약서의 카테고리를 선택해주세요</Title>
                <Container>
                    <ArrowButton onClick={handlePrev}>{"<"}</ArrowButton>
                    <Carousel>
                        <CarouselTrack
                            activeIndex={activeIndex}
                            itemCount={items.length}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {[items[items.length - 1], ...items, items[0]].map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    active={
                                        index === activeIndex + 1 ||
                                        (activeIndex === -1 && index === 0) ||
                                        (activeIndex === items.length && index === items.length + 1)
                                    }
                                    onClick={() =>
                                        setActiveIndex(
                                            index === 0
                                                ? items.length - 1
                                                : index === items.length + 1
                                                    ? 0
                                                    : index - 1
                                        )
                                    }
                                >
                                    <IconWrapper
                                        active={
                                            index === activeIndex + 1 ||
                                            (activeIndex === -1 && index === 0) ||
                                            (activeIndex === items.length && index === items.length + 1)
                                        }
                                    >
                                        <Icon src={fileSrc} alt="File Icon" />
                                    </IconWrapper>
                                    <Label>{item.label}</Label>
                                </CarouselItem>
                            ))}
                        </CarouselTrack>
                    </Carousel>
                    <ArrowButton onClick={handleNext}>{">"}</ArrowButton>
                </Container>
            </MainContent>
        </>
    );
};

export default Category;

// Styled-components
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 가운데 정렬 */
  height: calc(100vh - 100px); /* 화면 전체 높이에서 헤더 높이를 뺀 값 */
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  display: flex;
  text-align: center;
  justify-content: center; /* 가운데 정렬 */
  margin-top: 100px;
  font-size: 24px;
  color: #141F7B; 
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-top: 30vh; /* 화면 상단에서 20vh 떨어진 위치에 배치 */
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ activeIndex, itemCount }) =>
        `translateX(calc(50% - ${(activeIndex + 1) * 100}vw / ${itemCount}))`};
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
