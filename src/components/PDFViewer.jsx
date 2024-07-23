import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 배경색 제거 */
  background-color: transparent; /* 투명 배경색 */
`;

const PdfWrapper = styled.div`
  width: 100%;  /* PDF 뷰어의 너비를 100%로 설정 */
  height: 100vh; /* PDF 뷰어의 높이를 전체 화면 높이로 설정 */
  /* 스크롤 제거 */
  overflow: hidden; /* 오버플로우 숨기기 */
  /* 배경색 제거 */
  background-color: transparent; /* 투명 배경색 */
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #555;
`;
const PDFViewer = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        setPdf(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [pdfUrl]);

  return (
    <Container>
      {pdf ? (
        <PdfWrapper>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdf} />
          </Worker>
        </PdfWrapper>
      ) : (
        <LoadingText>Loading PDF...</LoadingText>
      )}
    </Container>
  );
};

export default PDFViewer;
