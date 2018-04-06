import React from "react"
import { render } from "react-dom"
import { ConnectedRouter } from "react-router-redux"
import store, { history } from "./store"
import App from "./App"

import "sanitize.css/sanitize.css"
import "./index.css"
import "rc-slider/assets/index.css"

import { Provider } from "react-redux"

const target = document.querySelector("#root")

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
)
