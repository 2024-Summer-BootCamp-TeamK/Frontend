import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import Button from "../components/Button";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer as HeaderButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const ContractShare = () => {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [ws, setWs] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [mousePositions, setMousePositions] = useState({});
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log("Received message:", data);
        if (data.type === 'scroll') {
          setPageNumber(data.payload.pageNumber);
        } else if (data.type === 'mouse_move') {
          setMousePositions((prevPositions) => ({
            ...prevPositions,
            [data.payload.username]: data.payload.position,
          }));
        }
      };

      ws.onclose = () => setWs(null);
    }
  }, [ws]);

  const handleJoinRoom = () => {
    if (roomName && username) {
      const websocket = new WebSocket(`ws://localhost:8000/ws/documents/${roomName}/`);
      setWs(websocket);
    }
  };

  useEffect(() => {
    const url = "https://lawbotttt.s3.ap-northeast-2.amazonaws.com/contracts/280df2d1-3923-42f3-a69a-bc573397056e.pdf";

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdf) => {
      setPdfDoc(pdf);
      setPageNumber(1); // PDF가 로드될 때 페이지 번호를 1로 설정
    });
  }, []);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNumber);
    }
  }, [pdfDoc, pageNumber]);

  const renderPage = (num) => {
    if (!canvasRef.current || !pdfDoc) {
      return;
    }

    pdfDoc.getPage(num).then((page) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const container = containerRef.current;
      const scale = container.clientWidth / page.getViewport({ scale: 1 }).width;
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  };

  const handlePreviousPage = () => {
    const newPageNumber = Math.max(pageNumber - 1, 1);
    setPageNumber(newPageNumber);
    ws.send(JSON.stringify({ type: 'scroll', payload: { pageNumber: newPageNumber } }));
  };

  const handleNextPage = () => {
    const newPageNumber = Math.min(pageNumber + 1, pdfDoc.numPages);
    setPageNumber(newPageNumber);
    ws.send(JSON.stringify({ type: 'scroll', payload: { pageNumber: newPageNumber } }));
  };

  const handleSign = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.fillText('Signature', x, y);
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (ws) {
      ws.send(JSON.stringify({ type: 'mouse_move', payload: { username, position: { x, y } } }));
    }
  };

  return (
    <div>
      <Headerall>
        <LogoContainer>
          <Logo data={logoSrc} type="image/svg+xml" />
        </LogoContainer>
        <HeaderButtonContainer>
          <Button>AI 검토 받으러 가기</Button>
          <Button>상대방과 계약서 검토하기</Button>
        </HeaderButtonContainer>
      </Headerall>
      {!ws ? (
        <JoinContainer>
          <input
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </JoinContainer>
      ) : (
        <MainContainer>
          <NavigationButton onClick={handlePreviousPage} disabled={pageNumber <= 1}>
            Previous
          </NavigationButton>
          <PDFWrapper ref={containerRef} onMouseMove={handleMouseMove}>
            <canvas ref={canvasRef} onClick={handleSign}></canvas>
            {Object.entries(mousePositions).map(([user, position]) => (
              user !== username && (
                <MousePointer
                  key={user}
                  style={{ left: position.x, top: position.y }}
                />
              )
            ))}
          </PDFWrapper>
          <NavigationButton onClick={handleNextPage} disabled={pageNumber >= (pdfDoc && pdfDoc.numPages)}>
            Next
          </NavigationButton>
        </MainContainer>
      )}
    </div>
  );
};

export default ContractShare;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set to full height */
  gap: 20px; /* Add gap between navigation buttons and PDF viewer */
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set to full height */
`;

const PDFWrapper = styled.div`
  position: relative;
  width: 60%; /* Set to 60% of the viewport width */
  height: 100%; /* Set to full height */
  padding: 0;
  margin: 0;
  overflow: auto;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.3);
`;

const NavigationButton = styled.button`
  height: 40px; /* Set a fixed height for the buttons */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const MousePointer = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
`;

const IframeContainer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
