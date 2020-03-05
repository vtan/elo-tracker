import * as Api from "./Api"
import { State, Game, NewGame } from "./State"

import { ThunkAction } from "redux-thunk"

export type Action =
  { type: "gamesFetched", games: ReadonlyArray<Game> }
  | { type: "gameCreated", games: ReadonlyArray<Game> }

type Thunk<T> = ThunkAction<T, State, undefined, Action>

export const fetchGames = (): Thunk<void> =>
  dispatch => {
    Api.getGames().then(games => dispatch({ type: "gamesFetched", games }))
  }

export const createGame = (newGame: NewGame): Thunk<void> =>
  dispatch => {
    Api.createTask(newGame).then(_ =>
      Api.getGames().then(games =>
        dispatch({ type: "gameCreated", games })
      )
    )
  }
