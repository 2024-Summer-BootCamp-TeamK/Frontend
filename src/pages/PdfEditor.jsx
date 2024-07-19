import React, { useState, useLayoutEffect, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Button, Segment } from 'semantic-ui-react';
import  MenuBar from '../components/PdfEditorComponent/MenuBar';
import { DrawingModal } from '../components/modals/DrawingModal';
import { usePdf } from '../hooks/usePdf';
import { AttachmentTypes } from '../entities';
import { ggID } from '../utils/helpers';
import { useAttachments } from '../hooks/useAttachments';
import { useUploader, UploadTypes } from '../hooks/useUploader';
import { Page } from '../components/PdfEditorComponent/Page';
import { Attachments } from '../components/PdfEditorComponent/Attachments';
import { useLocation } from 'react-router-dom';
import { getAsset } from '../utils/prepareAssets';
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const PdfEditor = () => {
    const [drawingModalOpen, setDrawingModalOpen] = useState(false);
    const [file, setFile] = useState(null);

    const { initialize, pageIndex, isMultiPage, isFirstPage, isLastPage, currentPage, isSaving, savePdf, previousPage, nextPage, setDimensions, name, dimensions } = usePdf();
    const { add: addAttachment, allPageAttachments, pageAttachments, reset: resetAttachments, update, remove, setPageIndex } = useAttachments();
    
    const initializePageAndAttachments = (pdfDetails) => {
        initialize(pdfDetails);
        const numberOfPages = pdfDetails.pages.length;
        resetAttachments(numberOfPages);
    };

   //   const pdfjsLib = await getAsset('pdfjsLib');  라이브러리 가져오는 방법!!

   
    useLayoutEffect(() => {
        const loadPdf = async () => {
            try {
                const url = "https://lawbotttt.s3.ap-northeast-2.amazonaws.com/contracts/08d30cec-df41-4808-9465-ee5f4cfba229.pdf";
                const pdfjsLib = await getAsset('pdfjsLib');
                const loadingTask = pdfjsLib.getDocument(url);
                const pdfDocument = await loadingTask.promise;
                setFile(pdfDocument);
                initializePageAndAttachments({
                    file: pdfDocument,
                    pages: Array(pdfDocument.numPages).fill(0).map((_, index) => pdfDocument.getPage(index +1)),
                });
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

    const addText = () => {
        const newTextAttachment = {
            id: ggID(),
            type: AttachmentTypes.TEXT,
            x: 0,
            y: 0,
            width: 120,
            height: 25,
            size: 16,
            lineHeight: 1.4,
            fontFamily: 'Times-Roman',
            text: 'Enter Text Here',
        };
        addAttachment(newTextAttachment);
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
        }
        addAttachment(newDrawingAttachment);
    }

    useLayoutEffect(() => setPageIndex(pageIndex), [pageIndex, setPageIndex]);

    // const hiddenInputs = (
    //     <>
    //         <input
    //             data-testid="pdf-input"
    //             ref={pdfInput}
    //             type="file"
    //             name="pdf"
    //             id="pdf"
    //             accept="application/pdf"
    //             onChange={uploadPdf}
    //             onClick={onClick}
    //             style={{ display: 'none' }} 
    //         />
    //         <input
    //             ref={imageInput}
    //             type="file"
    //             id="image"
    //             name="image"
    //             accept="image/*"
    //             onClick={onImageClick}
    //             style={{ display: 'none' }}
    //             onChange={uploadImage} 
    //         />
    //     </>
    // )

    const handleSavePdf = () => savePdf(allPageAttachments);

    return (
        <Container style={{ margin: 30 }}>
            <MenuBar
                openHelp={() => setHelpModalOpen(true)}
                savePdf={handleSavePdf}
                addText={addText}
                addImage={handleImageClick}
                addDrawing={() => setDrawingModalOpen(true)}
                savingPdfStatus={isSaving}
                uploadNewPdf={handlePdfClick}
                isPdfLoaded={!!file}
            />

            { currentPage ? (
                
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3} verticalAlign="middle" textAlign="left">
                            {isMultiPage && !isFirstPage && (
                                <Button circular icon="angle left" onClick={previousPage} />
                            )}
                        </Grid.Column>
                        <Grid.Column width={10}>
                            { currentPage && (
                                <Segment
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
                                </Segment>
                            )}
                        </Grid.Column>
                        <Grid.Column width={3} verticalAlign="middle" textAlign="right">
                            {isMultiPage && !isLastPage && (
                                <Button circular icon="angle right" onClick={nextPage}/>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
             ) : (
                <div>Loading PDF...</div>
            )}
            <DrawingModal 
                open={drawingModalOpen} 
                dismiss={() => setDrawingModalOpen(false)}
                confirm={addDrawing}
            />
        </Container>
    );
}

export default PdfEditor;
