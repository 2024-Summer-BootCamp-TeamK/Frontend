import React, { useRef } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Aireviewresult2 from "../components/Aireviewresult2";
import Originalcontract from "../components/Originalcontract";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import Orangebutton from "../components/Orangebutton";
import arrow2Src from "../images/arrow2.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Resultcompare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contractId } = location.state || {};
  const aireviewRef = useRef();

  const handleFileUploadShareClick = () => {
    navigate("/fileuploadshare", { state: { contractId } });
  };

  const handleDownloadClick = () => {
    const pdfUrl = aireviewRef.current.getPdfUrl();
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'modified_contract.pdf';
      link.click();
    } else {
      alert('PDF URL이 없습니다.');
    }
  };

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
        <MainContent>
          <Container>
            <ComponentWrapper>
              <Originalcontract contractId={contractId} />
            </ComponentWrapper>
            <ArrowWrapper>
              <ArrowImage data={arrow2Src} type="image/svg+xml" />
            </ArrowWrapper>
            <ComponentWrapper>
              <Aireviewresult2 ref={aireviewRef} contractId={contractId} />
            </ComponentWrapper>
          </Container>
          <ButtonsWrapper>
            <Orangebutton onClick={handleFileUploadShareClick}>
              상대방과 검토하기
            </Orangebutton>
            <Orangebutton onClick={handleDownloadClick}>
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;PDF 저장
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Orangebutton>
          </ButtonsWrapper>
        </MainContent>
      </div>
    </>
  );
};

export default Resultcompare;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2vw; 
  padding: 1vw;
`;

const ComponentWrapper = styled.div`
  width: 90%;
  box-sizing: border-box;
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 13vh;
`;

const ArrowImage = styled.object`
  width: 3vw; 
  height: auto; 
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  margin-top: 20px; 
  gap: 30px; 
`;
