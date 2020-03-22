import * as AppReducer from "./AppReducer"
import { formatDate } from "../Util"

import * as React from "react"
import styled from 'styled-components'
import { desaturate } from 'polished'
import { ratingRange, RatingRange, Rating } from "../Game"

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
      const playerRatingsWithRange: Array<[string, Rating & { range: RatingRange }]> =
        Object.entries(selectedGame.playerRatings)
          .map(([player, rating]) => [player, { ...rating, range: ratingRange(rating) }])

      playerRatingsWithRange.sort(([_player1, rating1], [_player2, rating2]) =>
        rating2.range.min - rating1.range.min
      )
      return playerRatingsWithRange
    },
    [selectedGame]
  )

  const maxRatingTop = Math.max(...ratings.map(([_, r]) => r.range.max))
  const maxRatingBottom = Math.max(...ratings.map(([_, r]) => r.range.min))
  const minRatingBottom = Math.min(...ratings.map(([_, r]) => r.range.min))

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
          <Player
            key={player}
            color={desaturate(1 - (rating.range.min - minRatingBottom) / (maxRatingBottom - minRatingBottom), '#0082aa')}
          >
            <PlayerName>
              <a className="player" onClick={ () => dispatch({ type: "playerToggled", player }) }>
                { index + 1 }. {player}
                {' '}<PlayerScore> - {rating.rating.toFixed(0)} ± {rating.range.radius.toFixed(0)}</PlayerScore>
              </a>
            </PlayerName>
            <PlayerScoreChart>
              <CertainScore widthPercent={getWidthPercent(rating.range.min, maxRatingTop)} />
              <PossibleScore widthPercent={getWidthPercent(rating.range.length, maxRatingTop)} />
            </PlayerScoreChart>
          </Player>
        )}
    </RatingsContainer>
  </div>
}
