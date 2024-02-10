import { useState, useEffect, useRef } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startDrawing = (event: MouseEvent) => {
    setPressedMouse(true);
    setCoordinates({ x: event.clientX, y: event.clientY });
  };

  const drawLine = (event: MouseEvent) => {
    if (!pressedMouse) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const xM = event.clientX;
    const yM = event.clientY;
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
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startDrawingListener = (event: MouseEvent) => startDrawing(event);
    const drawLineListener = (event: MouseEvent) => drawLine(event);
    const stopDrawingListener = () => stopDrawing();
    const clearCanvasListener = (event: KeyboardEvent) => clearCanvas(event);

    canvas.addEventListener('mousedown', startDrawingListener);
    canvas.addEventListener('mousemove', drawLineListener);
    canvas.addEventListener('mouseup', stopDrawingListener);
    window.addEventListener('keydown', clearCanvasListener);

    return () => {
      canvas.removeEventListener('mousedown', startDrawingListener);
      canvas.removeEventListener('mousemove', drawLineListener);
      canvas.removeEventListener('mouseup', stopDrawingListener);
      window.removeEventListener('keydown', clearCanvasListener);
    };
  }, [startDrawing, drawLine, stopDrawing, clearCanvas]);

  return { canvasRef };
};

export default usePaint;
