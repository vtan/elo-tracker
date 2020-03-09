import * as AppReducer from "./AppReducer"
import { formatDate } from "../Util"

import * as React from "react"

interface Props {
  dispatch: AppReducer.Dispatch,
  state: AppReducer.State
}

export function GameTable({ dispatch, state }: Props) {
  const { games, selectedPlayer } = state

  return <div>
    <table>
      <tbody>
        { games.map((ratedGame, index) => {
            const game = ratedGame.game
            const ratings = ratedGame.playerRatings
            const previousRatings = index === 0 ? {} : games[index - 1].playerRatings
            const rating1 = ratings[game.player1].rating
            const rating2 = ratings[game.player2].rating
            const ratingDiff1 = rating1 - (previousRatings[game.player1] || { rating: 1500 }).rating
            const ratingDiff2 = rating2 - (previousRatings[game.player2] || { rating: 1500 }).rating
            const signumToSymbol = (x: number) => x < 0 ? "↘" : "↗"
            const selected = game.player1 === selectedPlayer || game.player2 === selectedPlayer
            return <tr key={game.playedAt} className={selected ? "selectedRow" : ""}>
              <td>{ formatDate(game.playedAt) }</td>
              <td className={"darkColumn" + (game.score1 > game.score2 ? " winner" : "")}>
                <a
                  className="player"
                  onClick={ () => dispatch({ type: "playerToggled", player: game.player1 }) }>
                    {game.player1}
                </a>
              </td>
              <td className="darkColumn">{rating1.toFixed(0)} {signumToSymbol(ratingDiff1)}{Math.abs(ratingDiff1).toFixed(0)}</td>
              <td className="darkColumn" style={{textAlign: "right"}}><strong>{game.score1}</strong></td>
              <td className="lightColumn"><strong>{game.score2}</strong></td>
              <td className="lightColumn">{rating2.toFixed(0)} {signumToSymbol(ratingDiff2)}{Math.abs(ratingDiff2).toFixed(0)}</td>
              <td className={"lightColumn" + (game.score2 > game.score1 ? " winner" : "")}>
                <a
                  className="player"
                  onClick={ () => dispatch({ type: "playerToggled", player: game.player2 }) }>
                    {game.player2}
                </a>
              </td>
            </tr>
        } ) }
      </tbody>
    </table>
  </div>
}
