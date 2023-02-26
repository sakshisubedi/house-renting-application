import React from "react";

export default function FormContainer({ children }) {
  return (
    <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
      {children}
    </div>
  );
}
