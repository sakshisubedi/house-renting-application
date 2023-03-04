import React from "react";

export default function FormInput({ name, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col-reverse w-30">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded w-full text-lg outline-none focus:border-black p-3 peer transition"
        style={{ color: '#929292', fontSize: "12px", fontWeight: "300", fontStyle: "normal", fontFamily: "Inter", border: "1px solid #929292", borderRadius: "5px"}}
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold peer-focus:text-black transition self-start"
        htmlFor={name}
        style={{ color: '#505050', fontSize: "14px", fontWeight: "500", fontStyle: "normal", fontFamily: "Inter"}}
      >
        {label}
      </label>
    </div>
  );
}
