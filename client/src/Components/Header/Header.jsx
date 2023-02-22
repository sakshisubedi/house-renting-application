import React from "react";
import "./Header.css";
import logo from "../../images/houselogo.png";
import rease from "../../images/reaselogo.png";

export default function Header() {
  return (
    <div>
      <nav>
        <img src={logo} className="logo" alt="" />
        <img src={rease} className="rease" alt="" />
        <ul className="nav-icons">
          <li>
            <i class="fa-regular fa-heart">wishlist</i>
          </li>
          <li>
            <i class="fa-solid fa-user">profile</i>
          </li>
        </ul>
      </nav>
    </div>
  );
}
