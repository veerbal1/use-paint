import usePaint from './hooks/use-paint';

const App = () => {
  const { canvasRef, setPencilColor, selectedPencilColor } = usePaint({
    pencil: { width: 10, color: '#e63946' },
    canvas: {
      // bgColor: '#D4EAC8',
      bgColor: '#fff',
    },
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      {/* <h1 className="font-sans text-5xl absolute left-10 rotate-[-10deg]">@Veerbal01</h1> */}
      <div className="w-[60%] flex flex-col items-center pointer-events-none">
        <canvas
          ref={canvasRef}
          className="rounded-3xl shadow-lg border border-gray-200 pointer-events-auto"
        ></canvas>
        <div className=" relative flex w-[50%] justify-center gap-4 items-center min-h-16 mt-[7rem] max-h-16 rounded-full shadow-lg border pointer-events-auto pb-16">
          {[
            '#e63946',
            '#8338ec',
            '#a8dadc',
            '#457b9d',
            '#1d3557',
            '#ff006e',
          ].map((color) => (
            <Pencil
              color={color}
              onClick={() => setPencilColor(color)}
              selected={selectedPencilColor === color}
            />
          ))}
          <div className="w-full h-full absolute bg-white rounded-full bottom-0 flex items-center justify-center">
            <h1 className="text-muted-foreground text-lg">
              Press{' '}
              <code className="rounded-sm border p-2 text-black border-black">
                C
              </code>{' '}
              to clear the canvas
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pencil = ({
  color,
  onClick,
  selected,
}: {
  color: string;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <div
      role="button"
      className={`w-10  transition-transform hover:translate-y-[-1.95rem] cursor-pointer drop-shadow-sm ${
        selected ? 'translate-y-[-1.95rem]' : ''
      }`}
      onClick={onClick}
    >
      <svg
        width="50"
        height="100"
        viewBox="0 0 50 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="15,50 25,0 35,50" fill={color} />

        <polygon points="24,0 25,0 26,0" fill={color} />

        <rect x="15" y="50" width="20" height="50" fill={color} />
      </svg>
    </div>
  );
};

export default App;
