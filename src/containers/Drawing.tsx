import React, { createRef, useEffect, useState, useCallback } from 'react';
import { DragActions } from '../entities';
import { getMovePosition } from '../utils/helpers';
import { Drawing as DrawingComponent } from '../components/PdfEditorComponent/Drawing';

interface Props {
  pageWidth: number;
  pageHeight: number;
  removeDrawing: () => void;
  updateDrawingAttachment: (drawingObject: Partial<DrawingAttachment>) => void;
  ws: WebSocket | null; // 웹소켓 객체를 props로 추가
  username: string | null; // 사용자 이름을 props로 추가
  setPageIndex: (index: number) => void; // 페이지 인덱스 설정 함수 추가
  setMousePositions: (positions: any) => void; // 마우스 위치 설정 함수 추가
  addAttachment: (attachment: DrawingAttachment) => void; // addAttachment 함수 추가
}

export const Drawing = ({
  id,
  x,
  y,
  width,
  height,
  stroke,
  strokeWidth,
  path,
  pageWidth,
  pageHeight,
  removeDrawing,
  updateDrawingAttachment,
  ws,
  username,
  setPageIndex,
  setMousePositions,
  addAttachment,
}: DrawingAttachment & Props) => {
  const svgRef = createRef<SVGSVGElement>();
  const [mouseDown, setMouseDown] = useState(false);
  const [positionTop, setPositionTop] = useState(y);
  const [positionLeft, setPositionLeft] = useState(x);
  const [dimmerActive, setDimmerActive] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const [direction, setDirection] = useState<string[]>([]);
  const [operation, setOperation] = useState<DragActions>(
    DragActions.NO_MOVEMENT
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.setAttribute('viewBox', `0 0 ${currentWidth} ${currentHeight}`);
    }
  }, [svgRef]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'update_drawing' && message.payload.id === id) {
          setPositionTop(message.payload.y);
          setPositionLeft(message.payload.x);
          setCurrentWidth(message.payload.width);
          setCurrentHeight(message.payload.height);
        } else if (message.type === 'mouse_move') {
          setMousePositions(prev => ({ ...prev, [message.payload.username]: message.payload.position }));
        } else if (message.type === 'page_change') {
          setPageIndex(message.payload.pageIndex);
        } else if (message.type === 'add_drawing') {
          addAttachment(message.payload);
        }
        console.log(message);
      };
    }
  }, [ws, id, setPageIndex, setMousePositions, addAttachment]);

  const handleMousedown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(true);
    setOperation(DragActions.MOVE);
    const directions = event.currentTarget.dataset.direction;
    if (directions) {
      setDirection(directions.split('-'));
      setOperation(DragActions.SCALE);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (mouseDown && operation === DragActions.MOVE) {
      requestAnimationFrame(() => {
        const { top, left } = getMovePosition(
          positionLeft,
          positionTop,
          event.movementX,
          event.movementY,
          currentWidth,
          currentHeight,
          pageWidth,
          pageHeight
        );

        setPositionTop(top);
        setPositionLeft(left);

        // 웹소켓을 통해 위치 정보 전송
        if (ws && username) {
          ws.send(JSON.stringify({
            type: 'update_drawing',
            payload: { id, x: left, y: top, width: currentWidth, height: currentHeight, username }
          }));
        }
      });
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(false);

    if (operation === DragActions.MOVE) {
      const { top, left } = getMovePosition(
        positionLeft,
        positionTop,
        event.movementX,
        event.movementY,
        currentWidth,
        currentHeight,
        pageWidth,
        pageHeight
      );

      updateDrawingAttachment({
        x: positionLeft,
        y: positionTop
      });

      // 웹소켓을 통해 위치 정보 전송
      if (ws && username) {
        ws.send(JSON.stringify({
          type: 'update_drawing',
          payload: { id, x: positionLeft, y: positionTop, width: currentWidth, height: currentHeight, username }
        }));
      }
    }

    if (operation === DragActions.SCALE) {
      updateDrawingAttachment({
        x: positionLeft,
        y: positionTop,
        width: currentWidth,
        height: currentHeight,
      });
      console.log(`handleMouseUp SCALE w ${width} cw: ${currentWidth} h: ${height} ch: ${currentHeight}`);

      // 웹소켓을 통해 크기 정보 전송
      if (ws && username) {
        ws.send(JSON.stringify({
          type: 'update_drawing',
          payload: { id, x: positionLeft, y: positionTop, width: currentWidth, height: currentHeight, username }
        }));
      }
    }

    setOperation(DragActions.NO_MOVEMENT);
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    if (operation === DragActions.MOVE) {
      handleMouseUp(event);
    }
  };

  const handleResizeMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (mouseDown) {
      requestAnimationFrame(() => {
        if (direction.includes('left')) {
          setPositionLeft(positionLeft + event.movementX);
          setCurrentWidth(currentWidth - event.movementX);
        }

        if (direction.includes('top')) {
          setPositionTop(positionTop + event.movementY);
          setCurrentHeight(currentHeight - event.movementY);
        }

        if (direction.includes('right')) {
          setCurrentWidth(currentWidth + event.movementX);
        }

        if (direction.includes('bottom')) {
          setCurrentHeight(currentHeight + event.movementY);
        }

        // 웹소켓을 통해 크기 정보 전송
        if (ws && username) {
          ws.send(JSON.stringify({
            type: 'update_drawing',
            payload: { id, x: positionLeft, y: positionTop, width: currentWidth, height: currentHeight, username }
          }));
        }
      });
    }
  };

  const handleClick = () => setDimmerActive(true);
  const cancelDelete = () => setDimmerActive(false);

  const confirmDelete = () => {
    cancelDelete();
    removeDrawing();
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.setAttribute('viewBox', `0 0 ${currentWidth} ${currentHeight}`);

      const scaleX = currentWidth / width;
      const scaleY = currentHeight / height;
      const paths = svg.getElementsByTagName('path');
      for (let i = 0; i < paths.length; i++) {
        paths[i].setAttribute('transform', `scale(${scaleX}, ${scaleY})`);
      }

      updateDrawingAttachment({
        x: positionLeft,
        y: positionTop,
        scaleX,
        scaleY,
      });
    }
  }, [currentWidth, currentHeight, width, height]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const step = 5; // 이동 간격
    let newTop = positionTop;
    let newLeft = positionLeft;

    switch (event.key) {
      case 'ArrowUp':
        newTop = Math.max(0, positionTop - step);
        break;
      case 'ArrowDown':
        newTop = Math.min(pageHeight - currentHeight, positionTop + step);
        break;
      case 'ArrowLeft':
        newLeft = Math.max(0, positionLeft - step);
        break;
      case 'ArrowRight':
        newLeft = Math.min(pageWidth - currentWidth, positionLeft + step);
        break;
      default:
        return;
    }

    setPositionTop(newTop);
    setPositionLeft(newLeft);

    updateDrawingAttachment({
      x: newLeft,
      y: newTop,
    });

    // 웹소켓을 통해 위치 정보 전송
    if (ws && username) {
      ws.send(JSON.stringify({
        type: 'update_drawing',
        payload: { id, x: newLeft, y: newTop, width: currentWidth, height: currentHeight, username }
      }));
    }
  }, [positionTop, positionLeft, pageWidth, pageHeight, currentWidth, currentHeight, updateDrawingAttachment, ws, username]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <DrawingComponent
      stroke={stroke}
      strokeWidth={strokeWidth}
      path={path || undefined}
      width={currentWidth}
      svgRef={svgRef}
      height={currentHeight}
      onClick={handleClick}
      cancelDelete={cancelDelete}
      dimmerActive={dimmerActive}
      deleteDrawing={confirmDelete}
      handleMouseDown={handleMousedown}
      handleMouseMove={handleMouseMove}
      handleMouseOut={handleMouseOut}
      handleMouseUp={handleMouseUp}
      handleResizeMouseMove={handleResizeMouseMove}
      positionLeft={positionLeft}
      positionTop={positionTop}
    />
  );
};
