import React from "react"
import { render } from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import {createStore, compose} from 'redux'
import { rootReducer } from "./redux/rootReducer"
import {Provider} from 'react-redux'
const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())) 

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
)

render(
  app,
  document.getElementById("root")
);
serviceWorker.unregister();
