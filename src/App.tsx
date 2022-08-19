import React, { useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = () => {};
  const endDrawing = () => {};
  const draw = () => {};

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}

export default App;
