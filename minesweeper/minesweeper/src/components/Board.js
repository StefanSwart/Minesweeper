import React, { useEffect, useState } from "react";

import createBoard from "../util/createBoard";
import Cell from "./Cell";
import Modal from "./Modal";

import { revealed } from "../util/reveal";

//Here I create the board component using a function.
const Board = () => {
  //Here i set the state of the board component.
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Here I call the fresh board function to initialise a new board after app render.
  useEffect(() => {
    freshBoard();
  }, []);

  //freshboard creates a new board using the createBoard function , then it sets the state of the application
  const freshBoard = () => {
    const newBoard = createBoard(15, 15, 50);
    // set states
    setNonMineCount(15 * 15 - 50);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  // this function calls the fresh board function and sets gameover and gamewon state to false.
  const restartGame = () => {
    freshBoard();
    setGameOver(false);
    setGameWon(false);
  };

  // on right-click, flag a cell
  const updateFlag = (e, x, y) => {
    // stops the dropdown menu from opening on right click
    e.preventDefault();
    // deep copy of state
    let newGrid = JSON.parse(JSON.stringify(grid));
    console.log(newGrid[x][y]);
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };

  // Reveal Cell
  const revealCell = (x, y) => {
    // if a cell is already revealed or the game is over then do nothing on click.
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    //if the revealed cell has a value of "X" then the game state is set to over
    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        // When all the blocks that are not mines are revealed then gameWon and gameOver is set to true.
        setGameWon(true);
        setGameOver(true);
      }
    }
  };

  // This function displays the rules using an alert.
  const rules = () => {
    alert(
      "Rules \r\n1. Left click on any block to reveal its value \r\n2. If the block is a Bomb then you lose and the game is over \r\n3. Right click on a hidden block to flag it as a bomb \r\n4. A number value indicates how many bombs are touching that specific block \r\n5. An empty block will reveal its surrounding blocks \r\n6.There is no time limit \r\n7. Reveal all off the blocks and flag all of the bombs correctly to win."
    );
  };

  return (
    <div>
      <p>Try to find all the mines!</p>
      {/* this button runs the rules function */}
      <button className="helpButton" onClick={rules}>
        Help
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* here i add in the modal component and pass in the gameWon state and restartGame function */}
        {gameOver && <Modal restartGame={restartGame} gameWon={gameWon} />}
        {/* here i map over the grid state which contains each row */}
        {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {/* here i map over each row and create a div with a cell component  */}
              {singleRow.map((singleBlock, index2) => {
                return (
                  <div>
                    <Cell
                      revealCell={revealCell}
                      details={singleBlock}
                      updateFlag={updateFlag}
                      key={index2}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;

// This tutorial helped me create minesweeper : https://www.youtube.com/watch?v=BLdd0zP-tAw&ab_channel=EduRise
