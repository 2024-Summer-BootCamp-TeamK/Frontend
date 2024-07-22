import React, { useState, useEffect } from "react";
import styled from "styled-components";
import aireviewedSrc from "../images/aireviewed.svg";
import Aireviewedimage from "./Aireviewedimage";

const Aireviewresult = ({ contractData }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (contractData && contractData.contract) {
      const modifiedContent = modifyHtml(contractData.contract);
      setContent(modifiedContent);
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
