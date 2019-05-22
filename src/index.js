import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import HomePage from "./views/HomePage";
import store from "./redux/store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  rootElement
);
