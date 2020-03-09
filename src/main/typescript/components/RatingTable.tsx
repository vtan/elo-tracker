import * as AppReducer from "./AppReducer"
import { formatDate } from "../Util"

import * as React from "react"

interface Props {
  dispatch: AppReducer.Dispatch,
  state: AppReducer.State
}

export function RatingTable({ dispatch, state }: Props) {
  const { games, selectedGameIndex, selectedGame } = state
  if (selectedGame === undefined) {
    return null
  }

  const ratings = React.useMemo(
    () => {
      const result = Object.entries(selectedGame.playerRatings)
      result.sort(([_player1, rating1], [_player2, rating2]) =>
        (rating2.rating - 2 * rating2.deviation) - (rating1.rating - 2 * rating1.deviation)
      )
      return result
    },
    [selectedGame]
  )

  return <div>
    <input type="range" min="0" max={games.length - 1}
      value={selectedGameIndex}
      onChange={ (e) => dispatch({ type: "gameSelected", index: parseInt(e.target.value) }) } />
    <p>
      Ratings after <strong>{selectedGame.game.player1}</strong>
      {' '}vs <strong>{selectedGame.game.player2}</strong>
      {' '}on { formatDate(selectedGame.game.playedAt) }
      {' '}<small>(95% confidence level)</small>
    </p>
    <table>
      <tbody>
        { ratings.map(([player, rating], index) =>
            <tr key={player}>
              <td>{ index + 1 }.</td>
              <td>
                <a className="player" onClick={ () => dispatch({ type: "playerToggled", player }) }>{player}</a>
              </td>
              <td>{rating.rating.toFixed(0)} ± {(2 * rating.deviation).toFixed(0)}</td>
            </tr>
        )}
      </tbody>
    </table>
  </div>
}
