import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Orangebutton from "./Orangebutton";
import Toggleswitch from "./Toggleswitch";
import ModifiyviewSrc from "../images/Modifiyview.svg"; // 이미지 경로 확인

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
    font-family: semi-bold;
    display: grid;
    place-content: center;
    background-color: #2c2c2c; /* 배경색 추가 */
  }
`;

const Suggestion = () => {
  const [currentSection, setCurrentSection] = useState(0); // 현재 섹션 상태
  const [currentText, setCurrentText] = useState("text1"); // 현재 텍스트 파일 상태
  const isScrolling = useRef(false); // 스크롤 중인지 여부를 확인하는 플래그
  const contentRef = useRef(null);

  const text1Sections = ["주요조항 1", "주요조항 2", "주요조항 3"];
  const text2Sections = ["주의조항 1", "주의조항 2", "주의조항 3"];
  const sections = currentText === "text1" ? text1Sections : text2Sections;

  const handleScroll = (event) => {
    if (isScrolling.current) return;

    if (event.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else if (event.deltaY < 0) {
      scrollToSection(currentSection - 1);
    }
  };

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;

    if (contentRef.current) {
      isScrolling.current = true;
      contentRef.current.scrollTo({
        top: contentRef.current.clientHeight * index,
        behavior: "smooth",
      });
      setTimeout(() => {
        isScrolling.current = false;
        setCurrentSection(index);
      }, 500);
    }
  };

  const toggleText = () => {
    setCurrentText((prevText) => {
      const newText = prevText === "text1" ? "text2" : "text1";
      console.log(`currentText가 ${prevText}에서 ${newText}로 변경되었습니다.`);
      return newText;
    });
    setCurrentSection(0);
    if (contentRef.current) {
      isScrolling.current = true;
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      isScrolling.current = true;
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  }, [sections]);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      contentEl.addEventListener("wheel", handleScroll);
    }
    return () => {
      if (contentEl) {
        contentEl.removeEventListener("wheel", handleScroll);
      }
    };
  }, [currentSection]);

  return (
    <Container>
      <GlobalStyle />
      <ToggleswitchContainer>
        <Toggleswitch onChange={toggleText} /> {/* 텍스트 파일을 토글하는 스위치 */}
      </ToggleswitchContainer>
      <Content ref={contentRef}>
        {sections.map((section, index) => (
          <Section key={index} className={index === currentSection ? "active" : ""}>
            <SectionContent className="slider__content">
              <SectionTitle className="slider__title">{section}</SectionTitle>
              <SectionText className="slider__text">내용을 여기에 추가하십시오...</SectionText>
            </SectionContent>
          </Section>
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
  overflow: hidden;
  padding: 20px;
  margin-top: 30px;
  border-radius: 20px;
  background-color: #fefdf6;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  scroll-snap-type: y mandatory;
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
  height: 100%; /* 각 섹션의 높이를 부모 컨테이너 높이로 설정 */
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  box-sizing: border-box;
  padding: 20px;
  color: #000000;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.4s;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionContent = styled.div`
  text-align: center;
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0d0925;
  margin-bottom: 20px;
`;

const SectionText = styled.div`
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 20px; /* 수정: 위치 변경 */
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
  margin-bottom: 10px;
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
