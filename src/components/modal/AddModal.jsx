import styled from "styled-components";
import { useEffect, useState } from "react";
import { ModalPage } from "../../util/modal";
import { nameAPI } from "../../api/api";

export const AddModal = ({ showModal, closeModal, statusNum, lastSortId }) => {
  //name data fetch
  const [nameData, setNameData] = useState([]);
  const nameDataFetch = async () => {
    const data = await nameAPI.getNames().then((res) => {
      setNameData(res.data);
    });
  };

  useEffect(() => {
    nameDataFetch();
  }, [setNameData]);
  console.log("이름데이터", nameData);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState(statusNum);
  const [name, setName] = useState("");

  let formData = {
    sortId: lastSortId + 1,
    title: title,
    content: content,
    deadline: deadline,
    status: status,
    name: name,
  };
  console.log(formData);

  const onChangeHandler = (e, type) => {
    if (type === "title") setTitle(e);
    if (type === "content") setContent(e);
    if (type === "name") setName(e);
    if (type === "deadline") setDeadline(e);
    if (type === "status") setStatus(e);
  };

  return (
    <ModalPage showModal={showModal} closeModal={closeModal}>
      <ModalForm>
        <InputWarp>
          <label htmlFor="title">제목</label>
          <input
            onChange={(e) => {
              onChangeHandler(e.target.value, "title");
            }}
            type="text"
            id="title"
            maxLength={30}
          />
        </InputWarp>
        <InputWarp>
          <label htmlFor="content">내용</label>
          <textarea
            onChange={(e) => {
              onChangeHandler(e.target.value, "content");
            }}
            id="content"
            cols="30"
            rows="10"
          />
        </InputWarp>
        <BottomInputWarp>
          <label htmlFor="name">담당자</label>
          <input
            onChange={(e) => {
              onChangeHandler(e.target.value, "name");
            }}
            type="담당자"
            id="name"
            autoComplete="off"
          />
        </BottomInputWarp>
        <BottomInputWarp>
          <label htmlFor="deadline">마감일</label>
          <input
            onChange={(e) => {
              onChangeHandler(e.target.value, "deadline");
            }}
            type="datetime-local"
            id="deadline"
          />
        </BottomInputWarp>
        <StatusSelect>
          <select
            onChange={(e) => {
              onChangeHandler(e.target.value, "status");
            }}
          >
            <option value="0">Todo</option>
            <option value="1">Working</option>
            <option value="2">Done</option>
          </select>
        </StatusSelect>
        <ButtonWarp>
          <button>취소</button>
          <button>저장</button>
        </ButtonWarp>
      </ModalForm>
      <AutoComplite style={name === "" ? { display: "none" } : null}>
        {nameData
          ?.filter(
            (item) =>
              item.name.includes(name) === true && item.name.indexOf(name) === 0
          )
          .map((item, index) => {
            if (item?.name) {
              return <div>{item?.name}</div>;
            }
          })}
      </AutoComplite>
    </ModalPage>
  );
};

const ModalForm = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const InputWarp = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;

  font-size: 0.9rem;
  & label {
    width: 50px;
    margin-right: 10px;
    font-weight: bold;
  }
  & input {
    width: 300px;
    height: 25px;
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
  & textarea {
    width: 300px;
    resize: none;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid black;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const BottomInputWarp = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  width: 300px;
  font-size: 0.9rem;
  & label {
    width: 50px;
    margin-right: 10px;
    font-weight: bold;
  }
  & input {
    width: 180px;
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const AutoComplite = styled.div`
  position: relative;
  width: 15vw;
  border: 3px solid lightgray;
  background-color: white;
  transform: translate(93%, -125%);
  z-index: 1;
`;

const StatusSelect = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 300px;
  & select {
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const ButtonWarp = styled.div`
  margin-top: 20px;
  display: flex;
  & button {
    margin: 0 10px 0 10px;
  }
`;
