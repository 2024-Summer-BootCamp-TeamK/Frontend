import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button2";
import Suggestion from "../components/Suggestion";
import Aireviewresult from "../components/Aireviewresult";
import Headerall from "../components/Headerall";
import logoSrc from "../images/logo.svg"; // logo.svg 파일 경로를 올바르게 설정

const Reviewresult = () => {
  const location = useLocation();
  const { contractId, contractMain, contractToxin } = location.state || {};

  return (
    <>
      <PageWrapper>
        <HeaderWrapper>
          <Headerall>
            
          </Headerall>
        </HeaderWrapper>

        <ContentWrapper>
          <Container>
            <ComponentWrapper>
              <Aireviewresult contractDataMain={contractMain}  contractDataToxin={contractToxin}/>
            </ComponentWrapper>
            <ComponentWrapper style={{ marginRight: "50px" }}>
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
 
  border-radius: 10px; /* 둥근 모서리 설정 */
  margin: 0; /* 전체 컨테이너의 여백을 0으로 설정 */
  padding-left: 50px;
  padding-top: 50px;

`;

const ComponentWrapper = styled.div`
  flex: 1;
  max-width: 800px; /* 컴포넌트의 최대 너비를 설정합니다. 원하는 값으로 변경하세요. */
  box-sizing: border-box;
  &:nth-child(2) {
    margin-left: -50px; /* 두 번째 컴포넌트를 왼쪽으로 50px 이동 */
  }
`;

export default Reviewresult;
