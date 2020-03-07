import { Action } from "./Action"
import { State, initialState } from "./State"

export const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "gamesFetched":
    case "gameCreated":
      return { ...state, games: action.games }
    default:
      return state
  }
}
