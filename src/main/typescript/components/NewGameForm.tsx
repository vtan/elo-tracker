import * as AppReducer from "./AppReducer"

import * as React from "react"

interface Props {
  dispatch: AppReducer.Dispatch
}

export function NewGameForm(props: Props) {
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
  return <form onSubmit={onSubmit}>
    <p>
      ●
      <input
        value={player1}
        onChange={ (e) => setPlayer1(e.target.value) }
        placeholder="Black player" />
      <input
        value={score1}
        onChange={ (e) => setScore1(e.target.value) }
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
        onChange={ (e) => setScore2(e.target.value) }
        placeholder="Score of white player" />
    </p>
    <p>
      <button type="submit">Add</button>
      <button type="reset" onClick={clear}>Cancel</button>
    </p>
  </form>
}
