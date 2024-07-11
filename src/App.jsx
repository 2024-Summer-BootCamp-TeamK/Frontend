import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./pages/Category.jsx";
import Upload from "./pages/Upload.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/category" element={<Category/>} />
          <Route path="/upload" element={<Upload/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
