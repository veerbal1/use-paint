import usePaint from './hooks/use-paint';

const App = () => {
  const { canvasRef } = usePaint({
    pencil: { width: 10, color: '#484538' },
    canvas: {
      // bgColor: '#D4EAC8',
      bgColor: '#fff',
    },
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[60%] flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="rounded-3xl shadow-lg border border-gray-200"
        ></canvas>
        <div className=" relative flex w-full justify-center gap-4 items-center min-h-16 mt-[7rem] max-h-16 rounded-full shadow-lg border">
          {[
            '#e63946',
            '#8338ec',
            '#a8dadc',
            '#457b9d',
            '#1d3557',
            '#ff006e',
          ].map((color) => (
            <Pencil color={color} />
          ))}
          <div className="w-full h-full absolute bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const Pencil = ({ color }: { color: string }) => {
  return (
    <div className="w-10 rotate-[136deg] transition-transform translate-y-[-4.95rem] hover:translate-y-[-5.95rem] cursor-pointer skew-x-12">
      <svg
        fill={color}
        height="100px"
        width="100px"
        className='scale-125 transform transition-transform hover:scale-150 pointer-events-none'
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 31.982 31.982"
        xml:space="preserve"
      >
        <g>
          <path
            d="M3.952,23.15L0,31.955l8.767-3.992l0.018,0.019L3.938,23.13L3.952,23.15z M4.602,22.463L24.634,2.432l4.849,4.848
     L9.45,27.312L4.602,22.463z M30.883,0.941c-2.104-1.963-4.488-0.156-4.488-0.156l4.851,4.843
     C31.244,5.627,33.124,3.375,30.883,0.941z"
          />
        </g>
      </svg>
    </div>
  );
};

export default App;
