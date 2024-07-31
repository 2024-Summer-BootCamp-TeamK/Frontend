import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Popupkeyinput from '../components/Popupkeyinput';
import Button from '../components/Button2';
import Headerall from '../components/Headerall';
import logoSrc from '../images/logo.svg';


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
