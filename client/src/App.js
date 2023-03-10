import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import EditCustomerProfilePage from "./Components/EditCustomerProfilePage";
import EditLandlordProfilePage from "./Components/EditLandlordProfilePage";
import LandingPage from "./Components/LandingPage";
import WishlistPage from "./Components/WishlistPage";
import SearchResult from "./Components/SearchResult";
import IndividualListingPage from "./Components/IndividualListingPage";
import AddListingPage from "./Components/AddListingPage";
import ConfirmPassword from "./Components/auth/ConfirmPassword";
import EmailVerification from "./Components/auth/EmailVerification";
import ForgetPassword from "./Components/auth/ForgetPassword";
import Signin from "./Components/auth/Signin";
import Signup from "./Components/auth/Signup";
import LandlordConfirmPassword from "./Components/auth/LandlordConfirmPassword";
import LandlordEmailVerification from "./Components/auth/LandlordEmailVerification";
import LandlordForgetPassword from "./Components/auth/LandlordForgetPassword";
import LandlordSignin from "./Components/auth/LandlordSignin";
import LandlordSignup from "./Components/auth/LandlordSignup";
import InterestedPeopleList from "./Components/InterestedPeopleList";

function App() {
  return (
    <>
      {/* <LandingPage /> */}
      <Router basename='/'>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/search" element={<SearchResult />} />
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
          <Route path="/listing/:id" element={<IndividualListingPage />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/verification" element={<EmailVerification />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ConfirmPassword />} />
          <Route path="/landlord/signin" element={<LandlordSignin />} />
          <Route path="/landlord/signup" element={<LandlordSignup />} />
          <Route path="/landlord/verification" element={<LandlordEmailVerification />} />
          <Route path="/landlord/forget-password" element={<LandlordForgetPassword />} />
          <Route path="/landlord/reset-password" element={<LandlordConfirmPassword />} />
          <Route path='*' element={<Navigate to='/landing' />} />

          {/* Authentication part */}
          
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
