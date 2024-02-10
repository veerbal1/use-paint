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
const defaultHeight = defaultWidth / 1.77; // 16:9 aspect ratio

const usePaint = (props?: UsePaint) => {
  const { pencil } = props || {};
  const [pressedMouse, setPressedMouse] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [colorLine, setColorLine] = useState(pencil?.color || '#000');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Function to start drawing on the canvas
  const startDrawing = (event: MouseEvent) => {
    setPressedMouse(true);
    setCoordinates({
      x: event.clientX - (canvasRef.current?.offsetLeft || 0),
      y: event.clientY - (canvasRef.current?.offsetTop || 0),
    });
  };

  // Function to set the color of the pencil
  const setPencilColor = (color: string) => {
    setColorLine(color);
  };

  // Function to draw a line on the canvas
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

  // Function to stop drawing on the canvas
  const stopDrawing = () => {
    setPressedMouse(false);
  };

  // Function to clear the canvas when 'c' key is pressed
  const clearCanvas = (event: KeyboardEvent) => {
    if (event.key === 'c') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = props?.canvas?.bgColor || '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Event listeners for mouse and keyboard events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

  // Set canvas size and background color
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = props?.canvas?.width || defaultWidth;
    canvas.height = props?.canvas?.height || defaultHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = props?.canvas?.bgColor || '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return { canvasRef, setPencilColor, selectedPencilColor: colorLine };
};

export default usePaint;
