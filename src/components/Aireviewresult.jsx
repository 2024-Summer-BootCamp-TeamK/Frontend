import React from "react";
import styled from "styled-components";
import aireviewedSrc from "../images/aireviewed.svg"; // aireviewed.svg 파일 경로

const Aireviewresult = () => {
  return (
    <Container>
      <AireviewedIcon data={aireviewedSrc} type="image/svg+xml" />
      <Content>
        <h2>Vertical Scroll Component</h2>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>{" "}
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>{" "}
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
        <p>여기에 긴 내용이 들어갑니다...</p>
      </Content>
    </Container>
  );
};

export default Aireviewresult;

const Container = styled.div`
  top: 80px;
  width: 50%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  position: relative; /* 아이콘 배치를 위해 relative 설정 */
`;

const AireviewedIcon = styled.object`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
`;
/* image 165 */

const Content = styled.div`
  height: 200%;
  background-color: #fffff;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 120px; /* 아이콘과 내용 사이에 여백 추가 */
`;
