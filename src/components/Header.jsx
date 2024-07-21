import styled from 'styled-components';

const Header = styled.header`
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
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none')};
  z-index: 1000; /* 다른 요소보다 위에 표시되도록 함 */
  justify-content: space-between; /* 왼쪽 끝에 로고, 오른쪽 끝에 버튼들 */
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
align-items: center;
gap: 20px; /* 버튼 간의 간격 설정 */

`;

export { Header, LogoContainer, Logo, ButtonContainer };
