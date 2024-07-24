import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Orangebutton from "./Orangebutton";
import Toggleswitch from "./Toggleswitch";
import ModifiyviewSrc from "../images/Modifiyview.svg"; // 이미지 경로 확인
import ArticleDetail from "./ArticleDetail";
import { updateContractById } from "../services/updateContractService";

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

const Suggestion = ({ contractMain, contractToxin }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentText, setCurrentText] = useState("main");
  const [selectedArticleIds, setSelectedArticleIds] = useState(() => {
    const savedIds = localStorage.getItem("selectedArticleIds");
    return savedIds ? JSON.parse(savedIds) : [];
  });
  const [modifiedSections, setModifiedSections] = useState(() => {
    const savedSections = localStorage.getItem("modifiedSections");
    return savedSections ? JSON.parse(savedSections) : [];
  });

  

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
      setCurrentSection(0);
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
      // 중복 체크: 이미 선택된 조항 ID인지 확인
      if (!selectedArticleIds.includes(currentArticle.articleId)) {

        setSelectedArticleIds((prev) => {
          const newIds = [...prev, currentArticle.articleId];
          localStorage.setItem("selectedArticleIds", JSON.stringify(newIds));
          return newIds;
        });

        setModifiedSections((prev) => {
          const newModifiedSections = [...prev];
          newModifiedSections[currentSection] = true;
          localStorage.setItem(
            "modifiedSections",
            JSON.stringify(newModifiedSections)
          );
          return newModifiedSections;
        });

        console.log("선택된 계약서 ID:", currentArticle.articleId);
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
      setSelectedArticleIds((prev) => {
        const newIds = prev.filter((id) => id !== currentArticle.articleId);
        localStorage.setItem("selectedArticleIds", JSON.stringify(newIds));
        return newIds;
      });
      setModifiedSections((prev) => {
        const newModifiedSections = [...prev];
        newModifiedSections[currentSection] = false;
        localStorage.setItem(
          "modifiedSections",
          JSON.stringify(newModifiedSections)
        );
        return newModifiedSections;
      });
      console.log("제거된 계약서 ID:", currentArticle.articleId);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("전송할 계약서 ID 배열:", selectedArticleIds);
      const data = await updateContractById(
        contractMain.contractId,
        selectedArticleIds
      );
      console.log("서버 응답:", data);
      // 로컬 스토리지 초기화
      localStorage.removeItem("selectedArticleIds");
      localStorage.removeItem("modifiedSections");
      setSelectedArticleIds([]);
      setModifiedSections([]);

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
          <ProgressContainer>
            {sections.map((_, index) => (
              <ProgressDot
                key={index}
                active={index === currentSection}
                onClick={() => setCurrentSection(index)}
              />
            ))}
          </ProgressContainer>
          <Section className="active">
            <SectionContent className="slider__content">
              <SectionTitle>{sections[currentSection]}</SectionTitle>
              <SectionText className="slider__text">
                {currentArticle ? (
                  <>
                    <ArticleDetail
                      title="계약서 내부 조항"
                      content={currentArticle.sentence}
                    />
                    <ArticleDetail title="법" content={currentArticle.law} />
                    <ArticleDetail
                      title="상세 설명"
                      content={currentArticle.description}
                    />
                    {currentArticle.recommend && (
                      <ArticleDetail
                        title="수정 제안"
                        content={currentArticle.recommend}
                      />
                    )}
                  </>
                ) : (
                  <p>데이터를 불러오는 중입니다...</p>
                )}
              </SectionText>
              {currentText === "toxin" && (
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
                    modifiedSections[currentSection] && (
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
      <StyledOrangebutton
        style={{
          height: "100%;",
          top: "-13%",
          position: "relative",
          left: "12%",
          width: "auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          transform: "translateX(-50%)",
        }}
        onClick={handleSubmit}
      >
        <img src={ModifiyviewSrc} alt="modifyview" />
        수정안 보기
      </StyledOrangebutton>
    </Container>
  );
};

// 스타일드 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  height: 115vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
  margin-top: 1vh;
  border-radius: 20px;
  background-color: #fefdf6;
  flex-direction: column;
  gap: 1vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 130vh;
`;

const NavButton = styled.button`
  background-color: #e7470a;
  color: white;
  font-size: 14px;
  align-items: center;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 35vh;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow-y: auto; /* 세로 스크롤 추가 */
  flex: 1;
  width: 100%;
  align-items: flex-start;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px; /* 상단 마진 추가 */
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
  margin-top: 12vh;
  z-index: 1;
`;

const StyledOrangebutton = styled(Orangebutton)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px; /* 버튼과 섹션 간의 간격 추가 */
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

const Section = styled.div`
  scroll-snap-align: start;
  flex: none;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 18px;
  box-sizing: border-box;
  padding: 30px;
  color: #000000;
  opacity: 0; /* 초기 상태에서 opacity를 0으로 설정 */
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
  margin-bottom: 2vh;
  display: flex;
  align-items: center; /* 수직 정렬 추가 */
  justify-content: center; /* 수평 가운데 정렬 */
  margin-top: 5px;
`;

const SectionText = styled.div`
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
  height: auto; /* 높이를 자동으로 설정하여 스크롤 제거 */
  overflow: hidden; /* 스크롤 제거 */
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

export default Suggestion;

