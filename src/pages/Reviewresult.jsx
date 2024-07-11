import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Buttonall from "../components/Buttonall";
import Modificationsuggestion from "../components/ Modificationsuggestion";
import Aireviewresult from "../components/Aireviewresult";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";

const Revewresult = () => {
  return (
    <>
      <div>
        <Headerall>
          <LogoContainer>
            <Logo data={logoSrc} type="image/svg+xml" />
          </LogoContainer>
          <ButtonContainer>
            <Button>AI 검토 받으러 가기</Button>
            <Button>상대방과 계약서 검토하기</Button>
          </ButtonContainer>
        </Headerall>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Aireviewresult></Aireviewresult>
        </div>
        <div>
          <Modificationsuggestion></Modificationsuggestion>
        </div>
      </div>
    </>
  );
};

export default Revewresult;
