import { useEffect, useState } from "react";
import styled from "styled-components";
import { IssueBox } from "../components/kanbanBox/IssueBox";
// import { Working } from "../components/kanbanBox/Working";
// import { Done } from "../components/kanbanBox/Done";
import { useSelector, useDispatch } from "react-redux";
import { getIssues } from "../redux/issueSlice";

export default function Home() {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state);
  const { issue, isLoading } = useSelector((state) => state.issueSlice);
  // console.log(data);
  console.log(issue);
  console.log(isLoading);

  // status data
  // const [todoData, setTodoData] = useState([]);
  // const [workingData, setWorkingData] = useState([]);
  // const [doneData, setDoneData] = useState([]);
  // let todoData = [];
  // let workingData = [];
  // let doneData = [];

  // data fetch
  // const issueDataFetch = async () => {
  //   await dispatch(getIssues());
  //   issue.forEach((item, index) => {
  //     if (item.status === "todo") setTodoData([...todoData, item]);
  //     if (item.status === "working") setWorkingData([...workingData, item]);
  //     if (item.status === "done") setDoneData([...doneData, item]);
  //   });
  // };

  // data fetch
  useEffect(() => {
    dispatch(getIssues());
  }, []);

  // console.log(todoData);
  // console.log(workingData);
  // console.log(doneData);

  // data array
  const issueBoxData = [issue, issue, issue];

  return (
    <Container>
      <HeaderWrap>
        <p>Issue Tracker</p>
        <hr />
      </HeaderWrap>
      <KanbanWrap>
        {issueBoxData?.map((item, index) => {
          return <IssueBox key={index} statusNum={index} issueData={item} />;
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
