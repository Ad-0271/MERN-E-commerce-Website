import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

let initState = {};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);
