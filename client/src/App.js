import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import AddListingPage from "./Components/AddListingPage";
import EditCustomerProfilePage from "./Components/EditCustomerProfilePage";
import EditLandlordProfilePage from "./Components/EditLandlordProfilePage";
import WishlistPage from "./Components/WishlistPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Need to link to Landing Page */}
          {/* <Route
            path="/"
            element={<LandingPage />}
          /> */}
          <Route
            path="/editCustomerProfilePage"
            element={<EditCustomerProfilePage />}
          />
          <Route
            path="/editLandlordProfilePage"
            element={<EditLandlordProfilePage />}
          />
          <Route path="/AddListingPage" element={<AddListingPage />} />
          <Route
            path="/wishlistPage"
            element={<WishlistPage />}
          />
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
