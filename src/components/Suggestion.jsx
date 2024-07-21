import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Orangebutton from "./Orangebutton";
import Toggleswitch from "./Toggleswitch";
import ModifiyviewSrc from "../images/Modifiyview.svg"; // 이미지 경로 확인
import LabelImage from "../images/label.svg"; // label.svg 이미지 경로 추가

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

const Suggestion = ({ contractMain, contractToxin }) => {
  const [currentSection, setCurrentSection] = useState(0); // 현재 섹션 상태
  const [currentText, setCurrentText] = useState("main"); // 현재 텍스트 파일 상태

  const mainSections = contractMain.articles.map(
    (article, index) => `주요조항 ${index + 1}`
  );
  const toxinSections = contractToxin.articles.map(
    (article, index) => `주의조항 ${index + 1}`
  );
  const sections = currentText === "main" ? mainSections : toxinSections;

  const handlePrevClick = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const toggleText = () => {
    setCurrentText((prevText) => {
      const newText = prevText === "main" ? "toxin" : "main";
      setCurrentSection(0); // 텍스트 파일 변경 시 섹션을 첫 번째 섹션으로 이동
      return newText;
    });
  };

  useEffect(() => {
    console.log(
      `현재 인덱스: ${currentSection}, 텍스트: ${sections[currentSection]}`
    );
  }, [currentSection, sections]);

  const currentArticle =
    currentText === "main"
      ? contractMain.articles[currentSection]
      : contractToxin.articles[currentSection];

  return (
    <Container>
      <GlobalStyle />
      <ToggleswitchContainer>
        <Toggleswitch onChange={toggleText} />{" "}
        {/* 텍스트 파일을 토글하는 스위치 */}
      </ToggleswitchContainer>
      <ContentWrapper>
        <NavButton onClick={handlePrevClick} disabled={currentSection === 0}>
          이전
        </NavButton>
        <Content>
          <Section className="active">
            <SectionContent className="slider__content">
              <SectionTitle>
                {sections[currentSection]}
              </SectionTitle>
              <SectionText className="slider__text">
                {currentArticle ? (
                  <>
                    <p style={{ textAlign: "left" }}>
                      <img
                        src={LabelImage}
                        alt="label 이미지"
                        style={{ marginRight: "5px", verticalAlign: "middle" }}
                      />
                      <span style={{ fontWeight: "bold" }}>
                        계약서 내부 조항:
                      </span><br /> {/* 줄 바꿈 추가 */}
                      {currentArticle.sentence}
                    </p>  

                    <p style={{ textAlign: "left" }}>
                      <img
                        src={LabelImage}
                        alt="label 이미지"
                        style={{ marginRight: "5px", verticalAlign: "middle" }}
                      />
                      <span style={{ fontWeight: "bold" }}>법:</span><br /> {/* 줄 바꿈 추가 */}
                      {currentArticle.law}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      <img
                        src={LabelImage}
                        alt="label 이미지"
                        style={{ marginRight: "5px", verticalAlign: "middle" }}
                      />
                      <span style={{ fontWeight: "bold" }}>설명:</span><br /> {/* 줄 바꿈 추가 */}
                      {currentArticle.description}
                    </p>
                    {currentArticle.recommend && (
                      <p style={{ textAlign: "left" }}>
                        <img
                          src={LabelImage}
                          alt="label 이미지"
                          style={{
                            marginRight: "5px",
                            verticalAlign: "middle",
                          }}
                        />
                        <span style={{ fontWeight: "bold" }}>추천:</span><br /> {/* 줄 바꿈 추가 */}
                        {currentArticle.recommend}
                      </p>
                    )}
                  </>
                ) : (
                  <p>데이터를 불러오는 중입니다...</p>
                )}
              </SectionText>
              {currentText === "toxin" && ( // 각 세션에 버튼 표시
                <StyledOrangebutton>
                  추천안으로 수정하기
                </StyledOrangebutton>
              )}
            </SectionContent>
          </Section>
        </Content>
        <NavButton
          onClick={handleNextClick}
          disabled={currentSection === sections.length - 1}
        >
          다음
        </NavButton>
      </ContentWrapper>
      <ProgressContainer>
        {sections.map((_, index) => (
          <ProgressDot
            key={index}
            active={index === currentSection}
            onClick={() => setCurrentSection(index)}
          />
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
  height: 85vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
  margin-top: 0px;
  border-radius: 20px;
  background-color: #fefdf6;
  flex-direction: column;
  gap: 0px;
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
  overflow-y: auto; /* 세로 스크롤 추가 */
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
  font-size: 18px;
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
  display: flex;
  align-items: center; /* 수직 정렬 추가 */
`;

const SectionText = styled.div`
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
  height: 300px; /* 고정된 높이 설정 */
  overflow-y: auto; /* 내부 스크롤 활성화 */
  
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
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  padding: 10px 20px; /* 버튼 패딩 추가 */
  background-color: #e7470a; /* 버튼 배경색 추가 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
