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
<<<<<<< HEAD
import Popupexplain from "./components/Popupexlain.jsx";
import C from "./pages/C.jsx";
=======
import C from "./pages/Category.jsx";
>>>>>>> design/카테고리-페이지-기능구현

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
<<<<<<< HEAD
          <Route path="/explain" element={<Popupexplain />} />
=======
>>>>>>> design/카테고리-페이지-기능구현
          <Route path="/key" element={<Key />} />
          <Route path="/keyinput" element={<Keyinput />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
