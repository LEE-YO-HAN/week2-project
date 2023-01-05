import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteIssue } from "../../redux/issueSlice";
import { DetailModal } from "../modal/DetailModal";
import { useState } from "react";
import { updateIssue } from "../../redux/issueSlice";

export const Card = ({ cardData, dndStatus, setDndStatus }) => {
  const dispatch = useDispatch();
  const { issue } = useSelector((state) => state.issueSlice);

  console.log("카드에이써", issue);

  const deleteIssueHandler = (e, issueId) => {
    e.stopPropagation();
    if (window.confirm("삭제할까요?")) {
      dispatch(deleteIssue(issueId));
    }
  };

  // detail issue modal
  const [showModal, setShowModal] = useState(false);
  const openAddIssueModal = () => {
    setShowModal(true);
  };
  const closeAddIssueModal = () => {
    setShowModal(false);
  };

  //####### dnd event ########
  console.log(dndStatus);
  const [dndPosition, setDndPosition] = useState("none");

  const dragFunction = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(type);
  };

  const onDragStart = () => {
    setDndStatus({
      ...dndStatus,
      startId: cardData.id,
      startStatus: cardData.status,
    });
  };

  const onDragEnter = () => {
    setDndStatus({
      ...dndStatus,
      isDragOver: false,
      position: "none",
    });
    setDndPosition("none");
  };
  const onDragLeave = (e) => {
    dragFunction(e, "ondragleave");
    setDndStatus({ ...dndStatus, isDragOver: false, position: "none" });
    setDndPosition("none");
  };
  const onDragOverTop = (e) => {
    dragFunction(e, "ondragover");
    setDndStatus({
      ...dndStatus,
      isDragOver: true,
      position: "top",
      prevPosition: "top",
    });
    setDndPosition("top");
  };
  const onDragOverBottom = (e) => {
    dragFunction(e, "ondragover");
    setDndStatus({
      ...dndStatus,
      isDragOver: true,
      position: "bottom",
      prevPosition: "bottom",
    });
    setDndPosition("botton");
  };

  // on Drop & fetch
  const onDrop = (e) => {
    dragFunction(e, "ondrop");
    console.log("여기놓을게에", cardData.id, cardData.sortId, cardData.status);
    setDndStatus({
      ...dndStatus,
      isDragOver: false,
      position: "none",
      endId: cardData.id,
      endStatus: cardData.status,
    });
    setDndPosition("none");

    setTimeout(() => {
      updateIssueHandler();
    }, 100);
  };

  const updateIssueHandler = () => {
    // except argument
    const forRejectArr = [...issue].filter(
      (item) => item.status === dndStatus.startStatus
    );
    const cardIndex = forRejectArr.findIndex(
      (item) => item.id === dndStatus.startId
    );
    console.log("체크용", forRejectArr);
    console.log("체크용", cardIndex);

    if (dndStatus.startStatus === cardData.endStatus) {
      // not change
      if (
        dndStatus.prevPosition === "bottom" &&
        dndStatus.endId === forRejectArr[cardIndex - 1].id
      ) {
        return;
      }
      if (
        dndStatus.prevPosition === "top" &&
        dndStatus.endId === forRejectArr[cardIndex + 1].id
      ) {
        return;
      }
    }
    ////// change
    // drag data
    const startIssueData = [...issue].filter(
      (item) => item.id === dndStatus.startId
    )[0];
    console.log("뽑아융", startIssueData);

    // drop data
    const thisStatusArr = [...issue].filter(
      (item) => item.status === dndStatus.endStatus
    );
    const dropedCardIndex = thisStatusArr.findIndex(
      (item) => item.id === dndStatus.endId
    );
    console.log("어딨냐", thisStatusArr);
    console.log("어딨냐2", dropedCardIndex);

    // payload data
    const etcData = [...issue].filter(
      (item) => item.id === dndStatus.startId
    )[0];
    let formData = {
      id: dndStatus.startId,
      sortId: startIssueData.sortId,
      title: etcData.title,
      content: etcData.content,
      deadline: etcData.deadline,
      status: dndStatus.endStatus,
      name: etcData.name,
    };
    console.log("그냥 폼데이터도 내놔라", formData);
    console.log("그냥 etc 폼데이터도 내놔라", etcData);

    if (dndStatus.prevPosition === "bottom") {
      if (
        thisStatusArr[dropedCardIndex].sortId < startIssueData.sortId &&
        startIssueData.sortId < thisStatusArr[dropedCardIndex + 1].sortId
      ) {
        dispatch(updateIssue(formData));
      }
      if (thisStatusArr[dropedCardIndex].sortId >= startIssueData.sortId) {
        let newFormData = {
          ...formData,
          sortId: thisStatusArr[dropedCardIndex].sortId + Math.random() * 0.001,
        };
        console.log("왜 패치가 안되냐", newFormData);
        dispatch(updateIssue(newFormData));
      }
    }

    if (dndStatus.prevPosition === "top") {
      if (
        thisStatusArr[dropedCardIndex].sortId > startIssueData.sortId &&
        startIssueData.sortId > thisStatusArr[dropedCardIndex + 1].sortId
      ) {
        dispatch(updateIssue(formData));
      }
      if (thisStatusArr[dropedCardIndex].sortId <= startIssueData.sortId) {
        let newFormData = {
          ...formData,
          sortId: thisStatusArr[dropedCardIndex].sortId - Math.random() * 0.01,
          status: dndStatus.endStatus,
        };
        console.log("왜 패치가 안되냐22", newFormData);
        dispatch(updateIssue(newFormData));
      }
    }
    console.log("살아남아따");
  };

  return (
    <>
      <DndHr
        style={
          dndPosition === "top"
            ? {
                width: "100%",
                height: "3px",
              }
            : null
        }
      />
      <Container
        onClick={openAddIssueModal}
        className="dragAndDrop"
        draggable="true"
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <DetailModal
          showModal={showModal}
          closeModal={closeAddIssueModal}
          cardData={cardData}
        />
        <CardTop onDragOver={onDragOverTop}>
          <span>
            {cardData?.id} # - {cardData?.title}
          </span>
          <ImgWrap onClick={(e) => deleteIssueHandler(e, cardData?.id)}>
            <img src={require("../../images/delete.png")} alt="삭제버튼" />
          </ImgWrap>
        </CardTop>
        <CardBody onDragOver={onDragOverTop}>
          <p>{cardData?.content}</p>
        </CardBody>
        <CardFooter onDragOver={onDragOverBottom}>
          <span>{cardData?.name}</span>
          <span>deadline : ~ {cardData?.deadline.replace("T", " / ")}</span>
        </CardFooter>
      </Container>
      <DndHr
        style={
          dndPosition !== "none" && dndPosition !== "top"
            ? {
                width: "100%",
                height: "3px",
              }
            : null
        }
      />
    </>
  );
};

const DndHr = styled.hr`
  width: 0px;
  height: 0px;
  border: none;
  background-color: gray;
  transition: 0.2s;
`;

const Container = styled.div`
  margin: 5px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  transition: 0.8s;
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
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span:last-child {
    color: gray;
    font-size: 0.8rem;
    text-align: right;
  }
`;
