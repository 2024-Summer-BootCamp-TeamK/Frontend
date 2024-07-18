import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./pages/Mainpage";
import Fileupload from "./pages/Fileupload";
import Fileuploadshare from "./pages/Fileuploadshare";
import Urlentrance from "./pages/Urlentrance";
import Reviewresult from "./pages/Reviewresult";
import Resultcompare from "./pages/Resultcompare";
import Category from "./pages/Category";
import Sign from "./pages/Sign";
import ContractShare from "./pages/ContractShare.jsx";
import Key from "./pages/Key.jsx";
import Keyinput from "./pages/Keyinput.jsx";
import Popupexplain from "./components/Popupexlain.jsx";
import Carousel from "./pages/Carousel";


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/category" element={<Category />} />

          <Route path="/" element={<Mainpage />} />
          <Route path="/fileupload" element={<Fileupload />} />
          <Route path="/fileuploadshare" element={<Fileuploadshare />} />
          <Route path="/Urlentrance" element={<Urlentrance />} />
          <Route path="/Reviewresult" element={<Reviewresult />} />
          <Route path="/Resultcompare" element={<Resultcompare />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/ContractShare" element={<ContractShare />} />
          <Route path="/explain" element={<Popupexplain />} />
          <Route path="/key" element={<Key />} />
          <Route path="/keyinput" element={<Keyinput />} />
          <Route path="/carousel" element={<Carousel />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
