import * as AppReducer from "./AppReducer"
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
              <td className={"darkColumn" + (game.score1 > game.score2 ? " winner" : "")}>{game.player1}</td>
              <td className="darkColumn" style={{textAlign: "right"}}><strong>{game.score1}</strong></td>
              <td className="lightColumn"><strong>{game.score2}</strong></td>
              <td className={"lightColumn" + (game.score2 > game.score1 ? " winner" : "")}>{game.player2}</td>
              <td><LinkButton onClick={ () => AppReducer.undeleteGame(dispatch, game) }>↩</LinkButton></td>
            </tr>
        ) }
      </tbody>
    </table>
  </div>
}
