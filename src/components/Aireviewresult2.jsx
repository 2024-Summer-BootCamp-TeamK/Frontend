import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { modifiedContract } from "../services/getModifiedContract";
import * as pdfjsLib from "pdfjs-dist";
// import jsPDF from "jspdf"; // jspdf 임포트

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const Aireviewresult2 = forwardRef(({ contractId }, ref) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfDoc, setPdfDoc] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (contractId) {
          const type = "result";
          const url = await modifiedContract(contractId, type);
          setPdfUrl(url);
        } else {
          console.error("contractId is not provided.");
        }
      } catch (error) {
        alert('Error displaying PDF file');
      }
    };
    fetchContent();
  }, [contractId]);

  useEffect(() => {
    const renderPDF = async () => {
      if (!pdfUrl) return;

      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);

      if (containerRef.current) {
        containerRef.current.innerHTML = ''; // Clear previous content
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.3 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;

          containerRef.current.appendChild(canvas);
        }
      }
    };

    renderPDF();
  }, [pdfUrl]);

  useImperativeHandle(ref, () => ({
    getPdfUrl: () => pdfUrl
  }));

  return (
    <Wrapper>
      <ButtonWrapper>
        <OriginalContractButton>수정된 계약서</OriginalContractButton>
      </ButtonWrapper>
      <Container ref={containerRef}>
        <Content>
          {!pdfDoc ? (
            <p>로딩 중...</p>
          ) : (
            <p>PDF가 로딩되었습니다.</p>
          )}
        </Content>
      </Container>
    </Wrapper>
  );
});

export default Aireviewresult2;

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 13vh;
  padding-right: 2vw;
`;

const ButtonWrapper = styled.div`
  position: absolute;
`;

const OriginalContractButton = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 9vw;
  background-color: #141F7B;
  color: white;
  border: none;
  border-radius: 10px 10px 0px 0px;
  padding: 13px 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const Container = styled.div`
  width: 40vw;
  height: 68vh; 
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  margin-top:5vh;
  position: relative; 
  background-color: #ffffff;
  border-radius: 0px 10px 10px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center; /* 페이지가 중앙 정렬되도록 설정 */

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  font-size: 12px;
`;

const Content = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px; /* 아이콘과 내용 사이에 여백 추가 */
`;
