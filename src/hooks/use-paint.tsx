import { useState, useEffect, useRef } from 'react';

interface Canvas {
  width?: number;
  height?: number;
  bgColor?: string;
}

interface Pencil {
  color?: string;
  width?: number;
}

interface UsePaint {
  canvas?: Canvas;
  pencil?: Pencil;
}

const defaultWidth = 800;
const defaultHeight = defaultWidth / 1.77; // 16:9

const usePaint = (props?: UsePaint) => {
  const { pencil } = props || {};
  const [pressedMouse, setPressedMouse] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [colorLine] = useState(pencil?.color || '#000');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startDrawing = (event: MouseEvent) => {
    setPressedMouse(true);
    setCoordinates({
      x: event.clientX - (canvasRef.current?.offsetLeft || 0),

      y: event.clientY - (canvasRef.current?.offsetTop || 0),
    });
  };

  const drawLine = (event: MouseEvent) => {
    if (!pressedMouse) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const xM = event.clientX - (canvas.offsetLeft || 0);
    const yM = event.clientY - (canvas.offsetTop || 0);
    ctx.beginPath();
    ctx.strokeStyle = colorLine;
    ctx.lineWidth = pencil?.width || 5;
    ctx.lineCap = 'round';
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

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = props?.canvas?.width || defaultWidth;
    canvas.height = props?.canvas?.height || defaultHeight;
    canvas.style.backgroundColor = props?.canvas?.bgColor || '#fff';
  }, []);

  return { canvasRef };
};

export default usePaint;
