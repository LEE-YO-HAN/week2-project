import styled from "styled-components";
import { Todo } from "../components/kanbanBox/Todo";
import { Working } from "../components/kanbanBox/Working";
import { Done } from "../components/kanbanBox/Done";

export default function Home() {
  return (
    <Container>
      <HeaderWrap>
        <p>Issue Tracker</p>
        <hr />
      </HeaderWrap>
      <KanbanWrap>
        <Todo />
        <Working />
        <Done />
      </KanbanWrap>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 95vw;

  & hr {
    border: none;
    box-shadow: 0 0 0 1px lightgray;
  }
`;

const HeaderWrap = styled.div`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
`;

const KanbanWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
