import React from "react";

export default function Title({ children }) {
  return (
    <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
      {children}
    </h1>
  );
}