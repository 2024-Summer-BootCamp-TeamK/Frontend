import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import Button from "../components/Button";
import ReviewStartButtonComponent from "../components/ReviewStartButtonComponent";
import contractUpload from '../services/fileupload_API';

import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import uploadIconSrc from "../images/upload-icon.svg";

const Fileupload = () => {
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const category = location.state?.category;

  const onDrop = useCallback((acceptedFiles) => {
    setFileName(acceptedFiles[0].name);
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf_file', file);
    formData.append('category', category);

    try {
      const data = await contractUpload(formData);
      console.log('계약서 업로드 성공:', data);
      alert('계약서 업로드 성공! 계약서 ID: ' + data.contractId);

      navigate(`/contract/${data.contractId}`);
    } catch (error) {
      console.error('계약서 업로드 에러:', error.message);
      alert('계약서 업로드에 실패했습니다.');
    }
  };

  return (
    <>
      <div>
        <Headerall>
          <LogoContainer>
            <Logo src={logoSrc} alt="Logo" />
          </LogoContainer>
          <ButtonContainer>
            <Button onClick={() => navigate('/category')}>AI 검토 받으러 가기</Button>
            <Button onClick={() => navigate('/fileuploadshare')}>상대방과 계약서 검토하기</Button>
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
            <h3>{category ? `선택된 카테고리: ${category}` : '계약서 파일을 올려주세요'}</h3>
            {isDragActive ? (
              <p>파일을 여기에 놓으세요 ...</p>
            ) : (
              <p>{fileName ? `업로드된 파일 : ${fileName}` : ''}</p>
            )}
          </DropZoneText>
        </DropZone>
      </Wrapper>
      <ButtonContainerStyled>
        <ReviewStartButtonComponent onClick={handleUpload}>검토 시작하기</ReviewStartButtonComponent>
      </ButtonContainerStyled>
    </>
  );
};

export default Fileupload;

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
  padding-bottom: 50px; /* 문구를 아래쪽으로 배치 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 transform */
`;

const DropZoneText = styled.div`
  display: flex;
  align-items:center;
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
    color: ${(props) => (props.isFileUploaded ? '#000000' : '#a6a6a6')}; /* 파일이 업로드된 경우 검정색, 아니면 회색 */
    font-weight: 600;
    position: absolute;
    bottom: 25px; /* 텍스트를 아래쪽으로 배치 */
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap; /* 텍스트를 한 줄로 표시 */
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 말줄임표(...)로 표시 */
    max-width: 90%; /* 최대 너비 설정 */
  }

  img {
    width: 4.5vw; /* 이미지의 너비를 줄임 */
    height: auto; /* 이미지의 높이를 줄임 */
    background: transparent; /* 이미지 배경 투명하게 설정 */
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
  background-color: #FFD700; /* 노란색 */
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); /* 그림자 */
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 3vw;
  height: auto;
`;
