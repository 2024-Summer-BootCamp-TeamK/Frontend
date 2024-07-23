import React from "react";
import LabelImage from "../images/label.svg"; // label.svg �̹��� ��� �߰�

const ArticleDetail = ({ title, content }) => {
  return (
    <p style={{ textAlign: "left" }}>
      <img
        src={LabelImage}
        alt="label �̹���"
        style={{ marginRight: "5px", verticalAlign: "middle" }}
      />
      <span style={{ fontWeight: "bold" }}>{title}:</span>
      <br />
      {content}
    </p>
  );
};

export default ArticleDetail;
