import { NewGame, GamesWithRatings } from "./State"
import { useFakeData, fakeGamesWithRatings } from "./FakeData"

export const getGames = (): Promise<GamesWithRatings> =>
  useFakeData
    ? Promise.resolve(fakeGamesWithRatings)
    : fetch("/api/games").then(response => response.json())

export const createGame = (newGame: NewGame): Promise<{}> =>
  useFakeData
    ? Promise.resolve({})
    : fetch("/api/games", post(newGame)).then(response => response.json())

const post = (body: any): RequestInit =>
  ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
