import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import LandingPage from "./Components/LandingPage";
// import LandingPage1 from "./Components/LandingPage1";
import SearchResult from "./Components/SearchResult";

function App() {
  return (
    <>
      {/* <LandingPage /> */}
      <Router>
        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/SearchResult" element={<SearchResult />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
