import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import AppReducer from "./reducers";

export default createStore(AppReducer, applyMiddleware(thunk, promise));
