// import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import { ReactComponent as S } from '../images/text/s.svg';
// import { ReactComponent as H } from '../images/text/h.svg';
// import { ReactComponent as A } from '../images/text/a.svg';
// import { ReactComponent as R } from '../images/text/r.svg';
// import { ReactComponent as E } from '../images/text/e.svg';
// import { ReactComponent as Y } from '../images/text/y.svg';
// import { ReactComponent as O } from '../images/text/o.svg';
// import { ReactComponent as U } from '../images/text/u.svg';
// import { ReactComponent as C } from '../images/text/c.svg';
// import { ReactComponent as N } from '../images/text/n.svg';
// import { ReactComponent as T } from '../images/text/t.svg';
// import { ReactComponent as W } from '../images/text/w.svg';
// import { ReactComponent as I } from '../images/text/i.svg';

// // H 애니메이션 키프레임 정의
// const HLeftMove = keyframes`
//   0% { stroke-dashoffset: 124px; }
//   5% { stroke-dashoffset: 0px; }
//   100% { stroke-dashoffset: 0px; }
// `;

// const HMidMove = keyframes`
//   0% { stroke-dashoffset: 37px; }
//   5% { stroke-dashoffset: 37px; }
//   10% { stroke-dashoffset: 0px; }
//   100% { stroke-dashoffset: 0px; }
// `;

// const HRightMove = keyframes`
//   0% { stroke-dashoffset: 124px; }
//   5% { stroke-dashoffset: 124px; }
//   10% { stroke-dashoffset: 0px; }
//   100% { stroke-dashoffset: 0px; }
// `;

// // E 애니메이션 키프레임 정의
// const ELeftMove = keyframes`
//   0% { stroke-dashoffset: 124px; }
//   2% { stroke-dashoffset: 124px; }
//   6% { stroke-dashoffset: 0px; }
//   100% { stroke-dashoffset: 0px; }
// `;

// const ETopMove = keyframes`
//   0% { stroke-dashoffset: 47px; }
//   6% { stroke-dashoffset: 47px; }
//   11% { stroke-dashoffset: 0px; }
//   100% { stroke-dashoffset: 0px; }
// `;

// const EMidMove = keyframes`
//   0% { stroke-dashoffset: 42px; }
//   8% { stroke-dashoffset: 42px; }
//   13% { stroke-dashoffset: 0px; }
//   100% { stroke-dashoffset: 0px; }
// `;

// const EBottomMove = keyframes`
//   0% { stroke-dashoffset: 47px; }
//   11% { stroke-dashoffset: 47px; }
//   16% { stroke-dashoffset: 0px; }
//   100% { stroke-dashoffset: 0px; }
// `;

// // Styled Components 정의
// const StyledH = styled(H)`
//   width: 34px;
//   height: 124px;
//   .H-left-stroke {
//     stroke-dasharray: 124px;
//     stroke-dashoffset: 124px;
//     animation: ${HLeftMove} 20s ease forwards;
//   }
//   .H-mid-stroke {
//     stroke-dasharray: 37px;
//     stroke-dashoffset: 37px;
//     animation: ${HMidMove} 9s ease forwards;
//   }
//   .H-right-stroke {
//     stroke-dasharray: 124px;
//     stroke-dashoffset: 124px;
//     animation: ${HRightMove} 13s ease forwards;
//   }
// `;

// const StyledE = styled(E)`
//   width: 34px;
//   height: 124px;
//   .E-left-stroke {
//     stroke-dasharray: 124px;
//     stroke-dashoffset: 124px;
//     animation: ${ELeftMove} 20s ease forwards;
//   }
//   .E-top-stroke {
//     stroke-dasharray: 47px;
//     stroke-dashoffset: 47px;
//     animation: ${ETopMove} 10s ease forwards;
//   }
//   .E-mid-stroke {
//     stroke-dasharray: 42px;
//     stroke-dashoffset: 42px;
//     animation: ${EMidMove} 10s ease forwards;
//   }
//   .E-bottom-stroke {
//     stroke-dasharray: 47px;
//     stroke-dashoffset: 47px;
//     animation: ${EBottomMove} 10s ease forwards;
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   margin: 0;
// `;

// const Mainanimation = () => (
//     <Container>
//         <StyledH />
//         <StyledE />
//         <A width="34px" height="124px" />
//         <R width="34px" height="124px" />
//         <Y width="34px" height="124px" />
//         <O width="34px" height="124px" />
//         <U width="34px" height="124px" />
//         <C width="34px" height="124px" />
//         <N width="34px" height="124px" />
//         <T width="34px" height="124px" />
//         <W width="34px" height="124px" />
//         <I width="34px" height="124px" />
//     </Container>
// );

// export default Mainanimation;
