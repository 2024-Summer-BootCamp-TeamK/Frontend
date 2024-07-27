import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';

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

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MangoDdobak-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2') format('woff2');
    font-style: normal;
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100vh;
    font-family: 'MangoDdobak-B', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, a, span, div, button {
    font-family: 'GmarketSansMedium', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/loading" element={<Loading />} />
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
