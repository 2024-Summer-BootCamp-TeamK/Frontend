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
import Key from "./pages/Key.jsx";
import Keyinput from "./pages/Keyinput.jsx";
import Popupexplain from "./components/Popupexlain.jsx";
import C from "./pages/C.jsx";
import Carousel from "./pages/Carousel";
import WebViewer from "./pages/webviewr.jsx";

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
          <Route path="/ContractShare" element={<ContractShare />} />
          <Route path="/C" element={<C />} />
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
