export interface State extends GamesWithRatings {}

export const initialState: State = {
  games: [],
  ratingsAfterGames: []
}

export interface GamesWithRatings {
  games: ReadonlyArray<Game>,
  ratingsAfterGames: ReadonlyArray<{ playerRatings: Record<string, Rating> }>
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

export interface Rating {
  rating: number,
  deviation: number
}
