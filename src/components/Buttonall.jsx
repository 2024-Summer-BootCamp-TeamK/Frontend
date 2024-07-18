import styled from "styled-components";

const Buttonall = ({ children, icon }) => (
  <StyledButton>
    {children}
    {icon && <Icon src={icon} alt="icon" />}
  </StyledButton>
);

export default Buttonall;

const StyledButton = styled.button`
  background-color: #ffffff;
  color: #141f7b;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border-color: #141f7b;
  border-width: 2.5px;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: #141f7b; 
    color: white;

    /* 이미지 대비 */
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(105%) contrast(102%);
    } 
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
    stroke: #edeac5; /* stroke 속성 설정 */
    stroke-width: 1; /* stroke-width 속성 설정 */
  }
`;

const Icon = styled.img`
  width: 20px; 
  height: 20px; 
  margin-left: 10px; 
  margin-top: 2px;
`;
