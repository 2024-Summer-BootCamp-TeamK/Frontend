import styled from "styled-components";

const Orangebutton = styled.button`
  background-color: #e7470a;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 17px;
  cursor: pointer;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #ffffff; /* 눌렸을 때 배경색 */
    color: #e7470a; /* 눌렸을 때 글씨색 */
    outline: none; /* 포커스 시 outline 제거 */

    svg {
      stroke: none; /* 눌렸을 때 stroke 속성 제거 */
      fill: white; /* 필요시 fill 속성 재설정 */
    }
  }
  svg {
    fill: rgba(255, 255, 255, 0.8); /* fill 속성에 투명도가 80%인 흰색 적용 */
    stroke: #edeac5; /* stroke 속성 설정 */
    stroke-width: 1; /* stroke-width 속성 설정 */
  }
`;
export default Orangebutton;
