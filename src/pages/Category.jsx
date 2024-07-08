import React from 'react';
import styled from 'styled-components';

const items = [
    { id: 1, label: '계약서 1' },
    { id: 2, label: '계약서 2' },
    { id: 3, label: '근로 계약서' },
    { id: 4, label: '계약서 4' },
    { id: 5, label: '계약서 5' },
  ];

  const Category = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
  
    return (
      <Container>
        <Carousel>
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              className={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <IconWrapper active={index === activeIndex}>
              <Icon />
            </IconWrapper>
            <Label>{item.label}</Label>
          </CarouselItem>
        ))}
      </Carousel>
    </Container>
  );
};

export default Category;

// Styled-components
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh; /* 화면 높이 전체를 차지하도록 설정 */
  width: 100%;
  padding: 0 100px; /* 양쪽에 패딩을 추가하여 시작과 끝에서의 간격을 확보 */
`;

const Carousel = styled.div`
  display: flex;
  justify-content: space-evenly;;
  align-items: center;
  width: 100%;
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:  10px;
  cursor: pointer;
  opacity: ${props => (props.active ? 1 : 0.5)};
  transform: ${props => (props.active ? 'scale(1.2)' : 'scale(1)')};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const IconWrapper = styled.div`
  width: 236.73px;
  height: 276.43px;
  background-color: ${props => (props.active ? '#141F7B' : '#FAD23F')};
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url('/path/to/your/icon.png'); /* 실제 아이콘 경로 설정 */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Label = styled.span`
  font-size: 30px;
  color: black;
`;