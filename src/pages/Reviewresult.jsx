import React from 'react';
import styled from "styled-components";
import Button from "../components/Button";
import Suggestion from "../components/Suggestion";
import Aireviewresult from "../components/Aireviewresult";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";

const Reviewresult = () => {
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
        <ContentWrapper>
          <Container>
            <ComponentWrapper>
              <Aireviewresult />
            </ComponentWrapper>
            <ComponentWrapper>
              <Suggestion />
            </ComponentWrapper>
          </Container>
        </ContentWrapper>
      </div>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 100vw; /* 전체 너비 설정 */
  overflow: hidden; /* 오버플로우 숨기기 */
`;

const Container = styled.div`
  display: flex;
  flex-direction: row; /* 두 컴포넌트를 가로로 나란히 배치합니다. */
  align-items: flex-start;
  gap: 30px; /* 두 컴포넌트 사이의 간격을 설정합니다. */
  padding: 20px; /* 전체 컨테이너의 패딩을 설정합니다. */
  width: 100%; /* 전체 너비를 100%로 설정합니다. */
  box-sizing: border-box; /* 박스 크기 계산에 패딩과 테두리를 포함합니다. */
  background-color: #FEFDF6; /* 배경색 설정 */
  border-radius: 20px; /* 둥근 모서리 설정 */
`;

const ComponentWrapper = styled.div`
  flex: 1;
  max-width: 800px; /* 컴포넌트의 최대 너비를 설정합니다. 원하는 값으로 변경하세요. */
  box-sizing: border-box;
`;

export default Reviewresult;
