import React from "react";
import "./SearchPage.css";
import Header from "../../Components/Header/Header";
import SideSearch from "../../Components/SideSearch/SideSearch";
import Card from "../../Components/Card/Card";

export default function SearchPage() {
  return (
    <div>
      <Header />
      <h2 className="showing-results">Showing results for “Location”...</h2>
      <SideSearch />
      <div className="results">
        <Card
          rent={2000}
          address="2699 Green Valley, La Jolla, CA"
          title="Palm Harbor"
          metadata={["metadata", "metadata", "metadata"]}
        />
        <Card
          rent={600}
          address="2699 Green Valley, La Jolla, CA"
          title="Palm Harbor"
          metadata={["metadata", "metadata", "metadata"]}
        />
        <Card
          rent={1700}
          address="One Miramar Street"
          title="La Jolla"
          metadata={["metadata", "metadata", "metadata"]}
        />
      </div>
    </div>
  );
}
