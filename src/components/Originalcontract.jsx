import React, { useState, useEffect } from "react";
import styled from "styled-components";
import originalcontractsvg from "../images/originalcontract.svg";

const Originalcontract = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // 텍스트 파일을 불러오는 함수
    const fetchContent = async () => {
      try {
        const response = await fetch("/path/to/textfile.txt"); // 텍스트 파일 경로
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <Wrapper>
      <Container>
        <OriginalcontractWrapper>
          <Originalcontractsvg
            data={originalcontractsvg}
            type="image/svg+xml"
          />
        </OriginalcontractWrapper>
        <Content>
          <p>{content}</p>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Originalcontract;

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  margin-top: 9vh; /* 헤더와의 간격 조정 */
`;

const OriginalcontractWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px; /* 아이콘과 컨테이너 사이의 간격 조정 */
  margin-bottom: -40px; /* 아이콘과 컨테이너 사이의 간격 조정 */
`;

const Originalcontractsvg = styled.object`
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
