import React, { useState, useEffect } from "react";
import styled from "styled-components";
import suggestcontract from "../images/suggestcontract.svg";
import { modifiedContract } from "../services/getModifiedContract";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import 추가
const Aireviewresult = ({contractId}) => {
  const [content, setContent] = useState("");
  console.log(contractId)
  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (contractId) {
          const pdfUrl = await modifiedContract(contractId); // pdf 파일 경로
          setContent(pdfUrl);
        } else {
          console.error("contractId is not provided.");
        }
      } catch (error) {
        alert('Error displaying PDF file');
      }
    };
    fetchContent();
  }, [contractId]); // contractId 의존성 추가
  return (
    <Wrapper>
      <Container>
        <AireviewedIconWrapper>
          <AireviewedIcon data={suggestcontract} type="image/svg+xml" />
        </AireviewedIconWrapper>
        <Content>
          {content ? (
            <iframe src={content} width="100%" height="600px" title="PDF Preview" />
          ) : (
            <p>PDF를 불러오는 중입니다...</p>
          )}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Aireviewresult;

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  margin-top: 9vh; /* 헤더와의 간격 조정 */
`;
ㅌㅈ
const AireviewedIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px; /* 아이콘과 컨테이너 사이의 간격 조정 */
  margin-bottom: -40px;
`;
const AireviewedIcon = styled.object`
  width: 150px;
  height: 10vh;
  border-radius: 20px;
`;
const Container = styled.div`
  width: 45vw;
  height: 75vh; /* 뷰포트 높이를 가득 채움 */
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  position: relative; /* 아이콘 배치를 위해 relative 설정 */
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000000;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  } /* 이미지와의 간격 조정 */
  font-size: 12px;
`;
const Content = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px; /* 아이콘과 내용 사이에 여백 추가 */
`;