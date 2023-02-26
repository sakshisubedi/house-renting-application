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

import ConfirmPassword from "./Components/auth/ConfirmPassword";
import EmailVerification from "./Components/auth/EmailVerification";
import ForgetPassword from "./Components/auth/ForgetPassword";
import Signin from "./Components/auth/Signin";
import Signup from "./Components/auth/Signup";
import Home from "./Components/auth/Home";
import NotFound from "./Components/auth/NotFound"

import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <NavBar /> {/* Replaced with Jin's Navbar component */}
      {/* ******** Will have two navbar when editing profile page, as we will
      need navbar all the time maybe we can just set navbar here ********  */}

      {/* <Router> */}
      <Routes>
        {/* Need to link to Landing Page */}
        {/* <Route
          path="/"
          element={<LandingPage />}
        /> */}

        <Route path="/" element={<Home />} /> {/* Replaced with Mounika's landing page */}
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="*" element={<NotFound />} />

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
      {/* </Router> */}
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
