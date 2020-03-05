import * as Action from "../Action"
import { NewGame } from "../State"

import * as React from "react"
import * as ReactRedux from "react-redux"
import * as Redux from "redux"

interface Props {
  createGame: (_: NewGame) => void
}

const render = (props: Props) => {
  const [player1, setPlayer1] = React.useState("")
  const [player2, setPlayer2] = React.useState("")
  const [score1, setScore1] = React.useState<number | undefined>()
  const [score2, setScore2] = React.useState<number | undefined>()

  const clear = () => {
    setPlayer1("")
    setPlayer2("")
    setScore1(undefined)
    setScore2(undefined)
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedPlayer1 = player1.trim()
    const trimmedPlayer2 = player2.trim()
    if (trimmedPlayer1 !== "" && trimmedPlayer2 !== "" && score1 !== undefined && score2 !== undefined) {
      props.createGame({
        player1: trimmedPlayer1,
        player2: trimmedPlayer2,
        score1,
        score2
      })
      clear()
    }
  }
  return <form onSubmit={onSubmit}>
    <p>
      ●
      <input
        value={player1}
        onChange={ (e) => setPlayer1(e.target.value) }
        placeholder="Black player" />
      <input
        value={score1}
        onChange={ (e) => setScore1(Number.parseFloat(e.target.value)) }
        placeholder="Score of black player" />
    </p>
    <p>
      ○
      <input
        value={player2}
        onChange={ (e) => setPlayer2(e.target.value) }
        placeholder="White player" />
      <input
        value={score2}
        onChange={ (e) => setScore2(Number.parseFloat(e.target.value)) }
        placeholder="Score of white player" />
    </p>
    <p>
      <button type="submit">Add</button>
      <button type="reset" onClick={clear}>Cancel</button>
    </p>
  </form>
}

export const NewGameForm = ReactRedux.connect(
  undefined,
  (dispatch: Redux.Dispatch<Redux.AnyAction>) => Redux.bindActionCreators({
    createGame: Action.createGame
  }, dispatch)
)(render)

