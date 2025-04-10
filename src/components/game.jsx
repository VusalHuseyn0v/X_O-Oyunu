import { useState, useRef } from "react";
import x_icon from "./Assets/circle.png";
import o_icon from "./Assets/cross.png";
import "./Game.css";

export const Game = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (currentData) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        currentData[a] &&
        currentData[a] === currentData[b] &&
        currentData[b] === currentData[c]
      ) {
        won(currentData[a]);
        break;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Tebrikler <img src='${
      winner === "x" ? x_icon : o_icon
    }' alt='winner' /> Qazandiniz`;
  };

  const reset = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "Tic Tac Toe In <span>React</span>";
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe In <span>React</span>
      </h1>

      <div className="board">
        {data.map((val, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {val === "x" && <img src={x_icon} alt="X" />}
            {val === "o" && <img src={o_icon} alt="O" />}
          </div>
        ))}
      </div>

      <button className="reset" onClick={reset}>
        Reset
      </button>
      <p>Vusal Huseynov 2025</p>
    </div>
  );
};
