import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "./_reducers";

const createStoreMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider
    store={createStoreMiddleware(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
);
