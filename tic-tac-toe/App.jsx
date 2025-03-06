import { useState } from "react";

export default function App() {
  const [data, setData] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(false);
  const [win, setWin] = useState("");
  const [count,setCount] = useState(0);

// My Raw Logic
  // const logic = (newData) => {
  //   // Checking rows
  //   for (let i = 0; i < 9; i = i + 3) {
  //     let countX = 0;
  //     let countO = 0;
  //     for (let j = i; j < i + 3; j++) {
  //       if (newData[j] == "X") countX++;
  //       else if (newData[j] == "O") countO++;
  //       else if(newData[j]=='') break;
  //     }
  //     if (countX == 3) {
  //       setWin("X");
  //       return;
  //     } else if (countO == 3) {
  //       setWin("O");
  //       return;
  //     }
  //   }

  //   // Checking columns
  //   for (let i = 0; i < 3; i++) {
  //     let countX = 0;
  //     let countO = 0;
  //     for (let j = i; j < i + 7; j += 3) {
  //       if (newData[j] == "X") countX++;
  //       else if (newData[j] == "O") countO++;
  //       else if(newData[j]=='') break;
  //     }
  //     if (countX == 3) {
  //       setWin("X");
  //       return;
  //     } else if (countO == 3) {
  //       setWin("O");
  //       return;
  //     }
  //   }

  //   // Checking diagonals
  //   if (newData[0] == "X" && newData[4] == "X" && newData[8] == "X") {
  //     setWin("X");
  //     return;
  //   }
  //   if (newData[0] == "O" && newData[4] == "O" && newData[8] == "O") {
  //     setWin("O");
  //     return;
  //   }
  //   if (newData[2] == "X" && newData[4] == "X" && newData[6] == "X") {
  //     setWin("X");
  //     return;
  //   }
  //   if (newData[2] == "O" && newData[4] == "O" && newData[6] == "O") {
  //     setWin("O");
  //     return;
  //   }
  // };

// Better refactored code
const logic = (newData) => {
  let winner = "";
  
  // Checking rows
  for (let i = 0; i < 9; i += 3) {
    // newData[i] ensures that the cell is not empty.
    if (newData[i] && newData[i] === newData[i + 1] && newData[i] === newData[i + 2]) {
      winner = newData[i];
    }
  }

  // Checking columns
  for (let i = 0; i < 3; i++) {
    if (newData[i] && newData[i] === newData[i + 3] && newData[i] === newData[i + 6]) {
      winner = newData[i];
    }
  }

  // Checking diagonals
  if (newData[0] && newData[0] === newData[4] && newData[0] === newData[8]) {
    winner = newData[0];
  }
  if (newData[2] && newData[2] === newData[4] && newData[2] === newData[6]) {
    winner = newData[2];
  }

  return winner;
};


  const handleUpdate = (index) => {
    if (data[index] !== "" || win !== "") return;

    const newData = [...data];
    turn == false ? (newData[index] = "X") : (newData[index] = "O");
    setTurn((prev) => !prev);
    setData(newData);

    setCount(prev=>prev+1);

    if (count >= 5) {
      setWin(logic(newData));
    }

  };

  const handleReset = () => {
    setData(Array(9).fill(""));
    setTurn(false);
    setWin("");
  };

  return (
    <div>
      {win == "" && count<9 ? (
        <h4 style={{ margin: "auto" }}>
          Player {turn == false ? "X" : "O"} Turn
        </h4>
      ) : (
        <h4 style={{ margin: "auto" }}>
          {win == ""  ? "Game Drawn" : `Player ${win} wins!`}
        </h4>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
        {data.map((_, index) => (
          <input
            key={index}
            style={{
              width: "full",
              height: "50px",
              border: "2px solid black",
              padding: "5px",
            }}
            readOnly
            value={data[index]}
            maxLength="1"
            onClick={() => handleUpdate(index)}
          />
        ))}
      </div>
      <button style={{ margin: "5px" }} onClick={handleReset}>
        {" "}
        Reset
      </button>
    </div>
  );
}
