import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Wallop from 'wallop'; // Assuming you have Wallop library installed

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Lato:400,400i,700");

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #141316;
    color: #FAFAFA;
  }

  p {
    margin-top: 0;
    margin-bottom: 30px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  button {
    background-color: transparent;
    border: none;
    width: 65px;
    padding: 20px;
    transition: opacity 200ms;
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    z-index: 2;

    svg {
      fill: #FAFAFA;
    }

    &:hover,
    &:focus {
      opacity: 0.6;
    }
  }

  .button--next {
    left: auto;
    right: 0;
    transform: translate3d(0, -50%, 0) rotate(180deg);
  }
`;

// Styled components
const Wrapper = styled.div`
  height: 100vh;
  min-height: 600px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideList = styled.ul`
  width: calc(100vw - 40px);
  height: calc(100vw / 2);
  font-family: Lato, sans-serif;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    width: 180px;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #141316 60%, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #141316 60%, transparent);
  }
`;

const SlideItem = styled.li`
  width: 100%;
  height: 100%;
  padding: 40px 65px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: ${(props) => (props.current ? 'relative' : 'absolute')};
  visibility: ${(props) => (props.current ? 'visible' : 'hidden')};
`;

const Heading = styled.h2`
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  opacity: 0;
  animation: ${(props) => (props.current ? slideIn : slideOut)} 1300ms forwards cubic-bezier(0.1, 0.67, 0.29, 0.98);
`;

const Quote = styled.p`
  font-size: 1.1rem;
  line-height: 1.4;
  letter-spacing: 0.03em;
  opacity: 0;
  animation: ${(props) => (props.current ? slideIn : slideOut)} 1300ms forwards cubic-bezier(0.1, 0.67, 0.29, 0.98) 420ms;
`;

const Cite = styled.cite`
  display: block;
  opacity: 0;
  animation: ${(props) => (props.current ? slideIn : slideOut)} 1300ms forwards cubic-bezier(0.1, 0.67, 0.29, 0.98) 540ms;
`;

const Button = styled.button`
  left: ${(props) => (props.next ? 'auto' : '0')};
  right: ${(props) => (props.next ? '0' : 'auto')};
  transform: ${(props) => (props.next ? 'translate3d(0, -50%, 0) rotate(180deg)' : 'translate3d(0, -50%, 0)')};
`;

// Keyframe animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100px);
  }
`;

// React component
const Loading3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    if (sliderRef.current) {
      const wallop = new Wallop(sliderRef.current);

      let prevIndex = 0;

      const removePrevClasses = (index) => {
        const slide = slidesRef.current[index];
        setTimeout(() => {
          slide.classList.remove('Wallop-item--hidePrevious', 'Wallop-item--hideNext');
        }, 600);
      };

      const onChange = () => {
        removePrevClasses(prevIndex);
        prevIndex = wallop.currentItemIndex;
        setCurrentIndex(wallop.currentItemIndex);
      };

      wallop.on('change', onChange);

      return () => {
        wallop.off('change', onChange); // Cleanup on unmount
      };
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div data-carousel ref={sliderRef}>
          <SlideList className="Wallop-list">
            {['Testimonial 1', 'Testimonial 2', 'Testimonial 3', 'Testimonial 4'].map((testimonial, index) => (
              <SlideItem
                key={index}
                className={`Wallop-item ${index === currentIndex ? 'Wallop-item--current' : ''}`}
                ref={(el) => (slidesRef.current[index] = el)}
                current={index === currentIndex}
              >
                <Heading current={index === currentIndex}>{testimonial}</Heading>
                <blockquote>
                  <Quote current={index === currentIndex}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Quote>
                  <Cite current={index === currentIndex}>AN Author</Cite>
                </blockquote>
              </SlideItem>
            ))}
          </SlideList>
          <Button
            className="button--prev Wallop-buttonPrevious"
            title="previous"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slidesRef.current.length) % slidesRef.current.length)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.9 50.2">
              <path d="M25.1 50.2L0 25.1 25.1 0l2.8 2.8L5.7 25.1l22.2 22.2z" />
            </svg>
          </Button>
          <Button
            className="button--next Wallop-buttonNext"
            title="next"
            next
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slidesRef.current.length)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.9 50.2">
              <path d="M25.1 50.2L0 25.1 25.1 0l2.8 2.8L5.7 25.1l22.2 22.2z" />
            </svg>
          </Button>
        </div>
      </Wrapper>
    </>
  );
};

export default Loading3;
