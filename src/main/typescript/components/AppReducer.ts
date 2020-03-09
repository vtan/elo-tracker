import * as Api from "../Api"
import { RatedGame, NewGame } from "../Game"

export interface State {
  games: ReadonlyArray<RatedGame>
}

export const initialState: State = {
  games: []
}

export type Action =
  { "type": "gamesFetched", "games": ReadonlyArray<RatedGame> }
  | { "type": "gameCreated", "games": ReadonlyArray<RatedGame> }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "gamesFetched":
    case "gameCreated":
      return { ...state, games: action.games }
  }
}

export type Dispatch = (_: Action) => void

export function fetchGames(dispatch: Dispatch): void {
  Api.getGames().then(games => dispatch({ type: "gamesFetched", games }))
}

export function createGame(dispatch: Dispatch, newGame: NewGame): void {
  Api.createGame(newGame).then(_ =>
    Api.getGames().then(games =>
      dispatch({ type: "gameCreated", games })
    )
  )
}
