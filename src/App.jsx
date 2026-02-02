
import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
   function generateAllNewDice () {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)

  let gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function rollDice () {  
    if (!gameWon) {
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ?
          die :
          { ...die, value: Math.ceil(Math.random() * 6) }
      ))
    } else {
      setDice(generateAllNewDice())
    }
  }

  function hold (id) {
    setDice(oldDice => oldDice.map(die => 
      die.id === id ?
        {...die, isHeld: !die.isHeld } :
        die
    ))
  }

  const diceElements = dice.map(dieObj => (
    <Die 
      key={dieObj.id} 
      value={dieObj.value} 
      isHeld={dieObj.isHeld} 
      hold={() => hold(dieObj.id)}
    />
  ))

  return (
    <main>
      {gameWon && <Confetti />}

      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      <div className="top-texts">
        <div class="top-texts__line">
          <h1 className="top-texts__title">Tenzies</h1>
          <img className="top-texts__image" src="./images/dice-icon.svg" alt="Icon of a dice" width="50" height="50" />
        </div>
        <p className="top-texts__instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-button" onClick={rollDice} ref={buttonRef}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}