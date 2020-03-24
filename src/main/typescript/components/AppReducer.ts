import * as Api from "../Api"
import { RatedGame, NewGame, Game } from "../Game"
import { Group, GroupId } from "../Group"

export interface State {
  groups: ReadonlyArray<Group>,
  openGroup?: Group,
  games: ReadonlyArray<RatedGame>,
  deletedGames: ReadonlyArray<Game>,
  selectedGameIndex: number,
  selectedGame?: RatedGame,
  selectedPlayer?: string,
  showAddForm: boolean
}

export const initialState: State = {
  groups: [],
  games: [],
  deletedGames: [],
  selectedGameIndex: 0,
  showAddForm: false
}

export type Action =
  { type: "groupsFetched", groups: ReadonlyArray<Group> }
  | { type: "groupOpened", group: Group }
  | { type: "groupClosed" }
  | { type: "gamesFetched", games: ReadonlyArray<RatedGame> }
  | { type: "deletedGamesFetched", deletedGames: ReadonlyArray<Game> }
  | { type: "gameSelected", index: number }
  | { type: "playerToggled", player: string }
  | { type: "showAddForm", visible: boolean }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "groupsFetched":
      return { ...state, groups: action.groups }
    case "groupOpened":
      return { ...state, openGroup: action.group }
    case "groupClosed":
      return { ...initialState, groups: state.groups }
    case "gamesFetched":
      if (action.games.length > 0) {
        const selectedGameIndex = action.games.length - 1
        return {
          ...state,
          games: action.games,
          selectedGameIndex,
          selectedGame: action.games[selectedGameIndex]
        }
      } else {
        return { ...state, games: action.games }
      }
    case "deletedGamesFetched":
      return { ...state, deletedGames: action.deletedGames }
    case "gameSelected":
      return {
        ...state,
        selectedGameIndex: action.index,
        selectedGame: state.games[action.index]
      }
    case "playerToggled":
      const selectedPlayer = state.selectedPlayer === action.player ? undefined : action.player
      return { ...state, selectedPlayer }
    case "showAddForm":
      return { ...state, showAddForm: action.visible }
  }
}

export type Dispatch = (_: Action) => void

export function fetchGroups(dispatch: Dispatch): void {
  Api.getGroups().then(groups => dispatch({ type: "groupsFetched", groups }))
}

export function fetchGames(dispatch: Dispatch, groupId: GroupId): void {
  Api.getGames(groupId).then(games => dispatch({ type: "gamesFetched", games }))
}

export function fetchDeletedGames(dispatch: Dispatch, groupId: GroupId): void {
  Api.getDeletedGames(groupId).then(deletedGames => dispatch({ type: "deletedGamesFetched", deletedGames }))
}

export function createGame(dispatch: Dispatch, newGame: NewGame): void {
  Api.createGame(newGame).then(_ => fetchGames(dispatch, newGame.groupId))
}

export function deleteGame(dispatch: Dispatch, game: Game): void {
  const deletedGame = { ...game, isDeleted: true }
  Api.updateGame(game.id, deletedGame).then(_ =>
    Promise.all([fetchGames(dispatch, game.groupId), fetchDeletedGames(dispatch, game.groupId)])
  )
}

export function undeleteGame(dispatch: Dispatch, game: Game): void {
  const deletedGame = { ...game, isDeleted: false }
  Api.updateGame(game.id, deletedGame).then(_ =>
    Promise.all([fetchGames(dispatch, game.groupId), fetchDeletedGames(dispatch, game.groupId)])
  )
}
