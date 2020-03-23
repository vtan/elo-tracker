import { useFakeData, fakeRatedGames, fakeDeletedGames } from "./FakeData"
import { NewGame, RatedGame, Game, GameId } from "./Game"
import { GroupId } from "./Group"

export const getGames = (groupId: GroupId): Promise<ReadonlyArray<RatedGame>> =>
  useFakeData
    ? Promise.resolve(fakeRatedGames)
    : fetch(`/api/games?groupId=${encodeURIComponent(groupId)}`).then(response => response.json())

export const getDeletedGames = (groupId: GroupId): Promise<ReadonlyArray<Game>> =>
  useFakeData
    ? Promise.resolve(fakeDeletedGames)
    : fetch(`/api/games/deleted?groupId=${encodeURIComponent(groupId)}`).then(response => response.json())

export const createGame = (newGame: NewGame): Promise<{}> =>
  useFakeData
    ? Promise.resolve({})
    : fetch("/api/games", post(newGame)).then(response => response.json())

export const updateGame = (gameId: GameId, newGame: NewGame): Promise<{}> =>
  useFakeData
    ? Promise.resolve({})
    : fetch(`/api/games/${gameId}`, put(newGame)).then(response => response.json())

const post = (body: any): RequestInit =>
  ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

const put = (body: any): RequestInit =>
  ({
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
