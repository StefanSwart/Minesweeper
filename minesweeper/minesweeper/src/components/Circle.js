import React from "react";

/* This component returns a div inside a div where the inner div has a border radius of 20, 
  making it a circle.
*/
export default function Circle() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: 23,
          width: 23,
          borderRadius: 20,
          background: "rgba(0,0,0,0.4)",
        }}
      ></div>
    </div>
  );
}
