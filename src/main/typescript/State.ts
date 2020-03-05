import { PlayerStats } from "./PlayerStats"

export interface State {
  games: ReadonlyArray<Game>,
  playerStats: ReadonlyArray<PlayerStats>
}

export const initialState: State = {
  games: [],
  playerStats: []
}

export interface NewGame {
  player1: string,
  player2: string,
  score1: number,
  score2: number
}

export interface Game extends NewGame {
  playedAt: string
}
