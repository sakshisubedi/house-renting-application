import React from "react";
import "./LandingPage.css";
import Card from "../../Components/Card/Card";
import Search from "../../Components/Search/Search";
import Header from "../../Components/Header/Header";
import Buttons from "../../Components/Buttons/Buttons";

// function performSearch() {
//   console.log("asdjla");
// }
export default function LandingPage() {
  return (
    <>
      {/* <Headers></Headers> */}

      <Header />
      <section>
        <Search />

        <h3 className="recommendation">Recommendation</h3>
        <Buttons />
        <div className="card-container">
          <Card
            rent={500}
            address="Motinagar"
            title="adh"
            metadata={["metadata", "metadata", "metadata"]}
          />
          <Card
            rent={600}
            address="Motinagar"
            title="adh"
            metadata={["metadata", "metadata", "metadata"]}
          />
          <Card
            rent={700}
            address="Motinagar"
            title="adh"
            metadata={["metadata", "metadata", "metadata"]}
          />
        </div>
      </section>
      {/* <Card onClick={performSearch} /> */}
    </>
  );
}
