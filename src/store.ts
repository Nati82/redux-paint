import { rootReducer } from "./rootReducer";
import { composeWithDevTools, devToolsEnhancer } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
// import { configureStore } from "redux"

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
