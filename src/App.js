import "./App.css";
import { Routes, Route } from "react-router-dom";
//importing states
import { SearchProvider } from "./context/SearchContext";
// importing pages
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
