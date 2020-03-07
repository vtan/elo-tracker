import * as Api from "./Api"
import { State, NewGame, GamesWithRatings } from "./State"

import { ThunkAction } from "redux-thunk"

export type Action =
  { type: "gamesFetched", gamesWithRatings: GamesWithRatings }
  | { type: "gameCreated", gamesWithRatings: GamesWithRatings }

type Thunk<T> = ThunkAction<T, State, undefined, Action>

export const fetchGames = (): Thunk<void> =>
  dispatch => {
    Api.getGames().then(gamesWithRatings => dispatch({ type: "gamesFetched", gamesWithRatings }))
  }

export const createGame = (newGame: NewGame): Thunk<void> =>
  dispatch => {
    Api.createGame(newGame).then(_ =>
      Api.getGames().then(gamesWithRatings =>
        dispatch({ type: "gameCreated", gamesWithRatings })
      )
    )
  }
