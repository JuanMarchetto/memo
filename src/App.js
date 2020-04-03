import React, { useState, useEffect } from "react";
import Matrix from "./matrix";
import { elements } from "./elements";
import "./App.css";
import { toGrid, shuffle } from "./helpers";

function App() {
  const [win, setWin] = useState(false);
  const [selected, setSelected] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [level, setLevel] = useState(1);
  const [list, setList] = useState(
    toGrid(
      shuffle([...Array.from(Array(2).keys()), ...Array.from(Array(2).keys())])
    )
  );
  useEffect(() => {
    if (guessed.length === level + 1) {
      setGuessed([]);
      setSelected([]);
      if (guessed.length < elements.length) {
        setLevel(level + 1);
        setList(generateLevel(level + 2));
      } else {
        setWin(true);
      }
    }
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

  let generateLevel = level =>
    toGrid(
      shuffle([
        ...Array.from(Array(level).keys()),
        ...Array.from(Array(level).keys())
      ])
    );

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
              ? 'url("' + elements[list[rowIndex][index]] + '") no-repeat'
              : "red"
        }
      };
    });
  });
  let params = {
    childs: {
      styles: {
        border: "2px solid black"
      },
      onClick: onSelect
    }
  };
  return win ? (
    <h1>GANASTE!</h1>
  ) : (
    <>
      <header>
        <h1>Memo Rayuela</h1>
        <h2>Nivel: {level}</h2>
      </header>
      <main
        style={{
          width: (99 * list[0].length) / list.length + "vmin",
          maxWidth: (700 * list[0].length) / list.length + "px"
        }}
      >
        <Matrix list={viewList} params={params} />
      </main>
    </>
  );
  function onSelect(row, cell) {
    if (selected.length < 2) {
      let newSelection = [...selected, [row, cell]];
      setSelected(newSelection);
    }
  }
}

export default App;
