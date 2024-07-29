import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Orangebutton from "./Orangebutton";
import Toggleswitch from "./Toggleswitch";
import ModifiyviewSrc from "../images/Modifiyview.svg"; // 이미지 경로 확인
import ArticleDetail from "./ArticleDetail";
import { updateContractById } from "../services/updateContractService";
import Popuploading from "../components/Popuploading"; // Popuploading 임포트

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
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const [currentSection, setCurrentSection] = useState(0);
  const [currentText, setCurrentText] = useState("main");
  const [selectedArticleIds, setSelectedArticleIds] = useState(() => {
    const savedIds = sessionStorage.getItem("selectedArticleIds");
    return savedIds ? JSON.parse(savedIds) : [];
  });
  const [modifiedSections, setModifiedSections] = useState(() => {
    const savedSections = sessionStorage.getItem("modifiedSections");
    return savedSections ? JSON.parse(savedSections) : [];
  });

  const navigate = useNavigate();

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
      if (!selectedArticleIds.includes(currentArticle.articleId)) {
        setSelectedArticleIds((prev) => {
          const newIds = [...prev, currentArticle.articleId];
          sessionStorage.setItem("selectedArticleIds", JSON.stringify(newIds));
          return newIds;
        });

        setModifiedSections((prev) => {
          const newModifiedSections = [...prev];
          newModifiedSections[currentSection] = true;
          sessionStorage.setItem(
            "modifiedSections",
            JSON.stringify(newModifiedSections)
          );
          return newModifiedSections;
        });

        console.log("선택된 계약서 ID:", currentArticle.articleId);
      } else {
        console.warn(" ID가 이미 선택되었습니다.", currentArticle.articleId);
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

  const handleSubmit = async () => { setLoading(true);
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
     
      // 수정안 보기
      navigate("/Resultcompare", { state: { contractId } });
    } catch (error) {
      console.error("서버에 데이터 전송 중 오류 발생:", error);
      setLoading(false); }
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
      <GlobalStyle /> {loading && <Popuploading />}
      <ToggleswitchContainer>
        <Toggleswitch onChange={toggleText} />
      </ToggleswitchContainer>
      <ContentWrapper>
        <NavButton onClick={handlePrevClick} disabled={currentSection === 0}>
          {"<"}
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
                  <ModifyButton
                    onClick={
                      modifiedSections[currentSection]
                        ? handleCancelModifyClick
                        : handleModifyClick
                    }
                  >
                    {modifiedSections[currentSection] ? "취소" : "수정할래요!"}
                  </ModifyButton>
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
          {">"}
        </NavButton>
      </ContentWrapper>
      <StyledOrangebutton
        style={{
          height: "100%;",
          top: "-10%",
          position: "relative",
          backgroundColor: "#e7470a",
          color: "#fff",
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
        최종수정안 보기
      </StyledOrangebutton >
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
  border-radius: 20px;
  background-color: #fefdf6;
  flex-direction: column;
  margin-left: 3vw;
  gap: 2vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
`;

const NavButton = styled.button`
  background-color: #e95725;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.2vw;
  color: white;
  font-size: 1vw;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  margin-top: 32vh;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:active {
    outline: none;
  }

  &:focus {
    outline: none;
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
  margin-left: 1vw;
  margin-right: 1vw;
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
  margin-top: 15vh;
  z-index: 1;
`;

const StyledOrangebutton = styled(Orangebutton)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 2vh;
  padding: 8px 13px;
  border: 1px solid #e7470a;
  border-radius: 10px;
  cursor: pointer;

  img {
    width: 2.4vw;
    height: 2.4vh;
    margin-right: 3px;
  }
`;

const ModifyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  color: #e7470a;
  font-weight: bolde
  margin-top: 2vh;
  padding: 10px 13px; 
  border: 1px solid #e7470a;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.2s ease, border 0.2s ease, background-color 0.2s ease, color 0.2s ease;

  img {
    width: 2.1vw;
    height: 2.1vh;
}
  
  &:active {
    outline: none; 
    transform: scale(1);
  }
  
  &:focus {
    outline: none;
  }
    
  &:hover {
    border: 1px solid #e7470a;
    background-color: #e7470a;
    color: #fff;
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
  transform: translateY(10px);
  transition: all 0.4s;

  &.active {
    opacity: 1;
    transform: translateY(10);
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

