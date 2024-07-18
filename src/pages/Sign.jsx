import React, { useState } from "react";
import styled from "styled-components";
import Canvas from "../components/Canvas";
import SignatureImage from "../components/SignatureImage";

const SignContainer = styled.div`
  background-image: linear-gradient(
    102.7deg,
    rgba(253, 218, 255, 1) 8.2%,
    rgba(223, 173, 252, 1) 19.6%,
    rgba(173, 205, 252, 1) 36.8%,
    rgba(173, 252, 244, 1) 73.2%,
    rgba(202, 248, 208, 1) 90.9%
  );
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  height: 100vh;
  overflow: hidden;
  align-items: center;
`;

const Sign = () => {
  const [signature, setSignature] = useState("");

  const handleSave = (dataUrl) => {
    setSignature(dataUrl);
  };

  const handleClear = () => {
    setSignature("");
  };
  return (
    <SignContainer>
      <Canvas onSave={handleSave} onClear={handleClear} />
      {signature && <SignatureImage src={signature} />}
    </SignContainer>
  );
};

export default Sign;
