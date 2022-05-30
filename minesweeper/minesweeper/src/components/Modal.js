import React, { useState, useEffect } from "react";

// This is the modal that shows up over the whole app when the game is over.
export default function Modal({ restartGame, gameWon }) {
  const [render, setRender] = useState(false);
  // here we make the modal appear after 1 second.
  // useEffect runs after the render of the the component
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);
  return (
    <div
      style={{
        opacity: render ? 1 : 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div id="gameOverImage">
        {/* this div has a ternary operator which determines the text of the modal */}
        <div id="gameResultText">{gameWon ? "You Win" : "You Lose"}</div>
      </div>
      {/* This button allows the user to try again. once its clicked we run the restartGame function */}
      <div className="tryAgain" onClick={() => restartGame()}>
        Try Again
      </div>
    </div>
  );
}
