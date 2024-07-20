import styled from "styled-components";

const Headerall = styled.header`
  position: fixed; /* 상단에 고정 */
  top: 0;
  left: 0;
  right: 0;
  height: 10vh; /* 화면 높이의 10% */
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  background-color: #fefdf6;
  padding: 0 20px;
  text-align: center;
  font-size: 24px;
  z-index: 1000; /* 다른 요소보다 위에 표시되도록 함 */
  justify-content: space-between; /* 왼쪽 끝에 로고, 오른쪽 끝에 버튼들 */


  /* 구분선 추가 */
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -1px; /* Headerall 컴포넌트 바로 아래에 선을 위치시키기 위해 */
    left: 0;
    right: 0;
    height: 2px; /* 선의 두께 */
    background-color: #141f7b; /* 선의 색상 */
  }
`;

const LogoContainer = styled.div`
  height: 90%; /* 로고 이미지 높이를 헤더 높이에 맞춤 */
  display: flex;
  align-items: center;
`;

const Logo = styled.object`
  height: 100%; /* 로고 이미지 높이를 컨테이너 높이에 맞춤 */
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; /* 버튼 간의 간격 */
  margin-right: calc(100vw - 101%); /* 스크롤바 공간을 제거하기 위한 여백 추가 */  
`;
export { Headerall, LogoContainer, Logo, ButtonContainer };
