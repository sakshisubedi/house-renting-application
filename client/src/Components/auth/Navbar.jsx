import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/hookIndex";
import Container from "./Container";

export default function Navbar() {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  
{/* Replaced with Jin's Navbar component */}
  return (
    <div className="">
      <Container className="p-2 bg-white">
        <div className="flex justify-between items-center p-4">
          <Link to="/">
            <img src="./logo.jpg" alt="" className="h-10" />
          </Link>
          <Link to="/">
            <img src="../rease" alt="" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-black font-semibold text-lg"
                >
                  Log out
                </button>
              ) : (
                <Link
                  className="text-black font-semibold text-lg"
                  to="/auth/signin"
                >
                  LOGIN
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

// Not used, replaced by Jin's NavBar