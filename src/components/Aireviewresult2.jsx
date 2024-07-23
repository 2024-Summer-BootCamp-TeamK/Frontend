import React, { useState, useEffect } from "react";
import styled from "styled-components";
import suggestcontract from "../images/suggestcontract.svg";
import { modifiedContract } from "../services/getModifiedContract";
import PDFViewer from "./PDFViewer"; // PDFViewer 컴포넌트 임포트

const Aireviewresult = ({ contractId }) => {
  const [content, setContent] = useState("");
  console.log(contractId);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (contractId) {
          const pdfUrl = await modifiedContract(contractId);
          setContent(pdfUrl);
        } else {
          console.error("contractId is not provided.");
        }
      } catch (error) {
        alert('Error displaying PDF file');
      }
    };

    fetchContent();
  }, [contractId]);

  return (
    <Wrapper>
      <Container>
        <AireviewedIconWrapper>
          <AireviewedIcon data={suggestcontract} type="image/svg+xml" />
        </AireviewedIconWrapper>
        <Content>
          {content ? (
            <PDFViewer pdfUrl={content} /> // PDFViewer 컴포넌트를 사용하여 PDF 렌더링
          ) : (
            <p>Loading PDF...</p>
          )}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Aireviewresult;

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 9vh;
`;

const AireviewedIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px;
  margin-bottom: -40px;
`;

const AireviewedIcon = styled.object`
  width: 150px;
  height: 10vh;
  border-radius: 20px;
`;

const Container = styled.div`
  width: 45vw;
  height: 75vh;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000000;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  font-size: 12px;
`;
const Content = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px;
  width: 80%; /* 부모 요소의 80% 너비를 설정합니다 */
  max-width: 1200px; /* 최대 너비를 설정하여 너무 넓어지는 것을 방지합니다 */
`;

