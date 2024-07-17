import React from "react";
import styled from "styled-components";

const Image = styled.img`
  margin-top: 20px;
  border: 1px solid #000;
`;

const SignatureImage = ({ src }) => {
  return <Image src={src} alt="전자서명 이미지" />;
};

export default SignatureImage;
