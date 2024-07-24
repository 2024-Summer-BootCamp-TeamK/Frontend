import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Aireviewedimage from "./Aireviewedimage";

const Aireviewresult = ({ contractDataMain, contractDataToxin }) => {
  const [highlightedTextContent, setHighlightedTextContent] = useState("");

  useEffect(() => {
    if (contractDataMain && contractDataMain.contract && contractDataToxin && contractDataToxin.contract) {
      const plainText = modifyHtml(contractDataMain.contract); // 두 데이터의 텍스트가 동일하다고 가정
      
      const highlightedTextMain = highlightPlainText(plainText, contractDataMain.articles, 'main');
      const highlightedTextToxin = highlightPlainText(highlightedTextMain, contractDataToxin.articles, 'toxin');
      
      setHighlightedTextContent(highlightedTextToxin);
    }
  }, [contractDataMain, contractDataToxin]);

  const modifyHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

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

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&는 일치한 전체 문자열을 의미
  };

  const createPartsArray = (text) => {
    const matches = text.split('');

    // 각 분리된 항목을 정규식 객체로 변환
    const parts = matches.map(match => new RegExp(escapeRegExp(match)));

    return parts;
  }

  const matchRatios = (sentence, combinedText ) => {
    const parts = createPartsArray(sentence);
    let matchCount = 0;
    parts.forEach(part => {
      if (combinedText.match(part)){
        matchCount++;
      }
    })

    const matchRatio = matchCount / parts.length;
    return matchRatio;
  }

  const highlightPlainText = (text, articles, type) => {
    // 각 p 태그로 나눈 후 개별적으로 처리
    const paragraphs = text.split('</p>').map(paragraph => paragraph + '</p>');

    let count = 0;
    const highlightedParagraphs = paragraphs.map((paragraph, index, array) => {

      if(index < array.length - 1 ){
        console.log(`인덱스 : ${index}`);
        console.log("❌날것 innerText : ", paragraph);
      
        let innerText = paragraph.replace(/<\/?p>/g, ''); // p 태그 제거
        if (innerText.includes('<span class="highlight">')) {
          innerText = innerText.replace(/<span class="highlight">|<\/span>/g, '');
        }

        let shouldHighlight = false;
        let combinedText="";
        let innerTextOnly = false;
        
        // 이전, 현재, 다음 <p> 태그의 텍스트를 결합하여 비교
        combinedText += innerText;
        if (index < array.length - 1) {
          combinedText += array[index + 1].replace(/<\/?p>/g, '');
        }
        console.log(`병합 후 combinedText: ${combinedText}`);

      
        articles.forEach(article => {
          // 공백 제거 및 특수 문자 이스케이프
          const sentence = escapeRegExp(article.sentence.replace(/\s+/g, ''));
          console.log(`공백제거 article: ${sentence}`);

          // 각 글자 사이에 \s* 추가
          const regexString = sentence.split('').join('\\s*');
          const regex = new RegExp(regexString, 'gi');

           // 결합된 텍스트에서 비교
          const sanitizedCombinedText = combinedText.replace(/\s+/g, '');
          console.log(`공백제거 text: ${sanitizedCombinedText}`);
          
          // 매치 
          const matches = sanitizedCombinedText.match(regex);
          if (matches) {
            console.log("Found matches:", matches[0]);
            shouldHighlight = true;
            console.log("found matches 후 count: ", count);
          }else {
            const partialMatchThreshold = 0.5; // 50% 이상 매칭되면 매칭된 것으로 간주
            const matchRatio = matchRatios(sentence, sanitizedCombinedText);
            console.log(`매칭된 비율: ${matchRatio}`);
            if( matchRatio >= partialMatchThreshold){
              shouldHighlight = true; 
            }
          }

          // 이번 문장 정확도 up!!
          const inner = innerText.replace(/\s+/g, '');
          const textMatches = inner.match(regex); 
      
          if (textMatches){
            console.log(`이번 innerText만 통과함>>>> ${array[index+1]}`);
            innerTextOnly = true;
          } else {
            const partialMatchThreshold = 0.6; 
            const matchRatio = matchRatios(sentence, inner);
            console.log(`[정확도] 매칭비율: ${matchRatio}`);
            if( matchRatio >= partialMatchThreshold){
              innerTextOnly = true;
            }
          }
        });

        // combined 정확도( 조금 낮게)
        if (shouldHighlight ) {
          count++;
          console.log(`innerText: ${innerText}`);
          console.log("현재 매치된 횟수 : ",count);

          if (count === 1){
            // 정확도 false
            if(!innerTextOnly){
              paragraph = `<p>${innerText}</p>`;
            }

            // 현재 문장의 정확도 (조금 높게))
            else {
              paragraph = `<p><span class="highlight ${type === 'main' ? 'highlight-main' : 'highlight-toxin'}">${innerText}</span></p>`;
            }
            count = 0;
          }
        }
      }
    return `${paragraph}`;
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
        <HighlightLegend>
          <LegendItem color="#FFDD61">주요조항</LegendItem>
          <LegendItem color="#FFAFA4">주의조항</LegendItem>
        </HighlightLegend>
    </>
  );
};

export default Aireviewresult;

const AireviewedIconWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Container = styled.div`
 width: 45vw;
  height: 70vh;
  color: #000;
  box-sizing: border-box;
  overflow: scroll;
  border: 1px solid #ccc;
  padding-top:10px ;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const TextContainer = styled.div`
  background-color: #fff;
  overflow:hidden;
  padding: 10px;
  box-sizing: border-box;
  color: #000000;
  font-size: 14px;
  margin-top: 10px;
  padding-left: 20px;
  white-space: pre-wrap;

  .p {
    margin-bottom:3px;
  }
  
  .highlight-main {
   background-color: #FFDD61;
   font-weight: bold;
  } 

  .highlight-toxin {
    background-color: #FFAFA4;
    font-weight: bold;
    padding-top:3px;
    padding-bottom:3px; 
  }
`;

const HighlightLegend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 13px;
  color: #000;
  font-weight:bold;
  
  &::before {
    color: #000;
    content: "";
    width: 14px;
    height: 14px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    margin-right: 5px;
  }
`;