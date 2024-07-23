import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import suggestcontract from "../images/suggestcontract.svg";
import { modifiedContract } from "../services/getModifiedContract";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry"; // Ensure this line is used to properly include the worker script

const Aireviewresult = ({ contractId }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pdfCanvasRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (contractId) {
          const blobUrl = await modifiedContract(contractId);
          setPdfUrl(blobUrl);
          setLoading(true); // Set loading to true when starting to fetch
          await renderPDF(blobUrl);
        } else {
          console.error("contractId is not provided.");
          setError("Contract ID is missing.");
        }
      } catch (error) {
        setError("Error loading PDF.");
        console.error("Error displaying PDF file:", error);
      } finally {
        setLoading(false); // Set loading to false after processing
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
    await page.render(renderContext).promise; // Ensure rendering is completed
  };

  return (
    <Wrapper>
      <Container>
        <AireviewedIconWrapper>
          <AireviewedIcon data={suggestcontract} type="image/svg+xml" />
        </AireviewedIconWrapper>
        <Content>
          {loading ? (
            <p>Loading PDF...</p>
          ) : error ? (
            <p>{error}</p>
          ) : pdfUrl ? (
            <canvas ref={pdfCanvasRef}></canvas>
          ) : (
            <p>PDF URL is not available.</p>
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
  overflow-y: auto; /* Changed from 'scroll' to 'auto' */
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
  text-align: center; /* Center text */
`;
