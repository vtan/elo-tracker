import * as React from "react"
import { BrowserRouter, Switch, Route, Link, useParams } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"

import AddButton from './AddButton'
import * as AppReducer from "./AppReducer"
import { DeletedGamesTable } from "./DeletedGamesTable"
import { GameTable } from "./GameTable"
import { GroupSelectorPage } from "./GroupSelectorPage"
import { NewGameForm } from "./NewGameForm"
import { RatingTable } from "./RatingTable"

export function App() {
  const [state, dispatch] = React.useReducer(AppReducer.reducer, AppReducer.initialState)

  React.useEffect(
    () => AppReducer.fetchGroups(dispatch),
    []
  )

  return <BrowserRouter>
    <GlobalStyle />
    <Container>
      <Switch>
        <Route exact path="/">
          <GroupSelectorPage groups={state.groups} />
        </Route>
        <Route exact path="/:groupUrlName">
          <GroupPage dispatch={dispatch} state={state} />
        </Route>
      </Switch>
    </Container>
  </BrowserRouter>
}

interface GroupPageProps {
  dispatch: AppReducer.Dispatch,
  state: AppReducer.State
}

function GroupPage({ dispatch, state }: GroupPageProps) {
  const { groups, openGroup, showAddForm } = state

  const { groupUrlName } = useParams()

  React.useEffect(
    function closeGroupOnUnmount() {
      return () => {
        dispatch({ type: "groupClosed" })
        AppReducer.fetchGroups(dispatch)
      }
    },
    []
  )

  React.useEffect(
    function setGroupFromUrl() {
      if (openGroup === undefined) {
        const group = state.groups.find(g => g.urlName === groupUrlName)
        if (group !== undefined) {
          dispatch({ type: "groupOpened", group })
        }
      }
    },
    [groups]
  )

  React.useEffect(
    function fetchGames() {
      if (openGroup !== undefined) {
        AppReducer.fetchGames(dispatch, openGroup.id)
        AppReducer.fetchDeletedGames(dispatch, openGroup.id)
      }
    },
    [openGroup]
  )

  const openAddFormCallback = React.useCallback(() => {
    dispatch({ type: 'showAddForm', visible: true })
  }, [])

  return openGroup === undefined
    ? null
    : <>
        <BackLink to="/">&lt; Back</BackLink>

        <h1>{openGroup.name}</h1>

        <h2>Ranking</h2>
        <RatingTable dispatch={dispatch} state={state} />

        <h2>History</h2>
        <GameTable dispatch={dispatch} games={state.games} selectedPlayer={state.selectedPlayer} />

        <h2>Deleted games</h2>
        <DeletedGamesTable dispatch={dispatch} deletedGames={state.deletedGames} />

        <AddButton onClick={openAddFormCallback} />
        {showAddForm && <NewGameForm dispatch={dispatch} groupId={openGroup.id} />}
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

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;

  border: 1px #ddd solid;
  color: #222;
  font-size: 14px;
  text-decoration: none;

  &:visited {
    color: #222;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`
