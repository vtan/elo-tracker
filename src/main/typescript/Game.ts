import { GroupId } from "./Group"

export type GameId = string

export interface NewGame {
  groupId: GroupId,
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

export interface RatingRange {
  min: number,
  max: number,
  radius: number,
  length: number
}

export function ratingRange(
  { rating, deviation }: Rating,
  multiplier: number = 1.5
): RatingRange {
  const radius = multiplier * deviation
  return {
    radius,
    min: rating - radius,
    max: rating + radius,
    length: 2 * radius
  }
}
