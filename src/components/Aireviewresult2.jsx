import React, { useRef ,useState, useEffect } from "react";
import styled from "styled-components";
import suggestcontract from "../images/suggestcontract.svg";
import { modifiedContract } from "../services/getModifiedContract";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const Aireviewresult = ({contractId}) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const canvasRef = useRef(null);
  console.log(contractId)
  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (contractId) {
          const url = await modifiedContract(contractId); // pdf 파일 경로
          setPdfUrl(url);
        } else {
          console.error("contractId is not provided.");
        }
      } catch (error) {
        alert('Error displaying PDF file');
      }
    };
    fetchContent();
  }, [contractId]); // contractId 의존성 추가
  useEffect(() => {
    const renderPDF = async (url) => {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    };
    if (pdfUrl) {
      renderPDF(pdfUrl);
    }
  }, [pdfUrl]);
  return (
    <Wrapper>
      <Container>
        <AireviewedIconWrapper>
          <AireviewedIcon data={suggestcontract} type="image/svg+xml" />
        </AireviewedIconWrapper>
        <Content>
          {pdfUrl ? (
            <canvas ref={canvasRef}></canvas>
          ) : (
            <p>로딩 중...</p>
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
`;
