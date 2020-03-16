import * as React from "react"
import styled from "styled-components"
import * as AppReducer from "./AppReducer"
import { GameTable } from "./GameTable"
import { NewGameForm } from "./NewGameForm"
import { RatingTable } from "./RatingTable"
import AddButton from './AddButton'

export function App() {
  const [state, dispatch] = React.useReducer(AppReducer.reducer, AppReducer.initialState)
  const { showAddForm } = state

  React.useEffect(
    () => AppReducer.fetchGames(dispatch),
    []
  )

  const openAddFormCallback = React.useCallback(() => {
    dispatch({ type: 'showAddForm', visible: true })
  }, [])

  const Container = styled.div`
    position: relative;
    padding: 1.5rem;
  `

  return <Container>
    <h1>GO leaderboard</h1>

    <h2>Ranking</h2>
    <RatingTable dispatch={dispatch} state={state} />
    <hr />

    <h2>History</h2>
    <GameTable dispatch={dispatch} state={state} />
    
    <AddButton onClick={openAddFormCallback}/>
    {showAddForm &&  <NewGameForm dispatch={dispatch} />}
  </Container>
}
