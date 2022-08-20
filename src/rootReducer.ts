import { RootState } from "./types";
import {
  Action,
  BEGIN_STROKE,
  END_STROKE,
  REDO,
  SET_STROKE_COLOR,
  UNDO,
  UPDATE_STROKE,
} from "./actions";

const initialState: RootState = {
  currentStroke: { points: [], color: "#000" },
  strokes: [],
  historyIndex: 0,
  poppedStrokes: [],
};

export const rootReducer = (
  state: RootState = initialState,
  action: Action
) => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      };
    }
    case UPDATE_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        },
      };
    }
    case END_STROKE: {
      if (!state.currentStroke.points.length) {
        return state;
      }
      return {
        ...state,
        currentStroke: { ...state.currentStroke, points: [] },
        strokes: [...state.strokes, state.currentStroke],
        poppedStrokes: []
      };
    }
    case SET_STROKE_COLOR: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          ...{ color: action.payload },
        },
      };
    }
    case UNDO: {
      if (!state.strokes.length) {
        return state;
      }
      return {
        ...state,
        poppedStrokes: [...state.poppedStrokes, state.strokes.pop()!],
        strokes: [...state.strokes],
      };
    }
    case REDO: {
      if (!state.poppedStrokes.length) {
        return state;
      }
      return {
        ...state,
        strokes: [...state.strokes, state.poppedStrokes.pop()!],
        poppedStrokes: [...state.poppedStrokes],
      };
    }
    default:
      return state;
  }
};
