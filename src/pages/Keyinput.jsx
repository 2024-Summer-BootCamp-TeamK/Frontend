import React from 'react';
import styled from 'styled-components';
import Popupkeyinput from '../components/Popupkeyinput';
import Button from '../components/Button';
import {
    Headerall,
    LogoContainer,
    Logo,
    ButtonContainer,
} from '../components/Headerall';
import logoSrc from '../images/logo.svg'; // logo.svg 파일 경로를 올바르게 설정

const Keyinput = () => {
    return (
        <>
            <Headerall>
                <LogoContainer>
                    <Logo data={logoSrc} type="image/svg+xml" />
                </LogoContainer>
                <ButtonContainer>
                    <Button>AI 검토 받으러 가기</Button>
                    <Button>상대방과 계약서 검토하기</Button>
                </ButtonContainer>
            </Headerall>
            <div>
                <Popupkeyinput />
            </div>
        </>
    );
};

export default Keyinput;
