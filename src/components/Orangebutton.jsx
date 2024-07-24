import styled from "styled-components";

const Orangebutton = styled.button`
  background-color: #ffffff;
  color: #e7470a;
  padding: 10px 20px;
  border: 2px solid #e7470a;
  border-radius: 20px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  margin: 0;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    background-color: #e7470a; /* hover 시 배경색 */
    color: #ffffff; /* hover 시 글씨색 */
    border: 2px solid #e7470a;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.9);
    outline: none; /* 포커스 시 outline 제거 */
  }

  &:focus {
    outline: none;
  }

  svg {
    fill: rgba(255, 255, 255, 0.8); /* fill 속성에 투명도가 80%인 흰색 적용 */
    stroke: #edeac5; /* stroke 속성 설정 */
    stroke-width: 1; /* stroke-width 속성 설정 */
  }
`;

export default Orangebutton;
