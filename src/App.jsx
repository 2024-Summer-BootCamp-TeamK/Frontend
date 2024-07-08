import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Category from "./pages/Category";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/category" element={<Category/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

