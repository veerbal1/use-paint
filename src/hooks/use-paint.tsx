import React, { useState, useEffect, useRef } from 'react';

interface Canvas {
  width?: number;
  height?: number;
  bgColor?: string;
}

interface UsePaint {
  canvas?: Canvas;
}

const defaultWidth = 800;
const defaultHeight = defaultWidth / 1.77; // 16:9

const usePaint = (props?: UsePaint) => {
  const [pressedMouse, setPressedMouse] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [colorLine] = useState('#9ACD32');
  const canvasRef = useRef(null);

  const startDrawing = (event: MouseEvent) => {
    setPressedMouse(true);
    setCoordinates({ x: event.offsetX, y: event.offsetY });
  };

  const drawLine = (event: MouseEvent) => {
    if (!pressedMouse) return;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext('2d');
    const xM = event.offsetX;
    const yM = event.offsetY;
    ctx.beginPath();
    ctx.strokeStyle = colorLine;
    ctx.lineWidth = 2;
    ctx.moveTo(coordinates.x, coordinates.y);
    ctx.lineTo(xM, yM);
    ctx.stroke();
    ctx.closePath();
    setCoordinates({ x: xM, y: yM });
  };

  const stopDrawing = () => {
    setPressedMouse(false);
  };

  const clearCanvas = (event: KeyboardEvent) => {
    if (event.key === 'c') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', drawLine);
    canvas.addEventListener('mouseup', stopDrawing);
    window.addEventListener('keydown', clearCanvas);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', drawLine);
      canvas.removeEventListener('mouseup', stopDrawing);
      window.removeEventListener('keydown', clearCanvas);
    };
  }, [startDrawing, drawLine, stopDrawing, clearCanvas]);

  return { canvasRef };
};

export default usePaint;
