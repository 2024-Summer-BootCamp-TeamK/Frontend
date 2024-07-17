import React, { useState } from 'react';
import styled from 'styled-components';
import arrowLSrc from '../images/arrowL.svg';
import arrowRSrc from '../images/arrowR.svg';
import explain1Src from '../images/explain1.svg';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 500px;
  background-color: white;
  border: 5px solid #141F7B;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopupHeader = styled.div`
  padding: 50px 10px;
  color: #141F7B;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 40px; 
`;

const PopupContent = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 140px); 
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 10px;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
`;

const ButtonL = styled(Button)`
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const ButtonR = styled(Button)`
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  position: absolute;
  bottom: 20px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${props => (props.active ? '#141F7B' : '#ccc')};
  border-radius: 50%;
  cursor: pointer;
`;

const Popupexplain = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: '서류에 마우스 포인터가 공유되고 있어요',
      content: explain1Src,
      type: 'gif',
    },
    {
      title: '주의 !',
      content: '/path/to/your/image2.png',
      type: 'image',
    },
    {
      title: '서명하기를 누르고 서명란 위치를 클릭해주세요',
      content: '/path/to/your/image2.png',
      type: 'image',
    },
  ];

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <PopupContainer>
      <ButtonL onClick={prevPage}>
        <img src={arrowLSrc} alt="Previous" />
      </ButtonL>
      <ButtonR onClick={nextPage}>
        <img src={arrowRSrc} alt="Next" />
      </ButtonR>
      <PaginationDots>
        {pages.map((_, index) => (
          <Dot
            key={index}
            active={index === currentPage}
            onClick={() => goToPage(index)}
          />
        ))}
      </PaginationDots>
      <PopupHeader>
        <h2>{pages[currentPage].title}</h2>
      </PopupHeader>
      <PopupContent>
        {pages[currentPage].type === 'image' || pages[currentPage].type === 'gif' ? (
          <img src={pages[currentPage].content} alt={pages[currentPage].title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <source src={pages[currentPage].content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </PopupContent>
    </PopupContainer>
  );
};

export default Popupexplain;
