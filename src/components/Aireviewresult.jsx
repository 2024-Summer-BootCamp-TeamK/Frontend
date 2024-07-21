import React, { useState, useEffect } from "react";
import styled from "styled-components";
import aireviewedSrc from "../images/aireviewed.svg"; // aireviewed.svg 파일 경로
import Aireviewedimage from "./Aireviewedimage";

const Aireviewresult = ({ contractData }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (contractData && contractData.contract) {
      const modifiedContent = modifyHtml(contractData.contract);
      setContent(modifiedContent);
    }
  }, [contractData]);

  const modifyHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = doc.querySelectorAll("*");
    
    elements.forEach((element) => {
      element.style.setProperty("font-size", "2px", "important");
      element.style.setProperty("line-height", "0.0", "important");
      element.style.setProperty("letter-spacing", "-1px", "important");
      element.style.setProperty("word-spacing", "1px", "important");
    });

    // 강조할 내용에 대한 스타일 추가
    const highlightedElements = doc.querySelectorAll('.highlight');
    highlightedElements.forEach((element) => {
      element.style.setProperty("background-color", "#FFD700", "important"); // 강조 색상
      element.style.setProperty("font-weight", "bold", "important"); // 강조된 글씨 굵게
    });

    // 강조된 부분 설명 추가
    const description = doc.createElement('div');
    description.innerHTML = "<strong>강조된 부분:</strong> 이 부분은 계약서의 중요 조항입니다.";
    description.style.marginTop = "10px";
    description.style.color = "#E7470A"; // 강조 색상
    doc.body.appendChild(description);

    // 부모 요소의 font-size를 14px로 설정
    doc.body.style.setProperty("font-size", "3px", "important");
    return doc.body.innerHTML;
  };

  return (
    <>
      <AireviewedIconWrapper>
        <Aireviewedimage />
      </AireviewedIconWrapper>
      <Container>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Content>
      </Container>
    </>
  );
};

export default Aireviewresult;

const AireviewedIconWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0px;
`;

const Container = styled.div`
  width: 45vw;
  height: 70vh;
  overflow-y: scroll;
  padding: 0px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  padding: 0px;
  box-sizing: border-box;
  margin-top: 0px;
  color: #000000;
  letter-spacing: -0.5px;
  font-size: 14px;
`;
