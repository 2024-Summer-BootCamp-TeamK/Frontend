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
  background-color: #f5f5f5; /* 배경색 */
`;

const PdfWrapper = styled.div`
  width: 80%;
  height: 90vh; /* 뷰어의 높이 설정 */
  border: 1px solid #ccc; /* 테두리 설정 */
  border-radius: 8px; /* 모서리 둥글게 */
  overflow: auto; /* 오버플로우 처리 */
  background-color: #ffffff; /* 배경색 */
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
