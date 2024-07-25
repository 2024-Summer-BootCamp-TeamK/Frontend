import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Popupkeycreate from '../components/Popupkeycreate';
import Button from '../components/Button';

import {
    Headerall,
    LogoContainer,
    Logo,
    ButtonContainer,
} from '../components/Headerall';
import logoSrc from '../images/logo.svg'; // logo.svg 파일 경로를 올바르게 설정

const Key = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pdfFile } = location.state || {}; // state에서 file 가져오기
    const fileName = pdfFile ? pdfFile.name : '! 업로드 된 파일이 없습니다'; // 파일 이름 추출

    return (
        <>
            <Headerall>
                <LogoContainer>
                    <Logo data={logoSrc} type="image/svg+xml" />
                </LogoContainer>
                <ButtonContainer>
                    <Button onClick={() => navigate('/category')}>AI 검토 받으러 가기</Button>
                    <Button onClick={() => navigate('/fileuploadshare')}>상대방과 계약서 검토하기</Button>
                </ButtonContainer>
            </Headerall>
            <Container>
                <FileName>{fileName}</FileName> {/* 파일 이름 출력 */}
                <Popupkeycreate pdfFile={pdfFile} />
            </Container>
        </>
    );
};

export default Key;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:5vh;
`;

const FileName = styled.h5`
  margin: 20px 0;
  margin-top: 150px;
  font-size: 16px;
  color: #c0c0c0;
  text-align: center;
`;
