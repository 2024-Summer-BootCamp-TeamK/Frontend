import React, { RefObject } from 'react';
import { Dimmer } from 'semantic-ui-react';
import { Div } from '../ui/components/Div';
import { ConfirmContent } from './ConfirmContent';

const ADJUSTERS_DIMENSIONS = 20;

interface Props {
  path?: string ;
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
}

export const Drawing: React.FC<Props> = ({
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
}) => {
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleResizeMouseMove}
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