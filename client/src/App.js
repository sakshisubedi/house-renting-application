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

function App() {
  return (
    <>
      {/* Declares the route for the front-end */}
      <Router basename='/'>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route
            path="/customer/:id"
            element={<EditCustomerProfilePage />}
          />
          <Route
            path="/landlord/:id"
            element={<EditLandlordProfilePage />}
          />
          <Route path="/listing" element={<AddListingPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/listing/:id" element={<IndividualListingPage />} />
          <Route path="/auth/user/signin" element={<Signin userType="customer" />}  />
          <Route path="/auth/user/signup" element={<Signup userType="customer" />} />
          <Route path="/auth/landlord/signin" element={<Signin userType="landlord" />} />
          <Route path="/auth/landlord/signup" element={<Signup userType="landlord" />} />
          {/* <Route path="/auth/verification" element={<EmailVerification />} /> */}
          <Route path="/auth/user/forget-password" element={<ForgetPassword userType="customer" />} />
          <Route path="/auth/landlord/forget-password" element={<ForgetPassword userType="landlord" />} />
          <Route path="/auth/user/reset-password" element={<ConfirmPassword userType="customer" />} />
          <Route path="/auth/landlord/reset-password" element={<ConfirmPassword userType="landlord" />} />
          <Route path='*' element={<Navigate to='/landing' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
