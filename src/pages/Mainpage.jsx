import React from "react";
import Button from "../components/Button";
import {
  Header,
  LogoContainer,
  Logo,
  ButtonContainer,
} from "../components/Header";
import logoSrc from "../images/logo.svg"; // 로고 이미지 파일 경로
import main1Src from "../images/main1.svg"; // 추가할 SVG 이미지 파일 경로
import main2Src from "../images/main2.svg";
import main1_1Src from "../images/main1-1.svg";
import main1_2Src from "../images/main1-2.svg";
import main1_3Src from "../images/main1-3.svg";
import arrowSrc from "../images/arrow.svg";
import main2_1Src from "../images/main2-1.svg";
import main2_2Src from "../images/main2-2.svg";
import main2_3Src from "../images/main2-3.svg";
import mainendSrc from "../images/mainend.svg";
import Orangebutton from "../components/Orangebutton";

const Mainpage = () => {
  return (
    <>
      <div style={{ backgroundColor: "#fefdf6" }}>
        <Header>
          <LogoContainer>
            <Logo data={logoSrc} type="image/svg+xml" />
          </LogoContainer>
          <ButtonContainer>
            <Button>AI 검토 받으러 가기</Button>
            <Button>상대방과 계약서 검토하기</Button>
          </ButtonContainer>
        </Header>
        <div
          style={{
            textAlign: "center",
            paddingTop: "1vh",
            overflow: "hidden",
            height: "93vh",
            margin: 0,
            border: "none",
          }}
        >
          <object
            data={main1Src}
            type="image/svg+xml"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
              margin: 0,
              border: "none",
            }}
          >
            Your browser does not support SVGs
          </object>
        </div>
        <div
          style={{
            textAlign: "center",
            paddingTop: "0vh",
            overflow: "hidden",
            height: "50vh",
            margin: 0,
            border: "none",
          }}
        >
          <object
            data={main2Src}
            type="image/svg+xml"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
              margin: 0,
              border: "none",
            }}
          >
            Your browser does not support SVGs
          </object>
        </div>
        {/* 5개의 SVG 파일을 한 행에 배치 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "2vh 0",
          }}
        >
          <object
            data={main1_1Src}
            type="image/svg+xml"
            style={{
              width: "20%",
              height: "auto",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={arrowSrc}
            type="image/svg+xml"
            style={{ width: "5%", height: "auto" }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={main1_2Src}
            type="image/svg+xml"
            style={{
              width: "21%",
              height: "auto",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={arrowSrc}
            type="image/svg+xml"
            style={{ width: "5%", height: "auto" }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={main1_3Src}
            type="image/svg+xml"
            style={{
              width: "21%",
              height: "auto",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            Your browser does not support SVGs
          </object>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Orangebutton>계약서 검토 받으러 가기</Orangebutton>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "2vh 0",
          }}
        >
          <object
            data={main2_1Src}
            type="image/svg+xml"
            style={{
              width: "20%",
              height: "auto",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={arrowSrc}
            type="image/svg+xml"
            style={{ width: "5%", height: "auto" }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={main2_2Src}
            type="image/svg+xml"
            style={{
              width: "20%",
              height: "auto",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={arrowSrc}
            type="image/svg+xml"
            style={{ width: "5%", height: "auto" }}
          >
            Your browser does not support SVGs
          </object>
          <object
            data={main2_3Src}
            type="image/svg+xml"
            style={{
              width: "20%",
              height: "auto",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          >
            Your browser does not support SVGs
          </object>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Orangebutton>상대방과 계약서 검토하러 가기</Orangebutton>
        </div>
        <object
          data={mainendSrc}
          type="image/svg+xml"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            objectPosition: "center",
            margin: 0,
            border: "none",
          }}
        >
          Your browser does not support SVGs
        </object>
      </div>
    </>
  );
};

export default Mainpage;
