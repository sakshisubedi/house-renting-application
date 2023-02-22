import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import WishlistPage from "./Components/WishlistPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/wishlistPage"
            element={<WishlistPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
