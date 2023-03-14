import React from "react";
import { ImSpinner3 } from "react-icons/im";


// Submit button style
export default function Submit({ value, busy }) {
  return (
    <button
      type="submit"
      style={{ color: '#FFFFFF', fontSize: "14px", fontWeight: "400", fontStyle: "normal", fontFamily: "Inter", backgroundColor: "#3062D5"}}
      className="w-full rounded hover:bg-opacity-90 transition text-lg cursor-pointer h-10 flex items-center justify-center"
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </button>
  );
}
