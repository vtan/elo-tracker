import * as AppReducer from "./AppReducer"
import { DarkGameCell, LightGameCell } from "./GameCell"
import { LinkButton } from "./LinkButton"
import { Game } from "../Game"
import { formatDate } from "../Util"

import * as React from "react"

interface Props {
  dispatch: AppReducer.Dispatch,
  deletedGames: ReadonlyArray<Game>
}

export function DeletedGamesTable({ dispatch, deletedGames }: Props) {
  return <div>
    <table>
      <tbody>
        { deletedGames.map(game =>
            <tr key={game.id}>
              <td>{ formatDate(game.playedAt) }</td>
              <DarkGameCell >{game.player1}</DarkGameCell>
              <DarkGameCell style={{textAlign: "right"}}><strong>{game.score1}</strong></DarkGameCell>
              <LightGameCell><strong>{game.score2}</strong></LightGameCell>
              <LightGameCell>{game.player2}</LightGameCell>
              <td><LinkButton onClick={ () => AppReducer.undeleteGame(dispatch, game) }>↩</LinkButton></td>
            </tr>
        ) }
      </tbody>
    </table>
  </div>
}
