import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { beginStroke, endStroke, updateStroke } from "./actions";
import { clearCanvas, drawStroke } from "./canvasUtils";
import { ColorPanel } from "./ColorPanel";
import { EditPanel } from "./EditPanel";
import { strokesSelector } from "./selectors";
import { historyIndexSelector } from "./modules/historyIndex/selectors";
import { currentStrokeSelector } from "./modules/currentStroke/selectors";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentStroke = useSelector(currentStrokeSelector);
  const strokes = useSelector(strokesSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const dispatch = useDispatch();
  const isDrawing = !!currentStroke.points.length;
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") };
  };

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }
    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    );
  }, [currentStroke]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  });

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };
  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke());
    }
  };
  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke(offsetX, offsetY));
  };

  return (
    <>
      <EditPanel />
      <ColorPanel />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </>
  );
}

export default App;
