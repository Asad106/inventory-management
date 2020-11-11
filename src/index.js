/** @format */

import React from "react";
import ReactDOM from "react-dom";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";

import "./index.css";
import App from "./App";
import fbConfig from "./config/fbConfig";

const loggerMiddleware = createLogger();

const reduxStore = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase, getFirestore }),
      loggerMiddleware
    ),
    reactReduxFirebase(fbConfig),
    reduxFirestore(fbConfig)
  )
);
ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
