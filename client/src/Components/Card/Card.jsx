import React from "react";
import "./Card.css";
import prop2 from "../../images/prop2.png";

export default function Card({ rent, address, title, metadata }) {
  return (
    <div className="card">
      <img src={prop2} alt="" />
      <div className="card-detail">
        <div className="rent-info">
          <p className="rent-amt">
            ${rent} <span className="rent-pm">/month</span>
          </p>
          <div className="like-btn">
            Fav<i class="far fa-heart-o"></i>
          </div>
        </div>
        <h4 className="house-title">{title}</h4>
        <address className="house-address">{address}</address>
        <div className="separator-card"></div>
        <div className="metadata-info">
          {metadata.map((data) => (
            <span>{data}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
