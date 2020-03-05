import { NewGameForm } from "./NewGameForm"
import { State } from "../State"

import * as React from "react"
import * as ReactRedux from "react-redux"

const render = (props: State) => {
  return <div>
    <NewGameForm />
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
    <hr />
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Score</th>
            <th>Victories</th>
            <th>Defeats</th>
            <th>Ties</th>
          </tr>
        </thead>
        <tbody>
          { props.playerStats.map((playerStats, index) =>
              <tr key={playerStats.player}>
                <td>{ index + 1 }</td>
                <td>{playerStats.player}</td>
                <td>{playerStats.score.toPrecision(2)}</td>
                <td>{playerStats.victories}</td>
                <td>{playerStats.defeats}</td>
                <td>{playerStats.ties}</td>
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
