import styled from "styled-components";

export const Card = ({ cardData }) => {
  console.log(cardData);
  return (
    <Container>
      <CardTop>
        <span>{cardData.id}#</span>
        <ImgWrap>
          <img src={require("../../images/delete.png")} alt="" />
        </ImgWrap>
      </CardTop>
      <CardBody>
        <p>{cardData.title}</p>
        <span>{cardData.content}</span>
        <span>{cardData.deadline}</span>
      </CardBody>
    </Container>
  );
};

const Container = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CardTop = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgWrap = styled.div`
  display: flex;
  background-color: #ff7373;
  border-radius: 5px;
  cursor: pointer;
  & img {
    width: 25px;
    height: 25px;
  }
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
