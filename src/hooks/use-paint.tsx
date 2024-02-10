import { useEffect, useRef } from 'react';

interface Canvas {
  width?: number;
  height?: number;
  bgColor?: string;
}

interface UsePaint {
  canvas?: Canvas;
}

const defaultWidth = 800;
const defaultHeight = defaultWidth / 1.77;

function usePaint(props?: UsePaint) {
  const { width = defaultWidth, height = defaultHeight, bgColor = 'white' } = props?.canvas || {};
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, width, height);
      }
    }
  }, []);

  return { canvasRef };
}

export default usePaint;
