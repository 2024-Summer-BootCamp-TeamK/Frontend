import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import suggestcontract from "../images/suggestcontract.svg";
import { modifiedContract } from "../services/getModifiedContract";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

const Aireviewresult = ({ contractId }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const pdfCanvasRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (contractId) {
          const blobUrl = await modifiedContract(contractId);
          setPdfUrl(blobUrl);
          renderPDF(blobUrl);
        } else {
          console.error("contractId is not provided.");
        }
      } catch (error) {
        alert('Error displaying PDF file');
      }
    };

    fetchContent();
  }, [contractId]);

  const renderPDF = async (url) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = pdfCanvasRef.current;
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    page.render(renderContext);
  };

  return (
    <Wrapper>
      <Container>
        <AireviewedIconWrapper>
          <AireviewedIcon data={suggestcontract} type="image/svg+xml" />
        </AireviewedIconWrapper>
        <Content>
          {pdfUrl ? (
            <canvas ref={pdfCanvasRef}></canvas>
          ) : (
            <p>PDF를 불러오는 중입니다...</p>
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
