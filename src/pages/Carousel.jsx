import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import SignatureCanvas from 'react-signature-canvas';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb } from 'pdf-lib';
import Draggable from 'react-draggable';
import Button from "../components/Button";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer as HeaderButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import shareInfoIcon from "../images/share-info-icon.svg";

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const ContractShare = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [ws, setWs] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [mousePositions, setMousePositions] = useState({});
  const [isSigned, setIsSigned] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sigCanvas = useRef(null);
  const navigate = useNavigate();

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

  // 웹소켓 서버연결
  const handleJoinRoom = () => {
    if (roomName && username) {
      const websocket = new WebSocket(`ws://localhost:8000/ws/documents/${roomName}/`);
      setWs(websocket);
    }
  };

  useEffect(() => {
    const url = "https://lawbotttt.s3.ap-northeast-2.amazonaws.com/contracts/08d30cec-df41-4808-9465-ee5f4cfba229.pdf"
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

  // 페이지 연동 웹소켓
  const handlePreviousPage = () => {
    const newPageNumber = Math.max(pageNumber - 1, 1);
    setPageNumber(newPageNumber);
    ws.send(JSON.stringify({ type: 'scroll', payload: { pageNumber: newPageNumber } }));
  };

  // 페이지 연동 웹소켓
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

  // 마우스 포인터 연동 웹소켓
  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (ws) {
      ws.send(JSON.stringify({ type: 'mouse_move', payload: { username, position: { x, y } } }));
    }
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleBegin = () => {
    setIsSigned(true);
  };

  const handleDragStop = (e, data) => {
    setSignaturePosition({ x: data.x, y: data.y });
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setIsSigned(false);
  };

  const saveSignature = () => {
    const dataURL = sigCanvas.current.toDataURL();
    setSignatureImage(dataURL);
    handleModalClose();
    console.log(dataURL);
  };

  const handleSavePDF = async () => {
    const pdfurl = "https://lawbotttt.s3.ap-northeast-2.amazonaws.com/contracts/08d30cec-df41-4808-9465-ee5f4cfba229.pdf";
    const existingPdfBytes = await fetch(pdfurl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const page = pdfDoc.getPage(pageNumber - 1);
    const pngImage = await pdfDoc.embedPng(signatureImage);
    const { x, y } = signaturePosition;

    page.drawImage(pngImage, {
      x,
      y: page.getHeight() - y - 100, // y 좌표 조정
      width: 150,
      height: 50,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'signed_document.pdf';
    link.click();
  };


  return (
    <div>
      <Headerall>
        <LogoContainer>
          <Logo data={logoSrc} type="image/svg+xml" />
        </LogoContainer>
        <HeaderButtonContainer>
          <Button onClick={() => navigate('/category')}>AI 검토 받으러 가기</Button>
          <Button onClick={() => navigate('/fileuploadshare')}>상대방과 계약서 검토하기</Button>
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
          <ContentWrapper>


            <NavigationButton onClick={handlePreviousPage} disabled={pageNumber <= 1}>
              Previous
            </NavigationButton>
            <PDFWrapper ref={containerRef} onMouseMove={handleMouseMove}>
              <PDFCanvasWrapper>
                <PDFCanvas ref={canvasRef} onClick={handleSign}></PDFCanvas>
              </PDFCanvasWrapper>
              {signatureImage && (
                <Draggable onStop={handleDragStop}>
                  <SignatureImage src={signatureImage} alt="Signature" />
                </Draggable>
              )}
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

          </ContentWrapper>
          <Footer>
            <FooterText>
              <InfoIcon src={shareInfoIcon} alt="Info icon" />
              자세한 설명이 필요하다면?
            </FooterText>
            <ButtonGroup>
              <SignButton onClick={handleModalOpen}>서명하기</SignButton>
              <SaveButton onClick={handleSavePDF}>저장하기</SaveButton>
            </ButtonGroup>
          </Footer>
        </MainContainer>
      )}
      {modalOpen && (
        <Modal>
          <ModalContent>
            <h3> 서명하기</h3>
            <SignatureWrapper>
              {!isSigned && <PlaceholderText> 이곳에 서명해주세요</PlaceholderText>}
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                onBegin={handleBegin}
                canvasProps={{ width: 550, height: 280, className: 'sigCanvas' }}
              />
            </SignatureWrapper>
            <CloseButton onClick={handleModalClose}>X</CloseButton>
            <ButtonContainer>
              <FooterButton onClick={clearSignature}>다시 서명하기</FooterButton>
              <FooterButton onClick={saveSignature}>삽입하기</FooterButton>
            </ButtonContainer>
            <p>본인의 서명이 법적 효력이 있음을 인정합니다.</p>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ContractShare;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 95vh;
  padding-top: 80px;
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set to full height */
`;

const LeftLobotWrapper = styled.div`
  position: absolute;
  left: 50px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  margin-bottom: 200px;
`;

const RightLobotWrapper = styled.div`
  position: absolute;
  right: 50px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  margin-bottom: 200px;
`;

const LobotIcon = styled.img`
  width: 3vw;
  height: auto;
  margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%; 
  height: 100%; 
`;

const PDFWrapper = styled.div`
  position: relative;
  width: 50%; 
  height: 90%; 
  border-radius: 20px;
  margin-top: 20px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2);
`;

const PDFCanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto; /* 내부 스크롤 추가 */
`;

const PDFCanvas = styled.canvas`
  display: block; /* 캔버스가 블록 요소로 표시되도록 설정 */
  width: 100%; /* 캔버스 너비를 부모 요소에 맞추도록 설정 */
  height: auto; /* 높이를 자동으로 설정 */
`;

const NavigationButton = styled.button`
  height: 40px; 
  background-color: #141F7B;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FEFDF6;
`;

const InfoIcon = styled.img`
  width: 1.5vw;
  height: auto;
  margin-right: 8px;
`;

const FooterText = styled.div`
  position: absolute;
  left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px; 
  display: flex;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 150px;
  justify-content: center;
`;

const SignButton = styled.button`
  background-color: #fff;
  color: #141f7b;
  width: 13vw;
  min-width: 13vw;
  padding: 10px 20px;
  border: 2px solid #141f7b; /* 외곽선 추가 */
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold; /* 글씨 두께를 bold로 설정 */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #141f7b; /* 눌렸을 때 배경색 */
    color: white; 
    outline: none; 
  }
`;

const SaveButton = styled.button`
 background-color: #141F7B;
  color: white;
  width: 13vw;
  padding: 10px 20px;
  border: 2px solid #141f7b; /* 외곽선 추가 */
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold; /* 글씨 두께를 bold로 설정 */
  cursor: pointer;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #141f7b; 
    color: white;
    outline: none; 
  }
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 32, 41, 0.75);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  padding-bottom: 5px;
  border-radius: 10px;
  box-shadow: 0 12px 25px rgba(199, 175, 189, 0.25);
  text-align: center;
  max-width: 600px;
  width: 80%;
  font-size: 14px;
  .sigCanvas {
    border: 1px solid #000;
  }
  h3{
    color: #000;
    font-size: 22px;
    padding-bottom: 5px;
  }

  p{
    color: #000;
    font-size: 14px;
  }
`;

const SignatureWrapper = styled.div`
  position: relative;
`;

const PlaceholderText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ccc;
  font-size: 24px;
  pointer-events: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  position: fixed;
  align-items: center;
  justify-content: center;
  display: flex;
  top: 30px;
  right: 30px;
  background-color: #ffeba7;
  color: #102770;
  border-radius: 3px;
  width: 40px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 12px 25px rgba(16, 39, 112, 0.25);
  &:hover {
    background-color: #102770;
    color: #ffeba7;
  }
`;

const FooterButton = styled.button`
  background-color: #102770;
  color: #ffeba7;
  padding: 10px 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  &:hover {
    background-color: #fff;
    color: #102770;
    border-color: #102770;
    border-width: 2px;
    font-weight: bold;
  }
`;

const SignatureImage = styled.img`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 200px;
  height: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s;
  }
`;