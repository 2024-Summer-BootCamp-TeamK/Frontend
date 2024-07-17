import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Buttonall from "../components/Button";
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container>
            <ComponentWrapper>
              <Aireviewresult />
            </ComponentWrapper>
            <ComponentWrapper>
              <Modificationsuggestion />
            </ComponentWrapper>
          </Container>
        </div>
      </div>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row; /* 두 컴포넌트를 세로로 나란히 배치합니다. 가로로 배치하려면 row로 변경하세요. */
  align-items: center;
  gap: 30px; /* 두 컴포넌트 사이의 간격을 설정합니다. 원하는 값으로 변경하세요. */
  padding: 20px; /* 전체 컨테이너의 패딩을 설정합니다. */
`;

const ComponentWrapper = styled.div`
  width: 100%;
  max-width: 800px; /* 컴포넌트의 최대 너비를 설정합니다. 원하는 값으로 변경하세요. */
  box-sizing: border-box;
`;

export default Revewresult;
