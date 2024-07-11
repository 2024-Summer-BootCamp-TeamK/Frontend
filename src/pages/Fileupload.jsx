import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Button from "../components/Button";
import Buttonall from "../components/Buttonall";
import {
  Headerall,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Headerall";
import logoSrc from "../images/logo.svg";
import uploadSrc from "../images/upload.svg";

const Fileupload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // 파일 처리 로직을 추가할 수 있습니다.
  }, []);

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
          <DropZoneBackground data={uploadSrc} type="image/svg+xml" />
          <DropZoneText>
            {isDragActive ? (
              <p>파일을 여기에 놓으세요 ...</p>
            ) : (
              <p>AI 검토 받을 파일을 올려주세요</p>
            )}
          </DropZoneText>
        </DropZone>
      </Wrapper>
      <ButtonWrapper>
        <Buttonall>검토 시작하기</Buttonall>
      </ButtonWrapper>
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
  width: 613px;
  height: 419px;
  left: calc(50% - 613px / 2 + 0.5px);
  top: calc(50% - 419px / 2 - 14.5px);
  background: rgba(255, 255, 255, 0.5);
  mix-blend-mode: normal;
  border: 3px dashed #e5b401;
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px; /* 문구를 아래쪽으로 배치 */
  position: relative;
`;

const DropZoneBackground = styled.object`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DropZoneText = styled.div`
  p {
    margin: 0;
    font-size: 20px;
    color: #a6a6a6;
    font-weight: 600; /* 세미볼드 */
    position: absolute;
    bottom: 20px; /* 텍스트를 아래쪽으로 배치 */
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
`;
