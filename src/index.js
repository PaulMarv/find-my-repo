import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
// import App from "./App";
import store from "./redux/store/store";
import Login from "./login/login";

ReactDOM.render(
  <Provider store = {store}>
    <Login/>
    {/* <App /> */}
  </Provider>,
  document.getElementById("root")
);


