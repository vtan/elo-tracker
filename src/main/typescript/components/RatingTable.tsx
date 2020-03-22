import * as AppReducer from "./AppReducer"
import { formatDate, blue } from "../Util"

import * as React from "react"
import styled from 'styled-components'
import { desaturate } from 'polished'

interface Props {
  dispatch: AppReducer.Dispatch,
  state: AppReducer.State
}

function getWidthPercent(score: number, maxScore: number): number {
  return 100 * score / maxScore
}

const RatingsContainer = styled.div``

const PlayerName = styled.div``

const PlayerScore = styled.span`
  font-weight: normal;
`

const PlayerScoreChart = styled.div`
	display: flex;
	flex-direction: row;
  margin: 0.25rem 0;
`

const CertainScore = styled.div<{ widthPercent: number }>`
	height: 0.25rem;
  width: ${props => props.widthPercent}%;
  transition: width 1s;
`

const PossibleScore = styled.div<{ widthPercent: number }>`
  opacity: 0.5;
	height: 0.25rem;
  width: ${props => props.widthPercent}%;
  transition: width 1s;
`

const Player = styled.div<{ color: string }>`
  margin-bottom: 1rem;
  font-weight: 700;

  ${CertainScore},
  ${PossibleScore} {
	  background: ${props => props.color};
  }

  ${PlayerName} a {
    color: ${props => props.color};
  }
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
        (rating2.rating - 1.5 * rating2.deviation) - (rating1.rating - 1.5 * rating1.deviation)
      )
      return result
    },
    [selectedGame]
  )

  const maxRatingTop = Math.max(...ratings.map(r => r[1].rating + 1.5 * r[1].deviation))
  const maxRatingBottom = Math.max(...ratings.map(r => r[1].rating - 1.5 * r[1].deviation))
  const minRatingBottom = Math.min(...ratings.map(r => r[1].rating - 1.5 * r[1].deviation))

  return <div>
    <input type="range" min="0" max={games.length - 1}
      value={selectedGameIndex}
      onChange={ (e) => dispatch({ type: "gameSelected", index: parseInt(e.target.value) }) } />
    <p>
      Ratings after <strong>{selectedGame.game.player1}</strong>
      {' '}vs <strong>{selectedGame.game.player2}</strong>
      {' '}on { formatDate(selectedGame.game.playedAt) }
      {' '}<small>(87% confidence level)</small>
    </p>
    <RatingsContainer>
        { ratings.map(([player, rating], index) =>
          <Player key={player} color={desaturate(1 - (rating.rating - 1.5 * rating.deviation - minRatingBottom) / (maxRatingBottom - minRatingBottom), '#0082aa')}>
            <PlayerName>
              <a className="player" onClick={ () => dispatch({ type: "playerToggled", player }) }>{ index + 1 }. {player} <PlayerScore> - {rating.rating.toFixed(0)} ± {(1.5 * rating.deviation).toFixed(0)}</PlayerScore></a>
            </PlayerName>
            <PlayerScoreChart>
              <CertainScore widthPercent={getWidthPercent(rating.rating - 1.5 * rating.deviation, maxRatingTop)} />
              <PossibleScore widthPercent={getWidthPercent(3 * rating.deviation, maxRatingTop)} />
            </PlayerScoreChart>
          </Player>
        )}
    </RatingsContainer>
  </div>
}
