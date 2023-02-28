import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import EditCustomerProfilePage from "./Components/EditCustomerProfilePage";
import EditLandlordProfilePage from "./Components/EditLandlordProfilePage";
import LandingPage from "./Components/LandingPage";
import WishlistPage from "./Components/WishlistPage";
import SearchResult from "./Components/SearchResult";
import IndividualListingPage from "./Components/IndividualListingPage";
import AddListingPage from "./Components/AddListingPage";

function App() {
  return (
    <>
      {/* <LandingPage /> */}
      <Router>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/search" element={<SearchResult />} />

          {/* Need to link to Landing Page */}
          {/* <Route
            path="/"
            element={<LandingPage />}
          /> */}
          <Route
            path="/customer/me"
            element={<EditCustomerProfilePage />}
          />
          <Route
            path="/landlord/me"
            element={<EditLandlordProfilePage />}
          />
          <Route path="/listing" element={<AddListingPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/listing/me" element={<IndividualListingPage />} />
        </Routes>
      </Router>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </>
  );
}

export default App;
