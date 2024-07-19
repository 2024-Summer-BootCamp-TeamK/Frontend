import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ReviewStartButtonComponent from "../components/ReviewStartButtonComponent";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import uploadIconSrc from "../images/upload-icon.svg";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setFileName(acceptedFiles[0].name);
    console.log(acceptedFiles);
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

 
  return (
    <>
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
      <Wrapper>
        <DropZone {...getRootProps()}>
          <input {...getInputProps()} />
          <DropZoneText isFileUploaded={!!fileName}>
            <YellowBox>
              <Icon src={uploadIconSrc} alt="upload-file-icon" />
            </YellowBox>
            <h3>계약서 파일을 올려주세요</h3>
            {isDragActive ? (
              <p>파일을 여기에 놓으세요 ...</p>
            ) : (
              <p>{fileName ? `업로드된 파일: ${fileName}` : ''}</p>
            )}
          </DropZoneText>
        </DropZone>
      </Wrapper>
      <ButtonContainerStyled>
        <ReviewStartButtonComponent>검토 시작하기</ReviewStartButtonComponent>
      </ButtonContainerStyled>
    </>
  );
};

export default FileUpload;

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding-top: 60px;
`;

const DropZone = styled.div`
  position: absolute;
  width: 780px;
  height: 490px;
  left: 50%;
  top: 50%;
  background: #ffffff;
  mix-blend-mode: normal;
  border: 3px dashed #e5b401;
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  transform: translate(-50%, -50%);
`;

const DropZoneText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    font-size: 26px;
    font-weight: 600;
    margin-top: 15px;
    color: #000;
  }

  p {
    margin: 0;
    font-size: ${(props) => (props.isFileUploaded ? '28px' : '22px')};
    color: ${(props) => (props.isFileUploaded ? '#000000' : '#a6a6a6')};
    font-weight: 600;
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
  }

  img {
    width: 4.5vw;
    height: auto;
    background: transparent;
  }
`;

const ButtonContainerStyled = styled.div`
  position: absolute;
  bottom: 40px;
  right: 3%;
  transform: translateX(0%);
`;

const YellowBox = styled.div`
  width: 140px;
  height: 170px;
  background-color: #ffd700;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 3vw;
  height: auto;
`;
