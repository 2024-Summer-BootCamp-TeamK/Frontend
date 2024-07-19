import React, { useState, useEffect } from "react";
import styled from "styled-components";
import aireviewedSrc from "../images/aireviewed.svg"; // aireviewed.svg 파일 경로

const Aireviewresult = ({ contractData }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (contractData && contractData.contract) {
      setContent(contractData.contract);
    }
  }, [contractData]);

  return (
    <>
      <AireviewedIconWrapper>
        <AireviewedIcon data={aireviewedSrc} type="image/svg+xml" />
      </AireviewedIconWrapper>
      <Container>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Content>
      </Container>
    </>
  );
};

export default Aireviewresult;

const AireviewedIconWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 7vh; /* 헤더와의 간격 조정 */
`;

const AireviewedIcon = styled.object`
  width: 150px;
  height: 100px;
`;

const Container = styled.div`
  width: 45vw;
  height: 70vh; /* 뷰포트 높이를 가득 채움 */
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  position: relative; /* 아이콘 배치를 위해 relative 설정 */
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  } /* 이미지와의 간격 조정 */
`;

const Content = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px; /* 아이콘과 내용 사이에 여백 추가 */
  color: #000000;
`;
