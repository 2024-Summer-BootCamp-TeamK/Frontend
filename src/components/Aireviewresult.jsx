import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Aireviewedimage from "./Aireviewedimage";

const Aireviewresult = ({ contractData }) => {
  const [content, setContent] = useState("");
  const [textContent, setTextContent] = useState("");
  const [highlightedTextContent, setHighlightedTextContent] = useState("");

  useEffect(() => {
    if (contractData && contractData.contract) {
      const plainText  = modifyHtml(contractData.contract);
      setTextContent(plainText);

      const highlightedText = highlightPlainText(plainText, contractData.articles);
      setHighlightedTextContent(highlightedText);
    }
  }, [contractData]);

  const modifyHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const articles = contractData.articles;

    // Extract plain text content from the document, grouping by top position per page
    const pages = Array.from(doc.querySelectorAll(".page"));
    const pageTexts = pages.map(page => {
      const textNodes = Array.from(page.querySelectorAll(".text"));
      const groupedText = textNodes.reduce((acc, node) => {
        const top = node.style.top;
        if (!acc[top]) {
          acc[top] = [];
        }
        acc[top].push(node.textContent.trim());
        return acc;
      }, {});

      return Object.values(groupedText)
        .map(group => group.join(" "))
        .join("\n");
    });

    const plainText = pageTexts.join("\n\n");

    const paragraphs = plainText.split('\n').map(line => `<p>${line}</p>`).join('');

  return paragraphs;
};


const highlightPlainText = (text, articles) => {
  // 각 p 태그로 나눈 후 개별적으로 처리
  const paragraphs = text.split('</p>').map(paragraph => paragraph + '</p>');

  const highlightedParagraphs = paragraphs.map((paragraph, index, array) => {
    let innerText = paragraph.replace(/<\/?p>/g, ''); // p 태그 제거
    let shouldHighlight = false;
    let combinedText="";

    articles.forEach(article => {
      // 공백 제거 및 특수 문자 이스케이프
      const sentence = article.sentence.replace(/\s+/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // 각 글자 사이에 \s* 추가
      const regexString = sentence.split('').join('\s*');
      const regex = new RegExp(regexString, 'gi');


      const sanitizedText = innerText.replace(/\s+/g, '');
      console.log("공백 제거 텍스트 : ", sanitizedText);


      // 이전, 현재, 다음 <p> 태그의 텍스트를 결합하여 비교
      if (index > 0) {
        combinedText += array[index - 1].replace(/<\/?p>/g, '');
      }
      combinedText += innerText;
      console.log(`combinedText: ${combinedText}`);
      if (index < array.length - 1) {
        combinedText += array[index + 1].replace(/<\/?p>/g, '');
      }

        // 결합된 텍스트에서 비교
      const sanitizedCombinedText = combinedText.replace(/\s+/g, '');
      const matches = sanitizedCombinedText.match(regex);
      if (matches && matches[0]) {
        console.log("Found matches:", matches[0]);
        shouldHighlight = true;

        // 매칭된 부분의 원래 텍스트에서의 시작과 끝 인덱스를 찾기
        let startIndex = 0;
        let endIndex = innerText.length;
        if (index > 0) {
          const prevText = array[index - 1].replace(/<\/?p>/g, '');
          startIndex += prevText.length;
          endIndex += prevText.length;
        }

      }

      }
    )

    if (shouldHighlight) {
      innerText = `<span class="highlight">${innerText}</span>`;
    }

    return `<p>${innerText}</p>`;
  });

  return highlightedParagraphs.join('');
};



return (
    <>
      <AireviewedIconWrapper>
        <Aireviewedimage />
      </AireviewedIconWrapper>
      <Container>
        <TextContainer>
          <div dangerouslySetInnerHTML={{ __html: highlightedTextContent }} />
        </TextContainer>
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
  overflow-y: auto;
  padding: 0px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  padding: 0px;
  box-sizing: border-box;
  color: #000000;
  letter-spacing: -0.5px;
  font-size: 14px;
`;

const TextContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  color: #000000;
  font-size: 14px;
  margin-top: 10px;
  border: 1px solid #ddd;
  white-space: pre-wrap;

  .p {
    margin-bottom:5px;
  }
  .highlight {
    background-color: #FFD700;
    font-weight: bold;
  }
`;
