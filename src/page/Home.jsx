import { useEffect, useState } from "react";
import styled from "styled-components";
import { IssueBox } from "../components/kanbanBox/IssueBox";
import { useSelector, useDispatch } from "react-redux";
import { getIssues } from "../redux/issueSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { issue, isLoading } = useSelector((state) => state.issueSlice);

  // data fetch
  useEffect(() => {
    dispatch(getIssues());
  }, [dispatch]);

  // data array
  const issueBoxData = [issue, issue, issue];

  // dnd status for Card.jsx
  const [dndStatus, setDndStatus] = useState({
    isDragOver: false,
    position: "none",
    prevPosition: "none",
    startId: 0, // 삭제예정
    endId: 0,
  });

  return (
    <Container>
      <HeaderWrap>
        <p>Issue Tracker</p>
        <hr />
      </HeaderWrap>
      <KanbanWrap>
        {issueBoxData?.map((item, index) => {
          return (
            <IssueBox
              key={index}
              statusNum={index}
              issueData={item}
              lastSortId={0}
              dndStatus={dndStatus}
              setDndStatus={setDndStatus}
            />
          );
        })}
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
