import React, { useState, createRef, useEffect } from 'react';
import { Modal, Button, Menu, Dropdown, Label,Icon } from 'semantic-ui-react';
import { Color } from '../../entities';
import styled from 'styled-components';

interface Props {
  open: boolean;
  dismiss: () => void;
  confirm: (drawing?: {
    width: number;
    height: number;
    path: string;
    strokeWidth: number;
    stroke: string;
  }) => void;
  drawing?: DrawingAttachment;
}

export const DrawingModal = ({ open, dismiss, confirm, drawing }: Props) => {
  const svgRef = createRef<SVGSVGElement>();
  const [paths, setPaths] = useState<Array<[string, number, number]>>([]);
  const [path, setPath] = useState((drawing && drawing.path) || '');
  const [svgX, setSvgX] = useState(0);
  const [svgY, setSvgY] = useState(0);
  const [minX, setMinX] = useState(Infinity);
  const [maxX, setMaxX] = useState(0);
  const [minY, setMinY] = useState(Infinity);
  const [maxY, setMaxY] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [stroke, setStroke] = useState(Color.BLACK);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const { x, y } = svg.getBoundingClientRect();
    setSvgX(x);
    setSvgY(y);
  }, [svgRef]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(true);

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `M${x},${y}`);
    setPaths([...paths, ['M', x, y]]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!mouseDown) return;

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `L${x},${y}`);
    setPaths([...paths, ['L', x, y]]);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(false);
  };

  const resetDrawingBoard = () => {
    setPaths([]);
    setPath('');
    setMinX(Infinity);
    setMaxX(0);
    setMinY(Infinity);
    setMaxY(0);
    setStrokeWidth(3);
    setStroke(Color.BLACK);
  };

  const handleDone = () => {
    if (!paths.length) {
      confirm();
      return;
    }

    const boundingWidth = maxX - minX;
    const boundingHeight = maxY - minY;

    const dx = -(minX - 10);
    const dy = -(minY - 10);

    confirm({
      stroke,
      strokeWidth,
      width: boundingWidth + 20,
      height: boundingHeight + 20,
      path: paths.reduce(
        (fullPath, lineItem) =>
          `${fullPath}${lineItem[0]}${lineItem[1] + dx}, ${lineItem[2] + dy}`,
        ''
      ),
    });

    closeModal();
  };

  const closeModal = () => {
    resetDrawingBoard();
    dismiss();
  };

  return (
    <Modal size="small" dimmer="inverted" open={open} onClose={closeModal}>
      <Modal.Header>서명하기</Modal.Header>
      <Modal.Content>
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: '1px solid #000', height: '40vh', textAlign: 'center', lineHeight: '40vh', position: 'relative' }}
        >
          <svg
            ref={svgRef}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <path
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke={stroke}
              fill="none"
              d={path}
            />
          </svg>
          {path === '' && (
            <span style={{ color: '#ccc', fontSize: '1.5em' }}>
              이곳에 서명해주세요
            </span>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions style={{ justifyContent: 'space-between' }}>
        <Button style = {{ backgroundColor: 'white', color: '#141f7b', border: '1px solid #141f7b'}} onClick={resetDrawingBoard}>
          다시 서명하기
        </Button>
        <Button style = {{ backgroundColor: '#141f7b', color: 'white'}}  onClick={handleDone}>
          삽입하기
        </Button>
      </Modal.Actions>
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        본인의 서명이 법적 효력이 있음을 인정합니다.
      </div>
    </Modal>
  );
};