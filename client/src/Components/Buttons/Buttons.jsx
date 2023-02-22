import React, { useState } from "react";
import "./Buttons.css";

export default function Buttons() {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonNum) => {
    setActiveButton(buttonNum);
  };

  //   const handleClick = (event) => {
  //     if (event.target.tagName === "button") {
  //       const buttons = event.currentTarget.getElementsByTagName("button");//const btn = event.target.closest('button')
  //       for (let i = 0; i < buttons.length; i++) {
  //         if (buttons[i] === event.target) {
  //           buttons[i].classList.add("options-active");
  //         } else {
  //           buttons[i].classList.remove("options-active");
  //         }
  //       }
  //     }
  //   };
  return (
    <div className="btn-wrapper">
      <button
        className={`options ${activeButton === 1 ? "options-active" : ""}`}
        onClick={() => handleButtonClick(1)}
      >
        Rent
      </button>
      <button
        className={`options ${activeButton === 2 ? "options-active" : ""}`}
        onClick={() => handleButtonClick(2)}
      >
        Lease
      </button>
    </div>

    // <div className="btn-wrapper" onClick={handleClick}>
    //   <button className="options options-active">Rent</button>
    //   <button className="options">Lease</button>
    // </div>
  );
}
