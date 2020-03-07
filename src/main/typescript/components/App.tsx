import { NewGameForm } from "./NewGameForm"
import { State, RatedGame } from "../State"

import * as React from "react"
import * as ReactRedux from "react-redux"

const formatDate = (isoDateTime: string): string =>
  isoDateTime.split("T")[0]

const render = (props: State) => {
  const [gameIndex, setGameIndex] = React.useState(0)

  const selectedGame: RatedGame | undefined = props.games[gameIndex]
  const ratings = selectedGame === undefined
    ? []
    : Object.entries(props.games[gameIndex].playerRatings)
  ratings.sort(([_player1, rating1], [_player2, rating2]) =>
    (rating2.rating - 2 * rating2.deviation) - (rating1.rating - 2 * rating1.deviation)
  )

  return <div>
    <NewGameForm />
    <hr />
    { selectedGame === undefined
        ? ""
        : <div>
            <input type="range" min="0" max={props.games.length - 1}
              value={gameIndex}
              onChange={ (e) => setGameIndex(Number.parseInt(e.target.value)) } />
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
                      <td>{player}</td>
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
          { props.games.map((ratedGame, index) => {
              const game = ratedGame.game
              const ratings = ratedGame.playerRatings
              const previousRatings = index === 0 ? {} : props.games[index - 1].playerRatings
              const rating1 = ratings[game.player1].rating
              const rating2 = ratings[game.player2].rating
              const ratingDiff1 = rating1 - (previousRatings[game.player1] || { rating: 1500 }).rating
              const ratingDiff2 = rating2 - (previousRatings[game.player2] || { rating: 1500 }).rating
              const signumToSymbol = (x: number) => x < 0 ? "↘" : "↗"
              return <tr key={game.playedAt}>
                <td>{ formatDate(game.playedAt) }</td>
                <td className={"darkColumn" + (game.score1 > game.score2 ? " winner" : "")}>{game.player1}</td>
                <td className="darkColumn">{rating1.toFixed(0)} {signumToSymbol(ratingDiff1)}{Math.abs(ratingDiff1).toFixed(0)}</td>
                <td className="darkColumn" style={{textAlign: "right"}}><strong>{game.score1}</strong></td>
                <td className="lightColumn"><strong>{game.score2}</strong></td>
                <td className="lightColumn">{rating2.toFixed(0)} {signumToSymbol(ratingDiff2)}{Math.abs(ratingDiff2).toFixed(0)}</td>
                <td className={"lightColumn" + (game.score2 > game.score1 ? " winner" : "")}>{game.player2}</td>
              </tr>
          } ) }
        </tbody>
      </table>
    </div>
  </div>
}

export const App = ReactRedux.connect(
  (state: State) => state
)(render)
