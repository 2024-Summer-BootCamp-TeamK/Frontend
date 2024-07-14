import React, { useState } from 'react';
import styled from 'styled-components';

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
`;

const PopupHeader = styled.div`
  padding: 10px;
  color: #141F7B;
`;

const PopupContent = styled.div`
  padding: 20px;
`;

const PopupFooter = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  display: fixed;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
            content: '첫 번째 설명 페이지 내용입니다.',
        },
        {
            title: 'Umm',
            content: '두 번째 설명 페이지 내용입니다.',
        },
        {
            title: '서명하기를 누르고 서명란 위치를 클릭해주세요',
            content: '세 번째 설명 페이지 내용입니다.',
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
                <p>{pages[currentPage].content}</p>
            </PopupContent>

            <PopupFooter>
                <Button onClick={prevPage}>이전</Button>
                <Button onClick={nextPage}>다음</Button>
            </PopupFooter>
        </PopupContainer>
    );
};

export default Popupexplain;
