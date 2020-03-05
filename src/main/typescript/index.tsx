import { Action, fetchGames } from "./Action"
import { App } from "./components/App"
import { rootReducer } from "./Reducer"
import { State } from "./State"

import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { ThunkMiddleware } from "redux-thunk"

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<State, Action>))
store.dispatch(fetchGames())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
