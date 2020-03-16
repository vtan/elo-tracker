import * as AppReducer from "./AppReducer"

import * as React from "react"
import styled from "styled-components"


interface Props {
  dispatch: AppReducer.Dispatch
}

const FormHeader = styled.h2`
  border-bottom: 1px solid #ccc;
  padding-bottom: 1.5rem;
  margin: 0 0 1.5rem;
`

const FormWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  padding: 1.5rem;
	background: #fff;
  box-sizing: border-box;

  @media (min-width: 400px) {
    box-shadow: 2px 0 10px 2px rgba(0, 0, 0, 0.3);
  }
`

const FormRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.5rem;
  justify-content: space-between;
`
const FormInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: 0;
  box-sizing: border-box;
`

const FormLabel = styled.label`
  display: block;
  color: #333;
  margin-bottom: 1rem;
`

const PlayerColumn = styled.div`
  width: 70%;
`

const ScoreColumn = styled.div`
  width: calc(20% - 0.5rem);
  margin-left: 0.5rem;
`
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  width: 100px;
  height: 2.5rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  border: 0;
`

const Dot = styled.div`
  font-size: 2.5rem;
  line-height: 1rem;
`

export function NewGameForm(props: Props) {
  const { dispatch } = props;
  const [player1, setPlayer1] = React.useState("")
  const [player2, setPlayer2] = React.useState("")
  const [score1, setScore1] = React.useState("")
  const [score2, setScore2] = React.useState("")

  const clear = () => {
    setPlayer1("")
    setPlayer2("")
    setScore1("")
    setScore2("")
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validPlayer1 = player1.trim()
    const validPlayer2 = player2.trim()
    const validScore1 = parseFloat(score1)
    const validScore2 = parseFloat(score2)
    if (validPlayer1 !== "" && validPlayer2 !== "" && !isNaN(validScore1) && !isNaN(validScore2)) {
      const newGame = {
        player1: validPlayer1,
        player2: validPlayer2,
        score1: validScore1,
        score2: validScore2
      }
      AppReducer.createGame(props.dispatch, newGame)
      clear()
    }
  }

  const onCancel= (e: React.FormEvent)  => {
    e.preventDefault()
    clear();
    dispatch({ type: 'showAddForm', visible: false })
  }
  
  return <FormWrapper>
    <FormHeader>Add new game</FormHeader>
    <form onSubmit={onSubmit}>
      <FormRow>
        <Dot>●</Dot>
        <PlayerColumn>
          <FormLabel>Black player</FormLabel>
          <FormInput
            value={player1}
            onChange={ (e) => setPlayer1(e.target.value) }/>
        </PlayerColumn>
        <ScoreColumn>
          <FormLabel>Score</FormLabel>
          <FormInput
            value={score1}
            type="number"
            onChange={ (e) => setScore1(e.target.value) }/>
        </ScoreColumn>
      </FormRow>
      <FormRow>
        <Dot>○</Dot>
        <PlayerColumn>
          <FormLabel>White player</FormLabel>
          <FormInput
            value={player2}
            onChange={ (e) => setPlayer2(e.target.value) }/>
        </PlayerColumn>
        <ScoreColumn>
          <FormLabel>Score</FormLabel>
          <FormInput
            value={score2}
            type="number"
            onChange={ (e) => setScore2(e.target.value) }/>
        </ScoreColumn>
      </FormRow>
      <ButtonRow>
        <Button type="reset" style={{backgroundColor: '#fff', color: '#333', border: '1px solid #333'}} onClick={onCancel}>Cancel</Button>
        <Button type="submit" style={{backgroundColor: '#000', color: '#fff'}}>Add</Button>
      </ButtonRow>
    </form>
  </FormWrapper>
}
