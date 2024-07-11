import React, { useState, useRef } from "react";
import styled from "styled-components";

const Modificationsuggestion = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const contentRef = useRef(null);

  const sections = ["Section 1", "Section 2", "Section 3"];

  const handleScroll = () => {
    const scrollLeft = contentRef.current.scrollLeft;
    const maxScrollLeft =
      contentRef.current.scrollWidth - contentRef.current.clientWidth;
    const scrolled = (scrollLeft / maxScrollLeft) * 100;

    // 현재 섹션 업데이트
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

  return (
    <Container>
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
  );
};

export default Modificationsuggestion;

const Container = styled.div`
  width: 100%;
  height: 150%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow-x: hidden; /* 스크롤바 숨기기 */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  flex: 1;
`;

const Section = styled.div`
  scroll-snap-align: start;
  flex: none;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  box-sizing: border-box;
  padding: 20px;
`;

const ScrollButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
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
  bottom: 20px;
  width: 100%;
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
`;
