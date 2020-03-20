export type GameId = string

export interface NewGame {
  player1: string,
  player2: string,
  score1: number,
  score2: number,
  isDeleted: boolean
}

export interface Game extends NewGame {
  id: GameId,
  playedAt: string
}

export interface Rating {
  rating: number,
  deviation: number
}

export interface RatedGame {
  game: Game,
  playerRatings: Record<string, Rating>
}
