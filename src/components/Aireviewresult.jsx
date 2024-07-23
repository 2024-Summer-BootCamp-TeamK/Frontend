import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Aireviewedimage from "./Aireviewedimage";

const Aireviewresult = ({ contractData }) => {
  const [highlightedTextContent, setHighlightedTextContent] = useState("");

  useEffect(() => {
    if (contractData && contractData.contract) {
      const plainText  = modifyHtml(contractData.contract);
      const highlightedText = highlightPlainText(plainText, contractData.articles);
      setHighlightedTextContent(highlightedText);
    }
  }, [contractData]);

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

const highlightPlainText = (text, articles) => {
  // 각 p 태그로 나눈 후 개별적으로 처리
  const paragraphs = text.split('</p>').map(paragraph => paragraph + '</p>');

  let count = 0;
  const highlightedParagraphs = paragraphs.map((paragraph, index, array) => {

    if(index < array.length - 1 ){
      console.log(`인덱스 : ${index}`);
      console.log("❌날것 innerText : ", paragraph);
      const nextValue =  array[index + 1].replace(/<\/?p>/g, ''); 
     
      let innerText = paragraph.replace(/<\/?p>/g, ''); // p 태그 제거
      if (innerText.includes('<span class="highlight">')) {
        innerText = innerText.replace(/<span class="highlight">|<\/span>/g, '');
      }

      let shouldHighlight = false;
      let combinedText="";
      let innerTextOnly = false;

      console.log(`병합 전 combinedText: ${combinedText} innerText : ${innerText}`);
      
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
        const regexString = sentence.split('').join('\s*');
        const regex = new RegExp(regexString, 'gi');

         // 결합된 텍스트에서 비교
        const sanitizedCombinedText = combinedText.replace(/\s+/g, '');
        console.log(`공백제거 text: ${sanitizedCombinedText}`);
        
        // 매치 
        const matches = sanitizedCombinedText.match(regex);
        if (matches) {
          console.log("Found matches:", matches[0]);
          shouldHighlight = true;
        //  count++;
          console.log("found matches 후 count: ", count);
        }else {
          const partialMatchThreshold = 0.88; // 80% 이상 매칭되면 매칭된 것으로 간주
          const parts = createPartsArray(sentence);
          let matchCount = 0;
          console.log(parts);
          parts.forEach(part => {
            if(sanitizedCombinedText.match(part)){
              matchCount++;
            }
          })
       
          const matchRatio = matchCount / parts.length;
          console.log(`매칭된 비율: ${matchRatio}`);
          if( matchRatio >= partialMatchThreshold){
            shouldHighlight = true; 
          }
        }
        
        //count=1에서-> next 태그가 매치가 되면 true
        const nextText = nextValue.replace(/\s+/g, '');
        const textMatches =nextText.match(regex); // 다음게 매치가 됨 
        console.log(`다음거 문장 >> ${nextText}`);
        if (textMatches){
          console.log(`다음 innerText만 통과함>>>> ${array[index+1]}`);
          innerTextOnly = true;
        } else {
          const partialMatchThreshold = 0.95; 
          const parts = createPartsArray(sentence);
          let matchCount = 0;
          console.log(parts);
          parts.forEach(part => {
            if(sanitizedCombinedText.match(part)){
              matchCount++;
            }
          })
       
          const matchRatio = matchCount / parts.length;
          console.log(`매칭된 비율: ${matchRatio}`);
          if( matchRatio >= partialMatchThreshold){
            innerTextOnly = true;
          }
        }
      });

      if (shouldHighlight ) {
        count++;
        console.log(`innerText: ${innerText}`);
        console.log("현재 매치된 횟수 : ",count);
      //  console.log(`Matched innerText: ${innerText}`);
      if (count === 1) {
        // 다음거 매치 false
        if (!innerTextOnly) {  // count= 1 이나, 현재 문장은 매치 x 
          console.log(`카운트 : ${count}, array: ${array[index + 1]}`);
          let nextText = array[index + 1].replace(/<\/?p>/g, '').replace(/<span class="highlight">|<\/span>/g, '');
          array[index + 1] = `<p><span class="highlight">${nextText}</span></p>`;
          console.log(`array[index+1]: ${array[index+1]}`);
          paragraph = `<p><span class="highlight">${innerText}</span></p>`;
          count = 0;
        // 다음거 매치 true
        }else {
          let nextText = array[index + 1].replace(/<\/?p>/g, '').replace(/<span class="highlight">|<\/span>/g, '');
          array[index + 1] = `<p><span class="highlight">${nextText}</span></p>`;
          console.log(`array[index+1]: ${array[index+1]}`);
        }
      } else if (count === 2) {
        console.log(`카운트 ${count}: inner 바껴야함.`);
        if (index > 0) {
          let prevText = array[index - 1].replace(/<\/?p>/g, '').replace(/<span class="highlight">|<\/span>/g, '');
          array[index - 1] = `<p>${prevText}</p>`;
        }
        console.log(`array[index-1]: ${array[index-1]}`);
        innerText = `<span class="highlight">${innerText}</span>`;
        count = 0;
        console.log(`innerText: ${innerText}, count: ${count}`);
      }
      else if (count >= 3){
        count = 0;
      }

    }

  
    }
  return `${paragraph}`;
  });
  console.log(highlightedParagraphs.join(''));
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
