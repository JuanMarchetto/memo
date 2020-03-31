import React, { useState, useEffect } from "react";
import Matrix from "./matrix";
import "./App.css";

function App() {
  const [selected, setSelected] = useState([]);
  const [guessed, setGuessed] = useState([]);

  useEffect(() => {
    if (selected.length > 1) {
      if (
        list[selected[0][0]][selected[0][1]] ===
        list[selected[1][0]][selected[1][1]]
      ) {
        setGuessed([...guessed, selected]);
      }
      const timer = setTimeout(() => {
        setSelected([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  let list = [
    [1, 8, 6, 4],
    [7, 2, 3, 5],
    [5, 3, 7, 2],
    [4, 6, 8, 1]
  ];
  let viewList = list.map((row, rowIndex) => {
    return row.map((cell, index) => {
      return {
        styles: {
          background:
            selected.some(el => el[0] === rowIndex && el[1] === index) ||
            guessed.some(
              el =>
                (el[0][0] === rowIndex && el[0][1] === index) ||
                (el[1][0] === rowIndex && el[1][1] === index)
            )
              ? 'url("fran' + list[rowIndex][index] + '.jpeg") no-repeat'
              : "red"
        }
      };
    });
  });
  console.log(viewList);
  let params = {
    childs: {
      styles: {
        border: "2px solid black"
      }
    }
  };
  return (
    <>
      <header>
        <h1>MemoFran</h1>
      </header>
      <main>
        <Matrix list={viewList} params={params} onSelect={onSelect} />
      </main>
    </>
  );
  function onSelect(row, cell) {
    let newSelection = [...selected, [row, cell]];
    setSelected(newSelection);
  }
}

export default App;
