import styled from "styled-components";

const Button = styled.button`
  background-color: #fefdf6;
  color: #141f7b;
  padding: 10px 20px;
  border: 2px solid #141f7b; /* 외곽선 추가 */
  border-radius: 20px;
  font-size: 17px;
  font-weight: bold; /* 글씨 두께를 bold로 설정 */
  cursor: pointer;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  &:active,
  &:focus {
    background-color: #141f7b; /* 눌렸을 때 배경색 */
    color: white; /* 눌렸을 때 글씨색 */
    outline: none; /* 포커스 시 outline 제거 */

    svg {
      stroke: none; /* 눌렸을 때 stroke 속성 제거 */
      fill: white; /* 필요시 fill 속성 재설정 */
    }
  }
  svg {
    fill: rgba(255, 255, 255, 0.8); /* fill 속성에 투명도가 80%인 흰색 적용 */

    stroke: #141f7b; /* 기본 stroke 색상 */
    stroke-width: 2; /* stroke-width 속성 설정 */
  }
`;
export default Button;
