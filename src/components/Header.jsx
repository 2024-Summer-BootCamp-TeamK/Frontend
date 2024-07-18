import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #FEFDF6;
  transition: box-shadow 0.3s ease;
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none')};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
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
  gap: 10px; /* 버튼 간의 간격 */
`;

export { Header, LogoContainer, Logo, ButtonContainer };
