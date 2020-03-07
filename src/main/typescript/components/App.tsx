import { NewGameForm } from "./NewGameForm"
import { State, Game } from "../State"

import * as React from "react"
import * as ReactRedux from "react-redux"

const render = (props: State) => {
  const [gameIndex, setGameIndex] = React.useState(0)

  const game: Game | undefined = props.games[gameIndex]
  const ratings = game === undefined
    ? []
    : Object.entries(props.ratingsAfterGames[gameIndex].playerRatings)
  ratings.sort(([_player1, rating1], [_player2, rating2]) =>
    (rating2.rating - 2 * rating2.deviation) - (rating1.rating - 2 * rating1.deviation)
  )

  return <div>
    <NewGameForm />
    <hr />
    { game === undefined
        ? ""
        : <div>
            <input type="range" min="0" max={props.games.length - 1}
              value={gameIndex}
              onChange={ (e) => setGameIndex(Number.parseInt(e.target.value)) } />
            <p>
              Ratings after <strong>{game.player1}</strong> vs <strong>{game.player2}</strong> on {game.playedAt}
              <small> (95% confidence level)</small>
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
          { props.games.map(game =>
              <tr key={game.playedAt}>
                <td>{game.playedAt}</td>
                <td className={"darkColumn" + (game.score1 > game.score2 ? " winner" : "")}>{game.player1}</td>
                <td className="darkColumn">{game.score1}</td>
                <td className={"lightColumn" + (game.score2 > game.score1 ? " winner" : "")}>{game.player2}</td>
                <td className="lightColumn">{game.score2}</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
}

export const App = ReactRedux.connect(
  (state: State) => state
)(render)
