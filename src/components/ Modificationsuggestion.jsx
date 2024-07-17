import React, { useState, useRef } from "react";
import styled from "styled-components";
import Orangebutton from "./Orangebutton";
import ModifiyviewSrc from "../images/Modifiyview.svg"; // 추가할 이미지 경로
const Modificationsuggestion = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentText, setCurrentText] = useState("text1"); // 현재 텍스트 파일 상태

  const contentRef = useRef(null);

  const text1Sections = [
    "Text1 Section 1",
    "Text1 Section 2",
    "Text1 Section 3",
  ];
  const text2Sections = [
    "Text2 Section 1",
    "Text2 Section 2",
    "Text2 Section 3",
  ];

  const sections = currentText === "text1" ? text1Sections : text2Sections;

  const handleScroll = () => {
    const scrollLeft = contentRef.current.scrollLeft;
    const maxScrollLeft =
      contentRef.current.scrollWidth - contentRef.current.clientWidth;
    const scrolled = (scrollLeft / maxScrollLeft) * 100;

    const sectionIndex = Math.round(
      scrollLeft / contentRef.current.clientWidth
    );
    setCurrentSection(sectionIndex);
  };

  const scrollToSection = (index) => {
    contentRef.current.scrollTo({
      left: contentRef.current.clientWidth * index,
      behavior: "smooth",
    });
  };

  const toggleText = (text) => {
    setCurrentText(text);
    setCurrentSection(0);
    if (contentRef.current) {
      contentRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Container>
        <ToggleContainer>
          <ToggleButton
            active={currentText === "text1"}
            onClick={() => toggleText("text1")}
          >
            주의 조항
          </ToggleButton>
          <ToggleButton
            active={currentText === "text2"}
            onClick={() => toggleText("text2")}
          >
            중요 조항
          </ToggleButton>
        </ToggleContainer>
        <ScrollButton
          onClick={() => scrollToSection(currentSection - 1)}
          disabled={currentSection === 0}
        >
          {"<"}
        </ScrollButton>
        <Content ref={contentRef} onScroll={handleScroll}>
          {sections.map((section, index) => (
            <Section key={index}>{section}</Section>
          ))}
        </Content>
        <ScrollButton
          onClick={() => scrollToSection(currentSection + 1)}
          disabled={currentSection === sections.length - 1}
        >
          {">"}
        </ScrollButton>
        <ProgressContainer>
          {sections.map((_, index) => (
            <ProgressDot
              key={index}
              active={index === currentSection}
              onClick={() => scrollToSection(index)}
            />
          ))}
        </ProgressContainer>
      </Container>

      <Orangebutton
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          position: "relative",
          left: "50%",

          transform: "translate(-50%, 30px)",
        }}
      >
        <img
          src={ModifiyviewSrc}
          alt="modifyview"
          style={{ width: "20px", height: "20px", marginRight: "10px" }}
        />
        수정안 보기
      </Orangebutton>
    </div>
  );
};

export default Modificationsuggestion;

const Container = styled.div`
  width: 45vw;
  height: 52vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow:;
  padding: 20px;
  margin-top: 30h;
  border-radius: 20px;

  background-color:;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow-x: hidden; /* 스크롤바 숨기기 */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  flex: 1;
  width: 45vw;
  height: 52vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow:;

  margin-top: 3vh;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  } /* 이미지와의 간격 조정 */
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
  box-sizing: content -box;
  padding: 20px;
  color: #000000;
`;

const ScrollButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  width: 10px; /* 너비를 설정 */
  height: px; /* 높이를 설정 */
  font-size: 20px;
  cursor: pointer;
  z-index: 1;
  border-radius: 50%; /* 원형으로 만들기 위해 50% 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 1px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ProgressDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#007bff" : "#ccc")};
  border-radius: 50%;
  cursor: pointer;
  justify-content: space-around;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  margin-top: -58vh;
  width: 94%;

  z-index: 1;
`;

const ToggleButton = styled.button`
  background-color: ${({ active }) => (active ? "#E7470A" : "#ccc")};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 12px;
  cursor: pointer;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
  &:hover {
    background-color: ${({ active }) => (active ? "#E7470A" : "#aaa")};
  }
  font-weight: 700;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
