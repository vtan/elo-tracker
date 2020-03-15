import * as AppReducer from "./AppReducer"
import { formatDate } from "../Util"

import * as React from "react"
import styled from 'styled-components'

interface Props {
  dispatch: AppReducer.Dispatch,
  state: AppReducer.State
}

function getWidthPercent(score: number, maxScore: number): number {

  return 100 * score / maxScore
}

const RatingsContainer = styled.div``

const Player = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 700;
`

const PlayerName = styled.div``

const PlayerScoreChart = styled.div`
	display: flex;
	flex-direction: row;
  margin: 0.25rem 0;
`

const CertainScore = styled.div<{ widthPercent: number }>`
	background: #000;
	height: 0.5rem;
  width: ${props => props.widthPercent}%;
  transition: width 1s;
`

const PossibleScore = styled.div<{ widthPercent: number }>`
	background: linear-gradient(to right, #000, #fff);
	height: 0.5rem;
  width: ${props => props.widthPercent}%;
  transition: width 1s;
`

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

  const maxRatingTop = Math.max(...ratings.map(r => r[1].rating + 2 * r[1].deviation))

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
    <RatingsContainer>
        { ratings.map(([player, rating], index) =>
          <Player key={player}>
            <PlayerName>
              <a className="player" onClick={ () => dispatch({ type: "playerToggled", player }) }>{ index + 1 }. {player}</a>
            </PlayerName>
            <PlayerScoreChart>
              <CertainScore widthPercent={getWidthPercent(rating.rating - 2 * rating.deviation, maxRatingTop)} />
              <PossibleScore widthPercent={getWidthPercent(4 * rating.deviation, maxRatingTop)} />
            </PlayerScoreChart>
            <div>{rating.rating.toFixed(0)} ± {(2 * rating.deviation).toFixed(0)}</div>
          </Player>
        )}
    </RatingsContainer>
  </div>
}
