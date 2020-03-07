import * as Api from "./Api"
import { State, NewGame, RatedGame } from "./State"

import { ThunkAction } from "redux-thunk"

export type Action =
  { type: "gamesFetched", games: ReadonlyArray<RatedGame> }
  | { type: "gameCreated", games: ReadonlyArray<RatedGame> }

type Thunk<T> = ThunkAction<T, State, undefined, Action>

export const fetchGames = (): Thunk<void> =>
  dispatch => {
    Api.getGames().then(games => dispatch({ type: "gamesFetched", games }))
  }

export const createGame = (newGame: NewGame): Thunk<void> =>
  dispatch => {
    Api.createGame(newGame).then(_ =>
      Api.getGames().then(games =>
        dispatch({ type: "gameCreated", games })
      )
    )
  }
