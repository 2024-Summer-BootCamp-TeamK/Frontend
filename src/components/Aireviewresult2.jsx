import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import suggestcontract from "../images/suggestcontract.svg";
import { modifiedContract } from "../services/getModifiedContract";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const Aireviewresult = ({ contractId }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchAndRenderPdf = async () => {
      try {
        if (contractId) {
          const blobUrl = await modifiedContract(contractId);
          const pdf = await pdfjsLib.getDocument(blobUrl).promise;

          const page = await pdf.getPage(1); // 첫 페이지 가져오기
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          page.render(renderContext);
        } else {
          console.error("contractId is not provided.");
        }
      } catch (error) {
        alert("Error displaying PDF file");
      }
    };

    fetchAndRenderPdf();
  }, [contractId]);

  return (
    <Wrapper>
      <Container>
        <AireviewedIconWrapper>
          <AireviewedIcon data={suggestcontract} type="image/svg+xml" />
        </AireviewedIconWrapper>
        <Content>
          <canvas ref={canvasRef}></canvas>
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

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  } /* 이미지와의 간격 조정 */
  font-size: 12px;
`;

const Content = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px; /* 아이콘과 내용 사이에 여백 추가 */
`;
