import * as AppReducer from "./AppReducer"
import { DarkGameCell, LightGameCell } from "./GameCell"
import { LinkButton } from "./LinkButton"
import { formatDate } from "../Util"

import * as React from "react"
import styled from "styled-components"

interface Props {
  dispatch: AppReducer.Dispatch,
  state: AppReducer.State
}

export function GameTable({ dispatch, state }: Props) {
  const { games, selectedPlayer } = state

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
            return <Row key={game.playedAt} selected={selected}>
              <td>{ formatDate(game.playedAt) }</td>
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
        } ) }
      </tbody>
    </table>
  </div>
}

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
