import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Orangebutton from "./Orangebutton";
import Toggleswitch from "./Toggleswitch";
import ModifiyviewSrc from "../images/Modifiyview.svg"; // 추가할 이미지 경로

const GlobalStyle = createGlobalStyle`
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    color-scheme: dark;
  }
  body {
    min-height: 100vh;
    padding: 2rem;
    color: white;
    font-family: system-ui;
    display: grid;
    place-content: center;
    background-color: #2c2c2c; /* 배경색 추가 */
  }
`;

export const Suggestion = () => {
    const [currentSection, setCurrentSection] = useState(0); // 현재 섹션 상태
    const [currentText, setCurrentText] = useState("text1"); // 현재 텍스트 파일 상태

    const contentRef = useRef(null);

    // 각 텍스트 파일의 섹션들
    const text1Sections = ["주요조항 1", "주요조항 2", "주요조항 3"];
    const text2Sections = ["주의조항 1", "주의조항 2", "주의조항 3"];

    // 현재 선택된 텍스트 파일의 섹션들
    const sections = currentText === "text1" ? text1Sections : text2Sections;

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const scrollLeft = contentRef.current.scrollLeft;
        const sectionIndex = Math.round(scrollLeft / contentRef.current.clientWidth);
        setCurrentSection(sectionIndex);
    };

    // 특정 섹션으로 스크롤하는 함수
    const scrollToSection = (index) => {
        contentRef.current.scrollTo({
            left: contentRef.current.clientWidth * index,
            behavior: "smooth",
        });
    };

    // 텍스트 파일을 토글하는 함수
    const toggleText = () => {
        const newText = currentText === "text1" ? "text2" : "text1";
        setCurrentText(newText);
        setCurrentSection(0);
        if (contentRef.current) {
            contentRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, [sections]);

    return (
        <Container>
            <GlobalStyle />
            <ToggleswitchContainer>
                <Toggleswitch onChange={toggleText} />
            </ToggleswitchContainer>
            <Content ref={contentRef} onScroll={handleScroll}>
                {sections.map((section, index) => (
                    <Section key={index}>{section}</Section>
                ))}
            </Content>
            <ProgressContainer>
                {sections.map((_, index) => (
                    <ProgressDot key={index} active={index === currentSection} onClick={() => scrollToSection(index)} />
                ))}
            </ProgressContainer>
            <StyledOrangebutton>
                <img src={ModifiyviewSrc} alt="modifyview" />
                수정안 보기
            </StyledOrangebutton>
        </Container>
    );
};

export default Suggestion;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden; /* 오버플로우 숨기기 */
  padding: 20px;
  margin-top: 30px; /* 수정 */
  border-radius: 20px;
  background-color: #FEFDF6;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow-x: hidden; /* 스크롤바 숨기기 */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  flex: 1;
  width: 100%;
  align-items: center;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Section = styled.div`
  scroll-snap-align: start;
  flex: none;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  box-sizing: border-box; /* 수정 */
  padding: 20px;
  color: #000000;
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 150px; /* 수정 */
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ProgressDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#E7470A" : "#ccc")};
  border-radius: 50%;
  cursor: pointer;
`;

const ToggleswitchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px; /* 수정 */
  z-index: 1;
`;

const StyledOrangebutton = styled(Orangebutton)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
