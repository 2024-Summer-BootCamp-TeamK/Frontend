import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import suggestcontract from "../images/suggestcontract.svg";
import { modifiedContract } from "../services/getModifiedContract";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const Aireviewresult = ({ contractId }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfDoc, setPdfDoc] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (contractId) {
          const url = await modifiedContract(contractId);
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
        const pages = []; // Store pages to append in order

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;

          pages.push(canvas); // Add canvas to pages array
        }

        // Append pages in the correct order
        pages.forEach(page => {
          containerRef.current.appendChild(page);
        });
      }
    };

    renderPDF();
  }, [pdfUrl]);

  return (
    <Wrapper>
      <Container ref={containerRef}>
        <AireviewedIconWrapper>
          <AireviewedIcon data={suggestcontract} type="image/svg+xml" />
        </AireviewedIconWrapper>
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
};

export default Aireviewresult;

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  margin-top: 9vh; /* 헤더와의 간격 조정 */
`;

const AireviewedIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px; /* 아이콘과 컨테이너 사이의 간격 조정 */
  margin-bottom: -40px;
`;

const AireviewedIcon = styled.object`
  width: 150px;
  height: 10vh;
  border-radius: 20px;
`;

const Container = styled.div`
  width: 45vw;
  height: 75vh; /* 뷰포트 높이를 가득 채움 */
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  position: relative; /* 아이콘 배치를 위해 relative 설정 */
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000000;
  display: flex;
  flex-direction: column; /* 페이지를 세로 방향으로 정렬 */
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
