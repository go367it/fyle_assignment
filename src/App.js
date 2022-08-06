import "./App.css";
import { Routes, Route } from "react-router-dom";
// importing pages
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
