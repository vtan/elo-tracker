import * as Api from "../Api"
import { RatedGame, NewGame } from "../Game"

export interface State {
  games: ReadonlyArray<RatedGame>,
  selectedGameIndex: number,
  selectedGame?: RatedGame
}

export const initialState: State = {
  games: [],
  selectedGameIndex: 0
}

export type Action =
  { type: "gamesFetched", games: ReadonlyArray<RatedGame> }
  | { type: "gameCreated", games: ReadonlyArray<RatedGame> }
  | { type: "gameSelected", index: number }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "gamesFetched":
    case "gameCreated":
      if (action.games.length > 0) {
        const selectedGameIndex = action.games.length - 1
        return {
          ...state,
          games: action.games,
          selectedGameIndex,
          selectedGame: action.games[selectedGameIndex]
        }
      } else {
        return { ...state, games: action.games }
      }
    case "gameSelected":
      return {
        ...state,
        selectedGameIndex: action.index,
        selectedGame: state.games[action.index]
      }
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
