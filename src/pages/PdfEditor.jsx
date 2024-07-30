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
import Button from "../components/Button2";

import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import { useLocation } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import documentService from "../services/putPdfService"; // import documentService

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const PdfEditor = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [ws, setWs] = useState(null); // 웹소켓 상태 추가
  const [mousePositions, setMousePositions] = useState({}); // 사용자 마우스 위치 상태 추가
  const [userColors, setUserColors] = useState({}); // 사용자 색상 상태 추가
  const location = useLocation();
  const { documentId, password, username } = location.state || {}; // 이전 페이지에서 전달된 상태 사용
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
    pages,
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
    setPageIndex: setAttachmentsPageIndex,
  } = useAttachments();

  const initializePageAndAttachments = (file, pdfDocument) => {
    const numberOfPages = pdfDocument.numPages;
    const pages = Array.from({ length: numberOfPages }, (_, index) =>
      pdfDocument.getPage(index + 1)
    );

    initialize({
      name: file.name,
      file: file,
      pages: pages,
    });
    resetAttachments(numberOfPages);
  };

  useLayoutEffect(() => {
    const loadPdf = async () => {
      try {
        const { pdfDocument, file } = await fetchPdfDocument(
          documentId,
          password
        );
        initializePageAndAttachments(file, pdfDocument);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    if (documentId && password) {
      loadPdf();
    }
  }, [documentId, password]);

  useLayoutEffect(() => {
    setAttachmentsPageIndex(pageIndex);
  }, [pageIndex, setAttachmentsPageIndex]);

  const {
    inputRef: pdfInput,
    handleClick: handlePdfClick,
    isUploading,
    onClick,
    upload: uploadPdf,
  } = useUploader({
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments,
  });
  const {
    inputRef: imageInput,
    handleClick: handleImageClick,
    onClick: onImageClick,
    upload: uploadImage,
  } = useUploader({
    use: UploadTypes.IMAGE,
    afterUploadAttachment: addAttachment,
  });

  const handleSavePdf = async () => {
    try {
      const savedPdfBlob = await savePdf(allPageAttachments);
      console.log("저장 완료", savedPdfBlob); // savedPdfBlob을 로그로 출력

      if (savedPdfBlob) {
        console.log("수정한다 이제");
        const pdfFile = new File([savedPdfBlob], `${name}.pdf`, {
          type: "application/pdf",
        });
        await documentService.updateDocument(documentId, pdfFile); // 객체의 메서드로 호출
        console.log("Document updated successfully");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // 웹소켓 연결 설정
  useEffect(() => {
    if (documentId) {
      const websocket = new WebSocket(`wss://lawbot.store/ws/documents/${documentId}/`);

      websocket.onopen = () => {
        console.log("연결 성공");
      };
      websocket.onclose = (event) => {
        console.log("연결이 닫혔습니다: ", event);
      };
      websocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("받은 메시지: ", message); // 메시지 로그 확인
        if (message.type === "user_count") {
          setUsername(message.payload.username); // 서버에서 전달된 username 설정
        }

        if (message.type === 'mouse_move') {
          setMousePositions(prev => ({ ...prev, [message.payload.username]: message.payload.position }));
          if (!userColors[message.payload.username]) {
            setUserColors(prev => ({ ...prev, [message.payload.username]: getRandomColor() }));
          }

        }
        if (message.type === "page_change") {
          setPageIndex(message.payload.pageIndex); // 서버에서 전달된 페이지 인덱스로 페이지 변경
        }
        if (message.type === "add_drawing") {
          addAttachment(message.payload); // 서버에서 전달된 드로잉 추가
        }
        if (message.type === 'update_drawing') {
          update(message.payload); 
        }
      };
      websocket.onerror = (error) => {
        console.error("웹소켓 에러: ", error);
      };
      setWs(websocket);
      return () => websocket.close();
    }
  }, [documentId, setPageIndex, userColors]);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (ws && username) {
      ws.send(
        JSON.stringify({
          type: "mouse_move",
          payload: { username, position: { x, y } },
        })
      );
    }
  };

  const handlePageChange = (newPageIndex) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "page_change",
          payload: { pageIndex: newPageIndex },
        })
      );
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
      ws.send(
        JSON.stringify({
          type: "add_drawing",
          payload: newDrawingAttachment,
        })
      );
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getContrastingColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'black' : 'white';
  };

  return (
    <Container
      style={{ margin: 30, backgroundColor: "#fefdf6", paddingBottom: 30 }}
      onMouseMove={handleMouseMove}
    >
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
            <Grid.Column style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }} width={3}>
              {isMultiPage && (
                <CircleButton onClick={() => handlePageChange(pageIndex - 1)} disabled={isFirstPage}>
                  <ButtonText>{'<'}</ButtonText>
                </CircleButton>
              )}
            </Grid.Column>
            <Grid.Column width={10}>
              {currentPage && (
                <StyledSegment style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }} data-testid="page" compact stacked={isMultiPage && !isLastPage}>
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
                        setPageIndex={setPageIndex}
                        setMousePositions={setMousePositions}
                        addAttachment={addAttachment}
                      />
                    )}
                    {Object.entries(mousePositions).map(([username, pos]) => (
                      <PointerContainer
                        key={username}
                        style={{
                          left: pos.x,
                          top: pos.y,
                        }}
                      >
                        <PointerCircle />
                        <PointerLabel 
                          style={{ 
                            backgroundColor: userColors[username] || getRandomColor(), 
                            color: getContrastingColor(userColors[username] || '#ffffff')
                          }}
                        >
                          {username}
                        </PointerLabel>
                      </PointerContainer>
                    ))}
                  </div>
                </StyledSegment>
              )}
            </Grid.Column>
            <Grid.Column style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }} width={3}>
              {isMultiPage && (
                <CircleButton onClick={() => handlePageChange(pageIndex + 1)} disabled={isLastPage}>
                  <ButtonText>{'>'}</ButtonText>
                </CircleButton>
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
      <DrawingModal
        open={drawingModalOpen}
        dismiss={() => setDrawingModalOpen(false)}
        confirm={addDrawing}
      />
    </Container>
  );
};

export default PdfEditor;

const StyledSegment = styled(Segment)`
  margin-top: 80px;
`;

const CircleButton = styled.button`
  height: 40px; 
  width: 40px;
  background-color: #141F7B;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0; /* 패딩 제거 */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3px; /* 텍스트를 약간 밑으로 이동 */
`;

const PointerContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  pointer-events: none; /* 포인터 이벤트 비활성화 */
  z-index: 10; /* 다른 요소들 위로 올리기 */
`;

const PointerCircle = styled.div`
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
  margin-right: 5px;
`;

const PointerLabel = styled.span`
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
  white-space: nowrap; /* 텍스트가 세로로 바뀌지 않도록 */
`;
