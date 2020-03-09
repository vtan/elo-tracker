import * as AppReducer from "./AppReducer"
import { NewGameForm } from "./NewGameForm"

import * as React from "react"

const formatDate = (isoDateTime: string): string =>
  isoDateTime.split("T")[0]

export function App() {
  const [state, dispatch] = React.useReducer(AppReducer.reducer, AppReducer.initialState)
  const { selectedGame, selectedGameIndex } = state

  const [selectedPlayer, setSelectedPlayer] = React.useState<string | undefined>()
  const togglePlayerSelection = (player: string) =>
    setSelectedPlayer(p => p === player ? undefined : player)

  React.useEffect(
    () => AppReducer.fetchGames(dispatch),
    []
  )

  const ratings = selectedGame === undefined
    ? []
    : Object.entries(selectedGame.playerRatings)
  ratings.sort(([_player1, rating1], [_player2, rating2]) =>
    (rating2.rating - 2 * rating2.deviation) - (rating1.rating - 2 * rating1.deviation)
  )

  return <div>
    <NewGameForm dispatch={dispatch} />
    <hr />
    { selectedGame === undefined
        ? ""
        : <div>
            <input type="range" min="0" max={state.games.length - 1}
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
                        <a className="player" onClick={ () => togglePlayerSelection(player) }>{player}</a>
                      </td>
                      <td>{rating.rating.toFixed(0)} ± {(2 * rating.deviation).toFixed(0)}</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
    }
    <hr />
    <div>
      <table>
        <tbody>
          { state.games.map((ratedGame, index) => {
              const game = ratedGame.game
              const ratings = ratedGame.playerRatings
              const previousRatings = index === 0 ? {} : state.games[index - 1].playerRatings
              const rating1 = ratings[game.player1].rating
              const rating2 = ratings[game.player2].rating
              const ratingDiff1 = rating1 - (previousRatings[game.player1] || { rating: 1500 }).rating
              const ratingDiff2 = rating2 - (previousRatings[game.player2] || { rating: 1500 }).rating
              const signumToSymbol = (x: number) => x < 0 ? "↘" : "↗"
              const selected = game.player1 === selectedPlayer || game.player2 === selectedPlayer
              return <tr key={game.playedAt} className={selected ? "selectedRow" : ""}>
                <td>{ formatDate(game.playedAt) }</td>
                <td className={"darkColumn" + (game.score1 > game.score2 ? " winner" : "")}>
                  <a className="player" onClick={ () => togglePlayerSelection(game.player1) }>{game.player1}</a>
                </td>
                <td className="darkColumn">{rating1.toFixed(0)} {signumToSymbol(ratingDiff1)}{Math.abs(ratingDiff1).toFixed(0)}</td>
                <td className="darkColumn" style={{textAlign: "right"}}><strong>{game.score1}</strong></td>
                <td className="lightColumn"><strong>{game.score2}</strong></td>
                <td className="lightColumn">{rating2.toFixed(0)} {signumToSymbol(ratingDiff2)}{Math.abs(ratingDiff2).toFixed(0)}</td>
                <td className={"lightColumn" + (game.score2 > game.score1 ? " winner" : "")}>
                  <a className="player" onClick={ () => togglePlayerSelection(game.player2) }>{game.player2}</a>
                </td>
              </tr>
          } ) }
        </tbody>
      </table>
    </div>
  </div>
}
