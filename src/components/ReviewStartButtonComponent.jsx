import styled from "styled-components";

const ReviewStartButtonComponent = ({ children, onClick}) => (
   <ButtonWrapper>
   <StyledButton onClick={onClick}>
     <span className="text">{children}
     </span>
     <div className="icon-container">
       <div className="icon icon--left">
         <svg>
           <use xlinkHref="#arrow-right"></use>
         </svg>
       </div>
       <div className="icon icon--right">
         <svg>
           <use xlinkHref="#arrow-right"></use>
         </svg>
       </div>
     </div>
   </StyledButton>
   <svg style={{ display: 'none' }}>
     <symbol id="arrow-right" viewBox="0 0 20 10">
       <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
     </symbol>
   </svg>
 </ButtonWrapper>
);

export default ReviewStartButtonComponent;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg);
`;

const Icon = styled.img`
  width: 20px; 
  height: 20px; 
  margin-left: 5px; 
  margin-top: 8px;
`;

const StyledButton = styled.button`
  --width: 230px;
  --height: 60px;
  position: relative;
  min-width: var(--width);
  min-height: var(--height);
  border-color: #141f7b;
  border-width: 2.5px;
  border-radius: var(--height);
  color: #fff;
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 22px;
  background: #141f7b;
  color: #fffff;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

  .text,
  .icon-container {
    position: relative;
    z-index: 2;
  }

  .icon-container {
    --icon-size: 25px;
    position: relative;
    width: var(--icon-size);
    height: var(--icon-size);
    margin-left: 20px;
    transition: transform 500ms ease;

    .icon {
      position: absolute;
      left: 0;
      top: 0;
      width: var(--icon-size);
      height: var(--icon-size);
      transition: transform 500ms ease, opacity 250ms ease;

      &--left {
        transform: translateX(-200%);
        opacity: 0;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: #fff;
        transition: fill 500ms ease; /* 색상 변경 애니메이션 추가 */
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--btn-bg);
    border-radius: var(--height);
    z-index: 1;
    transition: transform 500ms ease;
  }

  &:hover {
    &::after {
      transform: translateX(70%);
      background-color: #ffffff;
      color: #141f7b;
    }
 
    .icon-container {
      transform: translateX(60%);
      .icon {
        &--left {
          transform: translateX(0);
          opacity: 1;
        }
        &--right {
          transform: translateX(30%);
          opacity: 0;
        }
      }
      svg {
        width: 100%;
        height: 100%;
        fill: #141f7b;
      }
    }
  }
`;
