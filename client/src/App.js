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

function App() {
  return (
    <>
      {/* <LandingPage /> */}
      <Router>
        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/SearchResult" element={<SearchResult />} />
             <Route
            path="/editCustomerProfilePage"
            element={<EditCustomerProfilePage />}
          />
          <Route
            path="/editLandlordProfilePage"
            element={<EditLandlordProfilePage />}
          />
          <Route path="/AddListingPage" element={<AddListingPage />} />
          <Route path="/wishlistPage" element={<WishlistPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
