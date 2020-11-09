import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/app.scss";
import configStore from "./store"
const store = configStore()


const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById("root"));
serviceWorker.unregister();
