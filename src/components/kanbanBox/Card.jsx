import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteIssue } from "../../redux/issueSlice";

export const Card = ({ cardData }) => {
  const dispatch = useDispatch();

  const deleteIssueHandler = (issueId) => {
    if (window.confirm("삭제할까요?")) {
      dispatch(deleteIssue(issueId));
    }
  };

  return (
    <Container>
      <CardTop>
        <span>
          {cardData.id}# - {cardData.title}
        </span>
        <ImgWrap onClick={() => deleteIssueHandler(cardData.id)}>
          <img src={require("../../images/delete.png")} alt="삭제버튼" />
        </ImgWrap>
      </CardTop>
      <CardBody>
        <p>{cardData.content}</p>
      </CardBody>
      <CardFooter>
        <span>{cardData.name}</span>
        <span>deadline : ~ {cardData.deadline}</span>
      </CardFooter>
    </Container>
  );
};

const Container = styled.div`
  margin: 5px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  animation: cardFade 0.6s;

  @keyframes cardFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

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
  padding: 5px;
  display: flex;
  flex-direction: column;

  & p {
    margin: 0;
    font-size: 0.8rem;
    overflow: hidden;
  }
`;

const CardFooter = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span:last-child {
    color: gray;
    font-size: 0.8rem;
    text-align: right;
  }
`;
