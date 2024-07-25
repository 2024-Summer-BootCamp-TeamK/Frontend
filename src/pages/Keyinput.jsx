import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Popupkeyinput from '../components/Popupkeyinput';
import Button from '../components/Button';
import {
    Headerall,
    LogoContainer,
    Logo,
    ButtonContainer,
} from '../components/Headerall';
import logoSrc from '../images/logo.svg';

const Keyinput = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();

    const handleSuccess = (password) => {
        navigate(`/pdf-editor`, { state: { documentId, password } });
    };

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
            <div>
                <Popupkeyinput documentId={documentId} onSuccess={handleSuccess} />
            </div>
        </>
    );
};

export default Keyinput;
