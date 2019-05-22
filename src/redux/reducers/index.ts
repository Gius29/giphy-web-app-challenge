import { combineReducers } from "redux";
import { homePageReducer } from "./homePageReducer";

const AppReducer = combineReducers({ homePage: homePageReducer });

export default AppReducer;
