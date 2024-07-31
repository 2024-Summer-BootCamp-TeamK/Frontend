import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Popupkeyinput from '../components/Popupkeyinput';
import Button from '../components/Button';
import Headerall from "../components/Headerall";
import logoSrc from "../images/logo.svg"; // logo.svg 파일 경로를 올바르게 설정

const Keyinput = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();

    const handleSuccess = (password, username) => {
        navigate(`/pdf-editor`, { state: { documentId, password, username } });
    };

    return (
        <>
            <Headerall>
 
            </Headerall>
            <div>
                <Popupkeyinput documentId={documentId} onSuccess={handleSuccess} />
            </div>
        </>
    );
};

export default Keyinput;
