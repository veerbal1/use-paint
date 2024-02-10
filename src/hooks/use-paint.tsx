import { useEffect, useRef, useState } from 'react';

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

const getCoordinates = (event: MouseEvent, canvas: HTMLCanvasElement) => {
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  return { x, y };
};

function usePaint(props?: UsePaint) {
  const {
    width = defaultWidth,
    height = defaultHeight,
    bgColor = 'white',
  } = props?.canvas || {};
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [isPainting, setIsPainting] = useState(false);

  const eventListeners = [
    {
      name: 'mousedown',
      handler: function onMouseDown(event: MouseEvent) {
        const canvas = canvasRef.current;
        if (canvas) {
          const { x, y } = getCoordinates(event, canvas);
          setCoordinates({ x, y });
          setIsPainting(true);
        }
      },
    },
    {
      name: 'mousemove',
      handler: function onMouseMove(event: MouseEvent) {
        const canvas = canvasRef.current;
        if (canvas) {
          const { x, y } = getCoordinates(event, canvas);
          setCoordinates({ x, y });
        }
      },
    },
    {
      name: 'mouseup',
      handler: function onMouseUp(event: MouseEvent) {
        const canvas = canvasRef.current;
        if (canvas) {
          const { x, y } = getCoordinates(event, canvas);
          setCoordinates({ x, y });
          setIsPainting(false);
        }
      },
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      eventListeners.forEach(({ name, handler }) => {
        canvas.addEventListener(name, handler as EventListener);
      });
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, width, height);
        contextRef.current = context;
      }
    }
    return () => {
      eventListeners.forEach(({ name, handler }) => {
        canvas?.removeEventListener(name, handler as EventListener);
      });
    };
  }, []);

  useEffect(() => {
    if (isPainting) {
      console.log('coordinates', coordinates);
    }
  }, [coordinates.x, coordinates.y, isPainting]);

  return { canvasRef };
}

export default usePaint;
