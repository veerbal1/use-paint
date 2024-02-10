import { useEffect, useRef } from 'react';

function usePaint({
  canvas: { width = 400, height = 400, bgColor = 'white' },
}) {
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
