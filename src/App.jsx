import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./pages/Category.jsx";
import Mainpage from "./pages/Mainpage";
import Fileupload from "./pages/Fileupload";
import Fileuploadshare from "./pages/Fileuploadshare";
import Urlentrance from "./pages/Urlentrance";
import Reviewresult from "./pages/Reviewresult";
import ContractShare from "./pages/ContractShare.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/category" element={<Category/>} />
          <Route path="/" element={<Mainpage />} />
          <Route path="/fileupload" element={<Fileupload />} />
          <Route path="/fileuploadshare" element={<Fileuploadshare />} />
          <Route path="/Urlentrance" element={<Urlentrance />} />
          <Route path="/Reviewresult" element={<Reviewresult />} />
          <Route path="/ContractShare" element={<ContractShare />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
