import React, { RefObject, useState } from 'react';
import { Dimmer } from 'semantic-ui-react';
import { Div } from '../ui/components/Div';
import { ConfirmContent } from './ConfirmContent';

const ADJUSTERS_DIMENSIONS = 20;

interface Props {
  id: string; // id 추가
  path?: string;
  stroke?: string;
  width: number;
  height: number;
  strokeWidth?: number;
  positionTop: number;
  positionLeft: number;
  dimmerActive: boolean;
  cancelDelete: () => void;
  deleteDrawing: () => void;
  onClick: () => void;
  svgRef: RefObject<SVGSVGElement>;
  handleMouseDown: DragEventListener<HTMLDivElement>;
  handleMouseUp: DragEventListener<HTMLDivElement>;
  handleMouseMove: DragEventListener<HTMLDivElement>;
  handleMouseOut: DragEventListener<HTMLDivElement>;
  handleResizeMouseMove: DragEventListener<HTMLDivElement>;
  updateDrawing: (drawing: any) => void; // 추가된 prop
}

export const Drawing: React.FC<Props> = ({
  id, // id 추가
  dimmerActive,
  cancelDelete,
  deleteDrawing,
  positionTop,
  positionLeft,
  width,
  height,
  svgRef,
  path,
  stroke,
  strokeWidth,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  handleResizeMouseMove,
  onClick,
  updateDrawing, // 추가된 prop
}) => {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const newTop = positionTop + e.clientY - startY;
    const newLeft = positionLeft + e.clientX - startX;
    updateDrawing({ id, positionTop: newTop, positionLeft: newLeft, width, height, path, stroke, strokeWidth });
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!resizing) return;
    const newWidth = width + e.clientX - startX;
    const newHeight = height + e.clientY - startY;
    updateDrawing({ id, positionTop, positionLeft, width: newWidth, height: newHeight, path, stroke, strokeWidth });
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleResizeEnd = () => {
    setResizing(false);
  };

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseOut={handleDragEnd}
      onDoubleClick={onClick}
      style={{
        position: 'absolute',
        top: positionTop,
        left: positionLeft,
        width,
        height,
        cursor: 'move',
        border: '1px dashed grey',
      }}
    >
      <Dimmer.Dimmable as={Div} dimmed={dimmerActive}>
        <svg ref={svgRef}>
          <path
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={stroke}
            fill="none"
            d={path}
          />
        </svg>
        <Dimmer active={dimmerActive} onClickOutside={cancelDelete}>
          <ConfirmContent
            title="Delete?"
            onConfirm={deleteDrawing}
            onDismiss={cancelDelete}
          />
        </Dimmer>
      </Dimmer.Dimmable>
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
        (direction) => (
          <div
            key={direction}
            data-direction={direction}
            onMouseDown={handleResizeStart}
            onMouseMove={handleResize}
            onMouseUp={handleResizeEnd}
            style={{
              position: 'absolute',
              cursor: 'nwse-resize',
              width: ADJUSTERS_DIMENSIONS,
              height: ADJUSTERS_DIMENSIONS,
              [direction.split('-')[0]]: -5,
              [direction.split('-')[1]]: -5,
            }}
          />
        )
      )}
    </div>
  );
};
