import React from "react";
import { nanoid } from "nanoid";
import Die from "./component/Die";
import Confetti from "react-confetti";
export default function App() {
  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  const [dice, setNewDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }
  // win the game part 1
  React.useEffect(() => {
    const heldDice = dice.every((die) => die.isHeld);

    const firstDice = dice[0].value;
    const allDice = dice.every((die) => die.value === firstDice);
    if (heldDice && allDice) {
      setTenzies(true);
      window.alert("You won");
    }
  });

  // creating a new function so that when the values are same the color should displayed in that place but if the value is not same than it have to change

  // toggle function
  function toggle(id) {
    setNewDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function diceRoll() {
    if (!tenzies) {
      setNewDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setNewDice(allNewDice());
    }
  }
  const newDiceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      toggle={() => toggle(die.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Welcome to tenzies game</h1>
      <h2>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h2>
      <div className="dice-container">{newDiceElements}</div>
      <button className="roll-dice" onClick={diceRoll}>
        {tenzies ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}
// function
