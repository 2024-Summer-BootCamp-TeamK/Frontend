import React, { useState, useEffect } from "react";
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

  const text1Sections = ["주요조항 1", "주요조항 2", "주요조항 3"];
  const text2Sections = ["주의조항 1", "주의조항 2", "주의조항 3", "주의조항 4"];
  const sections = currentText === "text1" ? text1Sections : text2Sections;

  const handlePrevClick = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => {
        console.log(`현재 인덱스: ${prev - 1}, 텍스트: ${sections[prev - 1]}`);
        return prev - 1;
      });
    }
  };

  const handleNextClick = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => {
        console.log(`현재 인덱스: ${prev + 1}, 텍스트: ${sections[prev + 1]}`);
        return prev + 1;
      });
    }
  };

  const toggleText = () => {
    setCurrentText((prevText) => {
      const newText = prevText === "text1" ? "text2" : "text1";
      console.log(`currentText가 ${prevText}에서 ${newText}로 변경되었습니다.`);
      setCurrentSection(0); // 텍스트 파일 변경 시 섹션을 첫 번째 섹션으로 이동
      return newText;
    });
  };

  useEffect(() => {
    console.log(`현재 인덱스: ${currentSection}, 텍스트: ${sections[currentSection]}`);
  }, [currentSection, sections]);

  return (
    <Container>
      <GlobalStyle />
      <ToggleswitchContainer>
        <Toggleswitch onChange={toggleText} /> {/* 텍스트 파일을 토글하는 스위치 */}
      </ToggleswitchContainer>
      <ContentWrapper>
        <NavButton onClick={handlePrevClick} disabled={currentSection === 0}>
          이전
        </NavButton>
        <Content>
          <Section className="active">
            <SectionContent className="slider__content">
              <SectionTitle className="slider__title">{sections[currentSection]}</SectionTitle>
              <SectionText className="slider__text">내용을 여기에 추가하십시오...</SectionText>
            </SectionContent>
          </Section>
        </Content>
        <NavButton onClick={handleNextClick} disabled={currentSection === sections.length - 1}>
          다음
        </NavButton>
      </ContentWrapper>
      <ProgressContainer>
        {sections.map((_, index) => (
          <ProgressDot key={index} active={index === currentSection} onClick={() => setCurrentSection(index)} />
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

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NavButton = styled.button`
  background-color: #e7470a;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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
  height: 100%;
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
  bottom: 20px;
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
