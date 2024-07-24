import React from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { contractId, contractMain, contractToxin } = location.state || {};

  return (
    <>
      <PageWrapper>
        <HeaderWrapper>
          <Headerall>
            <LogoContainer>
              <Logo data={logoSrc} type="image/svg+xml" />
            </LogoContainer>
            <ButtonContainer>
              <Button>AI 검토 받으러 가기</Button>
              <Button>상대방과 계약서 검토하기</Button>
            </ButtonContainer>
          </Headerall>
        </HeaderWrapper>
        <ContentWrapper>
          <Container>
            <ComponentWrapper>
              <Aireviewresult contractDataMain={contractMain}  contractDataToxin={contractToxin}/>
            </ComponentWrapper>
            <ComponentWrapper>
              <Suggestion
                contractId = {contractId}
                contractMain={contractMain}
                contractToxin={contractToxin}
              />
            </ComponentWrapper>
          </Container>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이로 설정 */
  width: 100vw; /* 전체 화면 너비로 설정 */
  overflow: hidden; /* 오버플로우 숨기기 */
  padding: 0; /* 전체 페이지의 여백을 0으로 설정 */
  margin: 0; /* 전체 페이지의 여백을 0으로 설정 */
`;

const HeaderWrapper = styled.div`
  flex: 0 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; /* 나머지 공간을 채우도록 설정 */
  overflow: hidden; /* 오버플로우 숨기기 */
  padding: 0; /* 좌우 여백을 최소화 */
  width: 100%; /* 전체 너비를 100%로 설정 */
`;

const Container = styled.div`
  display: flex;
  flex-direction: row; /* 두 컴포넌트를 가로로 나란히 배치합니다. */
  align-items: flex-start;
  gap: 30px; /* 두 컴포넌트 사이의 간격을 설정합니다. */
  width: 100%; /* 전체 너비를 100%로 설정 */
  box-sizing: border-box; /* 박스 크기 계산에 패딩과 테두리를 포함합니다. */
  background-color: #fefdf6; /* 배경색 설정 */
  border-radius: 10px; /* 둥근 모서리 설정 */
  margin: 0; /* 전체 컨테이너의 여백을 0으로 설정 */
  padding-left: 50px;
  padding-top: 50px;

`;

const ComponentWrapper = styled.div`
  flex: 1;
  max-width: 800px; /* 컴포넌트의 최대 너비를 설정합니다. 원하는 값으로 변경하세요. */
  box-sizing: border-box;
  overflow: auto; /* 개별 컴포넌트 내부 스크롤 허용 */
`;

export default Reviewresult;
