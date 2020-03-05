import { Game, NewGame } from "./State"

export const getGames = (): Promise<ReadonlyArray<Game>> =>
  fetch("/api/games").then(response => response.json())

export const createTask = (newGame: NewGame): Promise<{}> =>
  fetch("/api/games", post(newGame)).then(response => response.json())

const post = (body: any): RequestInit =>
  ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
