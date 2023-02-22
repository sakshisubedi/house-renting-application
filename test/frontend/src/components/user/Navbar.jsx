import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  
{/* Replaced with Jin's Navbar component */}
  return (
    <div className="">
      <Container className="p-2 bg-white">
        <div className="flex justify-between items-center p-4">
          <Link to="/">
            <img src="./favicon.png" alt="" className="h-10" />
          </Link>
          <Link to="/">
            <img src="./logo.png" alt="" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            {/* <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded"
              >
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li> */}
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
