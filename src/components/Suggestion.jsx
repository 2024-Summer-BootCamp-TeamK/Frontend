import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Orangebutton from "./Orangebutton";
import Toggleswitch from "./Toggleswitch";
import ModifiyviewSrc from "../images/Modifiyview.svg"; // 이미지 경로 확인
import LabelImage from "../images/label.svg"; // label.svg 이미지 경로 추가
import axios from "axios"; // Axios 추가
import { updateContractById } from "../services/updateContractService";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import 추가

import ArticleDetail from "./ArticleDetail";

const GlobalStyle = createGlobalStyle`
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    color-scheme: dark;
  }
  body {
    min-height: 100vh;
    padding
    color: white;
    font-family: semi-bold;
    display: grid;
    place-content: center;
    background-color: #2c2c2c; /* 배경색 추가 */
  }
`;

const Suggestion = ({ contractId, contractMain, contractToxin }) => {
  const [currentSection, setCurrentSection] = useState(0); // 현재 섹션 상태
  const [currentText, setCurrentText] = useState("main"); // 현재 텍스트 파일 상태
  const [selectedArticleIds, setSelectedArticleIds] = useState(() => {
    // localStorage에서 초기값 가져오기
    const savedIds = localStorage.getItem("selectedArticleIds");
    return savedIds ? JSON.parse(savedIds) : [];
  }); // 선택된 계약서 ID 배열 상태
  const [modifiedSections, setModifiedSections] = useState(() => {
    // localStorage에서 초기값 가져오기
    const savedSections = localStorage.getItem("modifiedSections");
    return savedSections ? JSON.parse(savedSections) : [];
  }); // 수정된 섹션 상태

  const navigate = useNavigate(); // useNavigate 훅 선언

  const mainSections = contractMain.articles.map(
    (article, index) => `주요조항 ${index + 1}`
  );
  const toxinSections = contractToxin.articles.map(
    (article, index) => `주의조항 ${index + 1}`
  );
  const sections = currentText === "main" ? mainSections : toxinSections;

  const handlePrevClick = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const toggleText = () => {
    setCurrentText((prevText) => {
      const newText = prevText === "main" ? "toxin" : "main";
      setCurrentSection(0); // 텍스트 파일 변경 시 섹션을 첫 번째 섹션으로 이동
      return newText;
    });
  };

  const handleModifyClick = () => {
    const currentArticle =
      currentText === "main"
        ? contractMain.articles[currentSection]
        : contractToxin.articles[currentSection];

    if (currentArticle && currentArticle.articleId) {
      // 중복 체크: 이미 선택된 조항 ID인지 확인
      if (!selectedArticleIds.includes(currentArticle.articleId)) {

        setSelectedArticleIds((prev) => {
          const newIds = [...prev, currentArticle.articleId];
          localStorage.setItem("selectedArticleIds", JSON.stringify(newIds)); // localStorage에 저장
          return newIds;
        }); // 계약서 ID 추가

        // 수정된 섹션 상태 업데이트
        setModifiedSections((prev) => {
          const newModifiedSections = [...prev];
          newModifiedSections[currentSection] = true; // 현재 섹션을 수정된 섹션으로 표시
          localStorage.setItem(
            "modifiedSections",
            JSON.stringify(newModifiedSections)
          ); // localStorage에 저장
          return newModifiedSections;
        });

        console.log("선택된 조항 ID:", currentArticle.articleId); // 추가된 ID 확인
      } else {
        console.warn(
          " ID가 이미 선택되었습니다.",
          currentArticle.articleId
        );
      }
    } else {
      console.warn("현재 조항이 없습니다.");
    }
  };

  const handleCancelModifyClick = () => {
    const currentArticle =
      currentText === "main"
        ? contractMain.articles[currentSection]
        : contractToxin.articles[currentSection];

    if (currentArticle && currentArticle.articleId) {
      // 선택된 계약서 ID에서 현재 섹션의 ID만 제거
      setSelectedArticleIds((prev) => {
        const newIds = prev.filter((id) => id !== currentArticle.articleId); // 계약서 ID 제거
        localStorage.setItem("selectedArticleIds", JSON.stringify(newIds)); // localStorage에 저장
        return newIds;
      });
      setModifiedSections((prev) => {
        const newModifiedSections = [...prev];
        newModifiedSections[currentSection] = false; // 현재 섹션을 수정되지 않은 섹션으로 표시
        localStorage.setItem(
          "modifiedSections",
          JSON.stringify(newModifiedSections)
        ); // localStorage에 저장
        return newModifiedSections;
      });
      console.log("제거된 계약서 ID:", currentArticle.articleId); // 제거된 ID 확인
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("전송할 계약서 ID 배열:", selectedArticleIds); // 전송할 ID 배열 확인
      const data = await updateContractById(
        contractMain.contractId,
        selectedArticleIds
      );
      console.log("서버 응답:", data);
      // 배열 및 localStorage 초기화 코드를 제거했습니다.
      navigate("/Resultcompare", { state: { contractId } }); // contractId와 함께 네비게이트
    } catch (error) {
      console.error("서버에 데이터 전송 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    console.log(
      `현재 인덱스: ${currentSection}, 텍스트: ${sections[currentSection]}`
    );
  }, [currentSection, sections]);

  const currentArticle =
    currentText === "main"
      ? contractMain.articles[currentSection]
      : contractToxin.articles[currentSection];

  return (
    <Container>
      <GlobalStyle />
      <ToggleswitchContainer>
        <Toggleswitch onChange={toggleText} />
      </ToggleswitchContainer>
      <ContentWrapper>
        <NavButton onClick={handlePrevClick} disabled={currentSection === 0}>
          이전
        </NavButton>
        <Content>
          <Section className="active">
            <SectionContent className="slider__content">
              <SectionTitle>{sections[currentSection]}</SectionTitle>
              <SectionText className="slider__text">
                {currentArticle ? (
                  <>
                  <ArticleDetail title="계약서 내부 조항" content={currentArticle.sentence}/>
                  <ArticleDetail title="법" content={currentArticle.law}/>
                  <ArticleDetail title="상세 설명" content={currentArticle.description}/>
                 {currentArticle.recommend && (
                  <ArticleDetail title="수정 제안" content={currentArticle.recommend}/>
                  )}
                  </>
                ) : (
                  <p>데이터를 불러오는 중입니다...</p>
                )}
              </SectionText>
              {currentText === "toxin" && ( // 각 세션에 버튼 표시
              <>
                <StyledOrangebutton
                  onClick={
                    modifiedSections[currentSection]
                      ? handleCancelModifyClick
                      : handleModifyClick
                  }
                >
                  {modifiedSections[currentSection]
                    ? "추천안으로 수정 취소하기"
                    : "추천안으로 수정하기"}
                </StyledOrangebutton>
              
              {currentText === "toxin" &&
                modifiedSections[currentSection] && ( // 수정 여부에 따라 메시지 표시
                  <ModifiedMessage>수정안 담김</ModifiedMessage>
                )}
              </>
            )}
            </SectionContent>
          </Section>
        </Content>
        <NavButton
          onClick={handleNextClick}
          disabled={currentSection === sections.length - 1}
        >
          다음
        </NavButton>
      </ContentWrapper>
      <ProgressContainer>
        {sections.map((_, index) => (
          <ProgressDot
            key={index}
            active={index === currentSection}
            onClick={() => setCurrentSection(index)}
          />
        ))}
      </ProgressContainer>
      <StyledOrangebutton

        onClick={handleSubmit}
      >
        <img src={ModifiyviewSrc} alt="modifyview" />
        수정안 보기
      </StyledOrangebutton>
    </Container>
  );
};

export default Suggestion;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
  margin-top: 0px;
  border-radius: 20px;
  background-color: #fefdf6;
  flex-direction: column;
  gap: 0px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90%;
 
`;

const NavButton = styled.button`
  background-color: #e7470a;
  color: white;
  font-size: 14px;
  
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  overflow-y: auto; /* 세로 스크롤 추가 */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  flex: 1;
  width: 100%;
  align-items: center;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Section = styled.div`
  scroll-snap-align: start;
  flex: none;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  box-sizing: border-box;
  padding: 20px;
  color: #000000;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.4s;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionContent = styled.div`
  text-align: center;
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0d0925;
  margin-bottom: 20px;
  display: flex;
  align-items: center; /* 수직 정렬 추가 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center;
`;

const SectionText = styled.div`
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
  height: 300px; /* 고정된 높이 설정 */
  overflow-y: auto; /* 내부 스크롤 활성화 */
`;

const ProgressContainer = styled.div`
  position: absolute;
  top: 80px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top:20px; 
`;

const ProgressDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#E7470A" : "#ccc")};
  border-radius: 50%;
  cursor: pointer;
`;

const ToggleswitchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  z-index: 1;
`;

const StyledOrangebutton = styled(Orangebutton)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  padding: 10px 20px; /* 버튼 패딩 추가 */
  background-color: #e7470a; /* 버튼 배경색 추가 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const ModifiedMessage = styled.div`
  margin-top: 10px;
  padding: 5px 10px;
  border: 1px solid #e7470a;
  background-color: #fff3e0; /* 연한 배경색 */
  color: #e7470a;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 14px; /* 폰트 크기 조정 */
  width: auto;
  display: inline-block;
  vertical-align: middle;
`; 