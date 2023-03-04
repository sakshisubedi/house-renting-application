import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ to, children }) {
  return (
    <Link
      className="text-blue-600 text-xs hover:text-gray-500 transition"
      to={to}
    >
      {children}
    </Link>
  );
}
