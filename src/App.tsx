const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[60%] flex flex-col items-center">
        <canvas className="rounded-3xl w-full shadow-lg border border-gray-200"></canvas>
        <div className="flex w-full justify-between items-center mt-4 min-h-16 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default App;
