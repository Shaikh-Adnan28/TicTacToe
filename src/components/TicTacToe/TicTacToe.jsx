import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Asstes/circle.png";
import cross_icon from "../Asstes/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    // stop if game over or box already filled
    if (lock || data[num] !== "") {
      return;
    }

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' />`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' />`;
      data[num] = "o";
    }

    setCount((prev) => prev + 1);
    checkWin();
  };

  const checkWin = () => {
    // all possible winning combinations
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of wins) {
      const [a, b, c] = combo;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations 🎉 : <img src=${cross_icon} alt="cross"/> is the Winner!`;
    } else {
      titleRef.current.innerHTML = `Congratulations 🎉 : <img src=${circle_icon} alt="circle"/> is the Winner!`;
    }
  };

  const resetGame = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setLock(false);
    setCount(0);
    titleRef.current.innerHTML = `TIC TAC TOE GAME IN <span>REACT</span>`;
    const boxes = document.querySelectorAll(".boxes");
    boxes.forEach((box) => {
      box.innerHTML = "";
    });
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        TIC TAC TOE GAME IN <span>REACT</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
