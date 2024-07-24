import React from 'react';
import { AttachmentTypes } from '../../entities';
import { Drawing } from '../../containers/Drawing';

interface Props {
  attachments: Attachment[];
  pdfName: string;
  pageDimensions: Dimensions;
  removeAttachment: (index: number) => void;
  updateAttachment: (index: number, attachment: Partial<Attachment>) => void;
  ws: WebSocket | null; // 웹소켓 객체를 props로 추가
  username: string | null; // 사용자 이름을 props로 추가
  setPageIndex: (index: number) => void; // 페이지 인덱스 설정 함수 추가
  setMousePositions: (positions: any) => void; // 마우스 위치 설정 함수 추가
  addAttachment: (attachment: Attachment) => void; // addAttachment 함수 추가
}

export const Attachments: React.FC<Props> = ({
  attachments,
  pdfName,
  pageDimensions,
  removeAttachment,
  updateAttachment,
  ws,
  username,
  setPageIndex,
  setMousePositions,
  addAttachment,
}) => {
  const handleAttachmentUpdate = (index: number) => (
    attachment: Partial<Attachment>
  ) => updateAttachment(index, attachment);

  return attachments ? (
    <>
      {attachments.length
        ? attachments.map((attachment, index) => {
            const key = `${pdfName}-${index}`;

            if (attachment.type === AttachmentTypes.DRAWING) {
              return (
                <Drawing
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  removeDrawing={() => removeAttachment(index)}
                  updateDrawingAttachment={handleAttachmentUpdate(index)}
                  {...(attachment as DrawingAttachment)}
                  ws={ws}
                  username={username}
                  setPageIndex={setPageIndex}
                  setMousePositions={setMousePositions}
                  addAttachment={addAttachment}
                />
              );
            }

            return null;
          })
        : null}
    </>
  ) : null;
};
