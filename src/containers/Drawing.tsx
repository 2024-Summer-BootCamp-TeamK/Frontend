import React, { createRef, useEffect, useState } from 'react';
import { DragActions } from '../entities';
import { getMovePosition } from '../utils/helpers';
import { Drawing as DrawingComponent } from '../components/PdfEditorComponent/Drawing';

interface Props {
  pageWidth: number;
  pageHeight: number;
  removeDrawing: () => void;
  updateDrawingAttachment: (drawingObject: Partial<DrawingAttachment>) => void;
}

export const Drawing = ({
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
      requestAnimationFrame(()=> {
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
    }
      
    // 얘는 실행 안되는듯 ( 지워도 되겠지만.. 혹시)
    if (operation === DragActions.SCALE) {
      updateDrawingAttachment({
        x: positionLeft,
        y: positionTop,
        width: currentWidth,
        height: currentHeight,
      });
      console.log(`handleMouseUp SCALE w ${width} cw: ${currentWidth} h: ${height} ch: ${currentHeight}`);
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
    if (mouseDown  ) {
      requestAnimationFrame(()=> {
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
      
      // scale 변경
      const scaleX = currentWidth / width;
      const scaleY = currentHeight / height;
      const paths = svg.getElementsByTagName('path');
      for (let i = 0; i < paths.length; i++) {
        paths[i].setAttribute('transform', `scale(${scaleX}, ${scaleY})`);
      }
      // 변경된 scale값으로 저장 -> pdf저장에도 넘겨야함.
      updateDrawingAttachment({
        x: positionLeft,
        y: positionTop,
        scaleX,
        scaleY,
      });
    }


  }, [currentWidth, currentHeight, width, height ]);

 

  
  return (
    <DrawingComponent
    stroke={stroke}
    strokeWidth={strokeWidth}
    path={path || undefined }
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
