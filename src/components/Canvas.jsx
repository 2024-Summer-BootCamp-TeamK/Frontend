import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: auto;
  background-color: #fff;
  font-family: var(--font);
  border-radius: 16px;
  font-size: 15px;
  overflow: hidden;
  color: #455963;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
  view-transition-name: app;
`;

const CanvasElement = styled.canvas`
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin: 5px;
`;

const Canvas = ({ onSave, onClear }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "#000";
  }, []);

  const startDrawing = (event) => {
    setIsDrawing(true);
    draw(event);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
  };

  const draw = (event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    onClear();
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
  };

  return (
    <CanvasContainer>
      <CanvasElement
        ref={canvasRef}
        width="500"
        height="300"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
      <Button onClick={clearCanvas}>지우기</Button>
      <Button onClick={saveSignature}>삽입</Button>
    </CanvasContainer>
  );
};

export default Canvas;
