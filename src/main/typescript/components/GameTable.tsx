import * as AppReducer from "./AppReducer"
import { DarkGameCell, LightGameCell } from "./GameCell"
import { LinkButton } from "./LinkButton"
import { RatedGame } from "../Game"

import { DateTime } from "luxon"
import * as React from "react"
import styled from "styled-components"

interface Props {
  dispatch: AppReducer.Dispatch,
  games: ReadonlyArray<RatedGame>,
  selectedPlayer?: string
}

export function GameTable({ dispatch, games, selectedPlayer }: Props) {
  const reverseGames = [ ...games ].reverse()

  return <div>
    <table>
      <tbody>
        { reverseGames.map((ratedGame, reverseIndex) => {
            const index = games.length - 1 - reverseIndex
            const game = ratedGame.game
            const ratings = ratedGame.playerRatings
            const previousRatings = index === 0 ? {} : games[index - 1].playerRatings
            const rating1 = ratings[game.player1].rating
            const rating2 = ratings[game.player2].rating
            const ratingDiff1 = rating1 - (previousRatings[game.player1] || { rating: 1500 }).rating
            const ratingDiff2 = rating2 - (previousRatings[game.player2] || { rating: 1500 }).rating
            const signumToSymbol = (x: number) => x < 0 ? "↘" : "↗"
            const selected = game.player1 === selectedPlayer || game.player2 === selectedPlayer

            const playedAt = DateTime.fromISO(ratedGame.game.playedAt, { zone: "utc" })
            const newYear =
              index === games.length - 1 ||
              DateTime.fromISO(games[index + 1].game.playedAt, { zone: "utc" }).year !== playedAt.year

            return <React.Fragment key={game.id} >
              { newYear
                  ? <tr>
                      <th colSpan={3} />
                      <YearSeparator colSpan={2}>{playedAt.year}</YearSeparator>
                      <th colSpan={3} />
                    </tr>
                  : null
              }
              <Row selected={selected}>
                <td>{ playedAt.toFormat("LLL d") }</td>
                <DarkGameCell>
                  <Player
                    winner={ game.score1 > game.score2 }
                    onClick={ () => dispatch({ type: "playerToggled", player: game.player1 }) }>
                      {game.player1}
                  </Player>
                </DarkGameCell>
                <DarkGameCell>{rating1.toFixed(0)} {signumToSymbol(ratingDiff1)}{Math.abs(ratingDiff1).toFixed(0)}</DarkGameCell>
                <DarkGameCell style={{textAlign: "right"}}><strong>{game.score1}</strong></DarkGameCell>
                <LightGameCell><strong>{game.score2}</strong></LightGameCell>
                <LightGameCell>{rating2.toFixed(0)} {signumToSymbol(ratingDiff2)}{Math.abs(ratingDiff2).toFixed(0)}</LightGameCell>
                <LightGameCell>
                  <Player
                    winner={ game.score2 > game.score1 }
                    onClick={ () => dispatch({ type: "playerToggled", player: game.player2 }) }>
                      {game.player2}
                  </Player>
                </LightGameCell>
                <td><LinkButton onClick={ () => AppReducer.deleteGame(dispatch, game) }>✗</LinkButton></td>
              </Row>
            </React.Fragment>
        } ) }
      </tbody>
    </table>
  </div>
}

const YearSeparator = styled.th`
  padding: 0.5rem 0;
`

const Row = styled.tr<{ selected: boolean }>`
  background-color: ${props => props.selected ? "#edf96c" : "transparent"};
`

const Player = styled.a<{ winner: boolean }>`
  cursor: pointer;
  text-decoration: ${props => props.winner ? "underline" : "none"};

  &:hover {
    border-bottom: 1px black dotted;
  }
`
