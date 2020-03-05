import { Action } from "./Action"
import { calculateStats } from "./PlayerStats"
import { State, initialState } from "./State"

export const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "gamesFetched":
    case "gameCreated":
      return { ...state, games: action.games, playerStats: calculateStats(action.games) }
    default:
      return state
  }
}
