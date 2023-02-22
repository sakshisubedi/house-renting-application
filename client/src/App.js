import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SearchPage from "./Pages/LandingPage/SearchPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
