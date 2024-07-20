import React, { useState, useLayoutEffect } from 'react';
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
import { getAsset } from '../utils/prepareAssets';
import * as pdfjsLib from 'pdfjs-dist';
import axios from 'axios';

import Button from "../components/Button";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer 
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import BorderStyle from 'pdf-lib/cjs/core/annotation/BorderStyle';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const PdfEditor = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [pdfDocument, setPdfDocument] = useState(null);

  const {
    initialize,
    pageIndex,
    isMultiPage,
    isFirstPage,
    isLastPage,
    currentPage,
    isSaving,
    savePdf,
    previousPage,
    nextPage,
    setDimensions,
    name,
    dimensions
  } = usePdf();
  
  const {
    add: addAttachment,
    allPageAttachments,
    pageAttachments,
    reset: resetAttachments,
    update,
    remove,
    setPageIndex
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
        const documentId = 5;
        const password = 'bBk7J4';
        const url = `http://localhost/api/v1/encryption/test/${documentId}`;
        const pdfjsLib = await getAsset('pdfjsLib');

        // Fetch the PDF file from the server
        const response = await axios.get(url, { 
          responseType: 'blob',
          headers: {
            'X-Password': password
          }
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const file = new File([blob], "document.pdf", { type: "application/pdf" });

        const loadingTask = pdfjsLib.getDocument({ data: await blob.arrayBuffer() });
        const pdfDocument = await loadingTask.promise;
        setPdfDocument(pdfDocument);

        initializePageAndAttachments(file, pdfDocument);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf();
  }, []);

  const { inputRef: pdfInput, handleClick: handlePdfClick, isUploading, onClick, upload: uploadPdf } = useUploader({ 
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments,
  });
  const { inputRef: imageInput, handleClick: handleImageClick, onClick: onImageClick, upload: uploadImage  } = useUploader({ 
    use: UploadTypes.IMAGE,
    afterUploadAttachment: addAttachment,
  });

  const addDrawing = (drawing) => {
    if (!drawing) return;

    const newDrawingAttachment = {
      id: ggID(),
      type: AttachmentTypes.DRAWING,
      ...drawing,
      x: 0,
      y: 0,
      scale: 1,
    };
    addAttachment(newDrawingAttachment);
  }

  useLayoutEffect(() => setPageIndex(pageIndex), [pageIndex, setPageIndex]);

  const handleSavePdf = () => savePdf(allPageAttachments);

  return (
    <Container style={{ margin: 30, backgroundColor: "#fefdf6" , paddingBottom: 30}}>
        <Headerall>
            <LogoContainer>
                <Logo data={logoSrc} type="image/svg+xml" />
            </LogoContainer>
            <ButtonContainer>
                <Button>AI 검토 받으러 가기</Button>
                <Button>상대방과 계약서 검토하기</Button>
            </ButtonContainer>
        </Headerall>
        { currentPage ? (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle" textAlign="left">
                        {isMultiPage && !isFirstPage && (
                            <NavigationButton onClick={previousPage}>Previous</NavigationButton>
                        )}
                    </Grid.Column>
                    <Grid.Column width={10}>
                        { currentPage && (
                            <StyledSegment style={{ marginTop: '80px'}}
                                data-testid="page"
                                compact
                                stacked={isMultiPage && !isLastPage}
                            >
                                <div style={{ position: 'relative' }}>
                                    <Page
                                        dimensions={dimensions}
                                        updateDimensions={setDimensions}
                                        page={currentPage} 
                                    />
                                    { dimensions && (
                                        <Attachments
                                            pdfName={name}
                                            removeAttachment={remove}
                                            updateAttachment={update}
                                            pageDimensions={dimensions}
                                            attachments={pageAttachments}
                                        /> 
                                    )}
                                </div>
                            </StyledSegment>
                        )}
                    </Grid.Column>
                    <Grid.Column width={3} verticalAlign="middle" textAlign="right">
                        {isMultiPage && !isLastPage && (
                            <NavigationButton onClick={nextPage}>Next</NavigationButton>
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
            isPdfLoaded={!!pdfDocument}
        />
        <DrawingModal 
            open={drawingModalOpen} 
            dismiss={() => setDrawingModalOpen(false)}
            confirm={addDrawing}
        />
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
