import React from 'react';
import styled from 'styled-components';
import shareInfoIcon from '../../images/share-info-icon.svg';

interface Props {
 // uploadNewPdf: () => void;
 // addText: () => void;
 // addImage: () => void;
  addDrawing: () => void;
  isPdfLoaded: boolean;
  savingPdfStatus: boolean;
  savePdf: () => void;
}

const MenuBar: React.FC<Props> = ({
//  uploadNewPdf,
  addDrawing,
//  addText,
//  addImage,
  isPdfLoaded,
  savingPdfStatus,
  savePdf,
}) => {

  return (
    <Footer>
        <FooterText>
          <InfoIcon src={shareInfoIcon} alt="Info icon" />
          자세한 설명이 필요하다면?
        </FooterText>
        <ButtonGroup>
          <SignButton onClick={addDrawing}>서명하기</SignButton>
          <SaveButton onClick={savePdf}>저장하기</SaveButton>
        </ButtonGroup>
  </Footer>
  );
};

export default MenuBar;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  margin-top: 20px;
  margin-bottom: 30px;
  color: var(--background-color);
`;

const InfoIcon = styled.img`
  width: 1.2vw;
  height: auto;
  margin-right: 8px;
`;

const FooterText = styled.div`
  position: absolute;
  left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #141f7b;
  margin-bottom: 5px; 
  display: flex;
  align-items: center;
`;


const ButtonGroup = styled.div`
  display: flex;
  gap: 150px;
  align-items: center;
  justify-content: center;
`;

const SignButton = styled.button`
  background-color: #fff;
  color: #141f7b;
  width: 13vw;
  min-width: 13vw;
  padding: 10px 20px;
  border: 2px solid #141f7b; 
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold; 
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #141f7b; 
    color: white; 
    outline: none; 
  }
`;

const SaveButton = styled.button`
 background-color: #141F7B;
  color: white;
  width: 13vw;
  min-width: 13vw;
  padding: 10px 20px;
  border: 2px solid #141f7b;
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold; 
  cursor: pointer;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #141f7b; 
    color: white;
    outline: none; 
  }
`;
