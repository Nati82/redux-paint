export type RootState = {
  currentStroke: Stroke;
  strokes: Stroke[];
  historyIndex: number;
  poppedStrokes: Stroke[];
};

export type Stroke = {
  points: Point[];
  color: string;
};

export type Point = {
  x: number;
  y: number;
};
