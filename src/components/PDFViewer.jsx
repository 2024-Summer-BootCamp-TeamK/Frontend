import React, { useRef, useEffect } from 'react';
import { pdfjs } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css'; // PDF.js 뷰어의 기본 CSS 임포트

// PDF.js 워커 파일 로드
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1); // 첫 페이지 로드

        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
      } catch (error) {
        console.error("PDF 로드 에러: ", error);
      }
    };

    if (pdfUrl) {
      loadPDF();
    }
  }, [pdfUrl]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />;
};

export default PDFViewer;
