import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Aireviewedimage from "./Aireviewedimage";

const Aireviewresult = ({ contractData }) => {
  const [content, setContent] = useState("");
  const [textContent, setTextContent] = useState("");
  const [highlightedTextContent, setHighlightedTextContent] = useState("");

  useEffect(() => {
    if (contractData && contractData.contract) {
      const { modifiedContent, plainText } = modifyHtml(contractData.contract);
      setContent(modifiedContent);



      setTextContent(plainText);

      const highlightedText = highlightPlainText(plainText, contractData.articles);
      setHighlightedTextContent(highlightedText);
    }
  }, [contractData]);

  const highlightText = (doc, sentence) => {
    const textNodes = [];
    const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.trim().length > 0) {
        textNodes.push(node);
      }
    }

    let fullText = textNodes.map(node => node.nodeValue).join('');
    const sanitizedFullText = fullText.replace(/\s+/g, '');
    const sanitizedSentence = sentence.replace(/\s+/g, '');

    let startIndex = sanitizedFullText.indexOf(sanitizedSentence);
    if (startIndex !== -1) {
      let endIndex = startIndex + sanitizedSentence.length;
      let currentCharIndex = 0;
      let highlightStarted = false;
      let highlightEnded = false;

      for (let node of textNodes) {
        if (!node.nodeValue) continue;
        let nodeText = node.nodeValue.replace(/\s+/g, '');
        let nodeEndIndex = currentCharIndex + nodeText.length;

        if (!highlightStarted && currentCharIndex <= startIndex && nodeEndIndex > startIndex) {
          let nodeStartIndex = startIndex - currentCharIndex;
          let before = node.nodeValue.slice(0, nodeStartIndex);
          let highlight = node.nodeValue.slice(nodeStartIndex);

          node.nodeValue = before;

          let span = document.createElement('span');
          span.className = 'highlight';
          span.innerHTML = highlight;
          node.parentNode.insertBefore(span, node.nextSibling);

          highlightStarted = true;
        } else if (highlightStarted && !highlightEnded) {
          if (nodeEndIndex >= endIndex) {
            let nodeHighlightEndIndex = endIndex - currentCharIndex;
            let highlight = node.nodeValue.slice(0, nodeHighlightEndIndex);
            let after = node.nodeValue.slice(nodeHighlightEndIndex);

            node.nodeValue = after;

            let span = document.createElement('span');
            span.className = 'highlight';
            span.innerHTML = highlight;
            node.parentNode.insertBefore(span, node);

            highlightEnded = true;
          } else {
            let highlight = node.nodeValue;
            node.nodeValue = '';

            let span = document.createElement('span');
            span.className = 'highlight';
            span.innerHTML = highlight;
            node.parentNode.insertBefore(span, node);
          }
        }

        currentCharIndex = nodeEndIndex;
        if (highlightEnded) break;
      }
    }
  };

  const modifyHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const articles = contractData.articles;

    articles.forEach(article => {
      highlightText(doc, article.sentence);
    });

    const highlightedElements = doc.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
      element.style.setProperty("background-color", "#FFD700", "important");
      element.style.setProperty("font-weight", "bold", "important");
    });

    const description = doc.createElement('div');
    description.innerHTML = "<strong>강조된 부분:</strong> 이 부분은 계약서의 중요 조항입니다.";
    description.style.marginTop = "10px";
    description.style.color = "#E7470A";
    doc.body.appendChild(description);

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

  return { modifiedContent: doc.body.innerHTML, plainText: paragraphs };
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


      const matches = sanitizedText.match(regex);
      if (matches && matches[0]) {
     
        console.log("Found matches:", matches[0]);
        shouldHighlight = true;

      }else {
        // 이전, 현재, 다음 <p> 태그의 텍스트를 결합하여 비교
        
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
        }
      }
    });

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
        <Content>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Content>
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
  background-color: #f9f9f9;
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
