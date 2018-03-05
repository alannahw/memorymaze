import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./js/containers/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./js/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
