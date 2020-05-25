import React from "react"
import { render } from "react-dom"
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { rootReducer } from "./redux/rootReducer"

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )) 

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
