import React from 'react';
import { AttachmentTypes } from '../../entities';
import { Drawing } from '../../containers/Drawing';

interface Props {
  attachments: Attachment[];
  pdfName: string;
  pageDimensions: Dimensions;
  removeAttachment: (index: number) => void;
  updateAttachment: (index: number, attachment: Partial<Attachment>) => void;
  ws: WebSocket | null; // ������ ��ü�� props�� �߰�
  username: string | null; // ����� �̸��� props�� �߰�
}

export const Attachments: React.FC<Props> = ({
  attachments,
  pdfName,
  pageDimensions,
  removeAttachment,
  updateAttachment,
  ws,
  username,
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
                  ws={ws} // ������ ����
                  username={username} // ����� �̸� ����
                />
              );
            }

            return null;
          })
        : null}
    </>
  ) : null;
};
