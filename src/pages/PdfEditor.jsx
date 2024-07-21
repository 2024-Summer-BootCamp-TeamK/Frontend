import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import MenuBar from '../components/PdfEditorComponent/MenuBar';
import { DrawingModal } from '../components/modals/DrawingModal';
import { usePdf } from '../hooks/usePdf';
import { AttachmentTypes } from '../entities';
import { ggID } from '../utils/helpers';
import { useAttachments } from '../hooks/useAttachments';
import { useUploader, UploadTypes } from '../hooks/useUploader';
import { Page } from '../components/PdfEditorComponent/Page';
import { Attachments } from '../components/PdfEditorComponent/Attachments';
import { fetchPdfDocument } from '../services/pdfService';
import Button from "../components/Button";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer 
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import { useLocation } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const PdfEditor = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [ws, setWs] = useState(null); // 웹소켓 상태 추가
  const [mousePositions, setMousePositions] = useState({}); // 사용자 마우스 위치 상태 추가
  const [username, setUsername] = useState(null); // username 상태 추가
  const location = useLocation();
  const { documentId, password } = location.state || {}; // 이전 페이지에서 전달된 상태 사용
  const canvasRef = useRef(null); // 캔버스 참조 추가

  const {
    initialize,
    pageIndex,
    isMultiPage,
    currentPage,
    isSaving,
    savePdf,
    setDimensions,
    name,
    dimensions,
    setPageIndex,
    pages
  } = usePdf();
  
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;

  const {
    add: addAttachment,
    allPageAttachments,
    pageAttachments,
    reset: resetAttachments,
    update,
    remove,
    setPageIndex: setAttachmentsPageIndex
  } = useAttachments();
  
  const initializePageAndAttachments = (file, pdfDocument) => {
    const numberOfPages = pdfDocument.numPages;
    const pages = Array.from({ length: numberOfPages }, (_, index) => pdfDocument.getPage(index + 1));
    
    initialize({
      name: file.name,
      file: file,
      pages: pages
    });
    resetAttachments(numberOfPages);
  };

  useLayoutEffect(() => {
    const loadPdf = async () => {
      try {
        const { pdfDocument, file } = await fetchPdfDocument(documentId, password);
        initializePageAndAttachments(file, pdfDocument);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    if (documentId && password) {
      loadPdf();
    }
  }, [documentId, password]);

  useLayoutEffect(() => {
    setAttachmentsPageIndex(pageIndex);
  }, [pageIndex, setAttachmentsPageIndex]);

  const { inputRef: pdfInput, handleClick: handlePdfClick, isUploading, onClick, upload: uploadPdf } = useUploader({ 
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments,
  });
  const { inputRef: imageInput, handleClick: handleImageClick, onClick: onImageClick, upload: uploadImage  } = useUploader({ 
    use: UploadTypes.IMAGE,
    afterUploadAttachment: addAttachment,
  });

  const handleSavePdf = () => savePdf(allPageAttachments);

  // 웹소켓 연결 설정
  useEffect(() => {
    if (documentId) {
      const websocket = new WebSocket(`ws://localhost:8000/ws/documents/${documentId}/`);
      websocket.onopen = () => {
        console.log('연결 성공');
      };
      websocket.onclose = (event) => {
        console.log('연결이 닫혔습니다: ', event);
      };
      websocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('받은 메시지: ', message); // 메시지 로그 확인
        if (message.type === 'user_count') {
          setUsername(message.payload.username); // 서버에서 전달된 username 설정
        }
        if (message.type === 'mouse_move') {
          setMousePositions(prev => ({ ...prev, [message.payload.username]: message.payload.position }));
        }
        if (message.type === 'page_change') {
          setPageIndex(message.payload.pageIndex); // 서버에서 전달된 페이지 인덱스로 페이지 변경
        }
        if (message.type === 'add_drawing') {
          addAttachment(message.payload); // 서버에서 전달된 드로잉 추가
        }
        if (message.type === 'update_drawing') {
            update( message.payload); 
          }
      };
      websocket.onerror = (error) => {
        console.error('웹소켓 에러: ', error);
      };
      setWs(websocket);
      return () => websocket.close();
    }
  }, [documentId, setPageIndex]);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (ws && username) {
      ws.send(JSON.stringify({
        type: 'mouse_move',
        payload: { username, position: { x, y } }
      }));
    }
  };

  const handlePageChange = (newPageIndex) => {
    if (ws) {
      ws.send(JSON.stringify({
        type: 'page_change',
        payload: { pageIndex: newPageIndex }
      }));
    }
    setPageIndex(newPageIndex);
  };

  const addDrawing = (drawing) => {
    if (!drawing) return;

    const newDrawingAttachment = {
      id: ggID(),
      type: AttachmentTypes.DRAWING,
      ...drawing,
      x: 0,
      y: 0,
      scale: 1,
      username: username, 
    };

    // 서버로 드로잉 추가 이벤트 전송
    if (ws) {
      ws.send(JSON.stringify({
        type: 'add_drawing',
        payload: newDrawingAttachment
      }));
    }
  };

  return (
    <Container style={{ margin: 30, backgroundColor: "#fefdf6", paddingBottom: 30 }} onMouseMove={handleMouseMove}>
      <Headerall>
        <LogoContainer>
          <Logo data={logoSrc} type="image/svg+xml" />
        </LogoContainer>
        <ButtonContainer>
          <Button>AI 검토 받으러 가기</Button>
          <Button>상대방과 계약서 검토하기</Button>
        </ButtonContainer>
      </Headerall>
      {currentPage ? (
        <Grid>
          <Grid.Row>
            <Grid.Column width={3} verticalAlign="middle" textAlign="left">
              {isMultiPage && (
                <NavigationButton onClick={() => handlePageChange(pageIndex - 1)} disabled={isFirstPage}>Previous</NavigationButton>
              )}
            </Grid.Column>
            <Grid.Column width={10}>
              {currentPage && (
                <StyledSegment style={{ marginTop: '80px' }} data-testid="page" compact stacked={isMultiPage && !isLastPage}>
                  <div style={{ position: 'relative' }} ref={canvasRef}>
                    <Page dimensions={dimensions} updateDimensions={setDimensions} page={currentPage} />
                    {dimensions && (
                      <Attachments
                       
                        pdfName={name}
                        removeAttachment={remove}
                        updateAttachment={update}
                        pageDimensions={dimensions}
                        attachments={pageAttachments}
                        ws={ws}
                        username={username}
                      />
                    )}
                    {Object.entries(mousePositions).map(([username, pos]) => (
                      <div
                        key={username}
                        style={{
                          position: 'absolute',
                          left: pos.x,
                          top: pos.y,
                          backgroundColor: 'red',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                        }}
                      />
                    ))}
                  </div>
                </StyledSegment>
              )}
            </Grid.Column>
            <Grid.Column width={3} verticalAlign="middle" textAlign="right">
              {isMultiPage && (
                <NavigationButton onClick={() => handlePageChange(pageIndex + 1)} disabled={isLastPage}>Next</NavigationButton>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <div>Loading PDF...</div>
      )}
      <MenuBar
        savePdf={handleSavePdf}
        addDrawing={() => setDrawingModalOpen(true)}
        savingPdfStatus={isSaving}
        isPdfLoaded={!!currentPage}
      />
      <DrawingModal open={drawingModalOpen} dismiss={() => setDrawingModalOpen(false)} confirm={addDrawing} />
    </Container>
  );
}

export default PdfEditor;

const StyledSegment = styled(Segment)`
  margin-top: 80px;
`;

const NavigationButton = styled.button`
  height: 40px; 
  background-color: #141F7B;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
