import styled from "styled-components";

export const Card = () => {
  return (
    <Container>
      <CardTop>
        <span>이슈번호(id)</span>
        <span>삭제</span>
      </CardTop>
      <CardBody>
        <p>제목</p>
        <span>내용</span>
        <span>마감일</span>
      </CardBody>
    </Container>
  );
};

const Container = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const CardTop = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;

  & span:last-child {
    padding: 5px;
    color: gray;
    font-size: 0.8rem;
    text-align: right;
  }
`;
