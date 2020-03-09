import * as AppReducer from "./AppReducer"
import { GameTable } from "./GameTable"
import { NewGameForm } from "./NewGameForm"
import { RatingTable } from "./RatingTable"

import * as React from "react"

export function App() {
  const [state, dispatch] = React.useReducer(AppReducer.reducer, AppReducer.initialState)

  React.useEffect(
    () => AppReducer.fetchGames(dispatch),
    []
  )

  return <div>
    <NewGameForm dispatch={dispatch} />
    <hr />
    <RatingTable dispatch={dispatch} state={state} />
    <hr />
    <GameTable dispatch={dispatch} state={state} />
  </div>
}
