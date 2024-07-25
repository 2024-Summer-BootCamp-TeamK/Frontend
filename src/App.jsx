import "./App.css";
// import { useReducer, useRef, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./pages/Mainpage";
import Fileupload from "./pages/Fileupload";
import Fileuploadshare from "./pages/Fileuploadshare";
import Reviewresult from "./pages/Reviewresult";
import Resultcompare from "./pages/Resultcompare";
import Category from "./pages/Category";
import Key from "./pages/Key.jsx";
import Keyinput from "./pages/Keyinput.jsx";
import Popupexplain from "./components/Popupexlain.jsx";

import ContractDetails from "./pages/ContractDetails.jsx";


import PdfEditor from "./pages/PdfEditor.jsx";
import Loading from "./pages/Loading.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/category" element={<Category />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/" element={<Mainpage />} />
          <Route path="/fileupload" element={<Fileupload />} />
          <Route path="/fileuploadshare" element={<Fileuploadshare />} />
          <Route path="/Reviewresult" element={<Reviewresult />} />
          <Route path="/Resultcompare" element={<Resultcompare />} />
          <Route path="/explain" element={<Popupexplain />} />
          <Route path="/key" element={<Key />} />
          <Route path="/keyinput/:documentId" element={<Keyinput />} />
          <Route path="/contract/:contractId" element={<ContractDetails />} />
          <Route path="/pdf-editor" element={<PdfEditor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
