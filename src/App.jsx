import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./pages/Mainpage";
import Fileupload from "./pages/Fileupload";
import Fileuploadshare from "./pages/Fileuploadshare";
import Urlentrance from "./pages/Urlentrance";
import Reviewresult from "./pages/Reviewresult";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} />

          <Route path="/fileupload" element={<Fileupload />} />
          <Route path="/fileuploadshare" element={<Fileuploadshare />} />
          <Route path="/Urlentrance" element={<Urlentrance />} />
          <Route path="/Reviewresult" element={<Reviewresult />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
