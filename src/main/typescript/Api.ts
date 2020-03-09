import { useFakeData, fakeRatedGames } from "./FakeData"
import { NewGame, RatedGame } from "./Game"

export const getGames = (): Promise<ReadonlyArray<RatedGame>> =>
  useFakeData
    ? Promise.resolve(fakeRatedGames)
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
