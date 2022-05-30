import React from "react";

import { mineColor } from "../util/mineColors";
import Circle from "./Circle";

// This is the cell component
function Cell({ details, updateFlag, revealCell }) {
  const style = {
    background: details.revealed
      ? details.value === "X"
        ? mineColor()
        : bombChexPattern(details.x, details.y)
      : chexPattern(details.x, details.y),
    color: numColorCode(details.value),
  };
  return (
    <div
      // onContextMenu runs the updateFlag function on right-click
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      //onClick runs the revealCell function on left-click
      onClick={() => revealCell(details.x, details.y)}
      style={style}
      className="cellStyle"
    >
      {/* if the cell is not revealed and is also flagged then we return a span with the flag icon */}
      {!details.revealed && details.flagged ? (
        <span style={flagStyle}>
          <>&#9873;</>
        </span>
      ) : // if the cell is revealed and its value is not 0 then we ask:
      details.revealed && details.value !== 0 ? (
        // if the cells value is X then we return the circle component
        details.value === "X" ? (
          <Circle />
        ) : (
          // else we return the valuen of the cell
          details.value
        )
      ) : (
        // if the value of the cell is 0 we return an empty string
        ""
      )}
    </div>
  );
}

/* the flags where showing the color of the text in the cell allowing the user to cheat 
  This style turns the flags red to make sure the user doesnt know the value of the cell.
*/
const flagStyle = {
  color: "red",
};

//This function returns a color code based on the value of x and y and whether they are even or odd
const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#c8c9db";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#a0a1b8";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#a0a1b8";
  } else {
    return "#c8c9db";
  }
};

//This function does the same as bombChexPattern but with two different colors
const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#704242";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#361212";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#361212";
  } else {
    return "#704242";
  }
};

//this function returns a color based on the value of a cell.
const numColorCode = (num) => {
  if (num === 1) {
    return "#1976d2";
  } else if (num === 2) {
    return "#288d3c";
  } else if (num === 3) {
    return "#d33030";
  } else if (num === 4) {
    return "#7c21a2";
  } else if (num === 5) {
    return "#1976d2";
  } else if (num === 6) {
    return "#1976d2";
  } else {
    return "white";
  }
};

export default Cell;
