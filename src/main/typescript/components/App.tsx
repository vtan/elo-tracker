import * as React from "react"
import styled, { createGlobalStyle } from "styled-components"

import AddButton from './AddButton'
import * as AppReducer from "./AppReducer"
import { DeletedGamesTable } from "./DeletedGamesTable"
import { GameTable } from "./GameTable"
import { NewGameForm } from "./NewGameForm"
import { RatingTable } from "./RatingTable"

export function App() {
  const [state, dispatch] = React.useReducer(AppReducer.reducer, AppReducer.initialState)
  const { showAddForm } = state

  React.useEffect(
    () => {
      AppReducer.fetchGames(dispatch)
      AppReducer.fetchDeletedGames(dispatch)
    },
    []
  )

  const openAddFormCallback = React.useCallback(() => {
    dispatch({ type: 'showAddForm', visible: true })
  }, [])

  return <>
    <GlobalStyle />
    <Container>
      <h1>GO leaderboard</h1>

      <h2>Ranking</h2>
      <RatingTable dispatch={dispatch} state={state} />

      <h2>History</h2>
      <GameTable dispatch={dispatch} games={state.games} selectedPlayer={state.selectedPlayer} />

      <h2>Deleted games</h2>
      <DeletedGamesTable dispatch={dispatch} deletedGames={state.deletedGames} />

      <AddButton onClick={openAddFormCallback} />
      {showAddForm && <NewGameForm dispatch={dispatch} />}
    </Container>
  </>
}

const GlobalStyle = createGlobalStyle`
  body { margin: 0; }
  h1 { margin-top: 0; }
  body, input, button { font-family: 'Open Sans', sans-serif; font-size: 16px; }
  table { border-collapse: separate; border-spacing: 0; }
  th, td { padding: 2px 8px; }
`

const Container = styled.div`
  position: relative;
  padding: 1.5rem;
  box-sizing: border-box;
`
