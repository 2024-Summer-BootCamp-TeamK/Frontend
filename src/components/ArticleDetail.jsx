import React from "react";
import styled from "styled-components";
import LabelImage from "../images/label.svg";

const ArticleDetail = ({ title, content }) => {
  return (
    <Paragraph>
      <LabelIcon src={LabelImage} alt="label" />
      <Title>{title}</Title>
      <br />
      <Content>{content}</Content>
    </Paragraph>
  );
};

export default ArticleDetail;


const Paragraph = styled.p`
  text-align: left;
`;

const LabelIcon = styled.img`
  margin-right: 9px;
  vertical-align: middle;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #141F7B;
`;

const Content = styled.span`
  display: block;
  margin-top: 8px; 
  padding-left: 1.2vw;
`;
