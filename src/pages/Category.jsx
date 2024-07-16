import React from 'react';
import styled from 'styled-components';
import logo from '../images/file.png';  
const items = [
    { id: 1, label: '계약서 1' },
    { id: 2, label: '계약서 2' },
    { id: 3, label: '근로 계약서' },
    { id: 4, label: '계약서 4' },
    { id: 5, label: '계약서 5' },
];

const Category = () => {
    const [activeIndex, setActiveIndex] = React.useState(2);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    return (
        <Container>
            <ArrowButton onClick={handlePrev}>{"<"}</ArrowButton>
            <Carousel>
                <CarouselTrack activeIndex={activeIndex}>
                    {items.map((item, index) => (
                        <CarouselItem
                            key={item.id}
                            active={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        >
                            <IconWrapper active={index === activeIndex}>
                                <Icon src={logo} />
                            </IconWrapper>
                            <Label>{item.label}</Label>
                        </CarouselItem>
                    ))}
                </CarouselTrack>
            </Carousel>
            <ArrowButton onClick={handleNext}>{">"}</ArrowButton>
        </Container>
    );
};

export default Category;

// Styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
`;

const CarouselItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  opacity: ${props => (props.active ? 1 : 0.5)};
  transform: ${props => (props.active ? 'scale(1.2)' : 'scale(1)')};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ activeIndex }) => `translateX(calc(50% - ${(activeIndex * 246.73) + 123.365}px))`};
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

  @media (max-width: 768px) {
    width: 118.36px;
    height: 138.21px;
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const Label = styled.span`
  font-size: 30px;
  color: black;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ArrowButton = styled.button`
  background-color: #141F7B;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 5px;

  &:hover {
    background-color: #0f154b;
  }
`;
