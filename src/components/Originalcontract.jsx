import React, { useState, useEffect } from "react";
import styled from "styled-components";
import originalcontractsvg from "../images/originalcontract.svg";

const Originalcontract = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // 텍스트 파일을 불러오는 함수
    const fetchContent = async () => {
      try {
        const response = await fetch("/path/to/textfile.txt"); // 텍스트 파일 경로
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <Wrapper>
      <ButtonWrapper>
        <OriginalContractButton>기존 계약서</OriginalContractButton>
      </ButtonWrapper>
      <Container>
        <Content>
          <p>{content}</p>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Originalcontract;

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 13vh;
  padding-left: 2vw;
`;

const ButtonWrapper = styled.div`
  position: absolute;

`;

const OriginalContractButton = styled.div`
  background-color: #141F7B;
  color: white;
  border: none;
  border-radius: 10px 10px 0px 0px;
  padding: 13px 20px;
  font-size: 20px;
  margin-bottom:10px;
  font-weight: 700;
  cursor: pointer;
`;

const Container = styled.div`
  width: 45vw;
  height: 68vh; 
  overflow-y: scroll;
  box-sizing: border-box;
  margin-top: 5vh;
  position: relative; 
  background-color: #ffffff;
  border-radius: 0px 10px 10px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000000;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  } /* 이미지와의 간격 조정 */
  font-size: 12px;
`;

const Content = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  
`;
