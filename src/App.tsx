import usePaint from './hooks/use-paint';

const App = () => {
  const { canvasRef } = usePaint({
    pencil: { width: 10, color: 'blue' },
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[60%] flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="rounded-3xl shadow-lg border border-gray-200"
          width={800}
          height={450}
        ></canvas>
        <div className="flex w-full justify-between items-center mt-4 min-h-16 rounded-full shadow-lg border"></div>
      </div>
    </div>
  );
};

export default App;
