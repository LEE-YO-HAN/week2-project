import { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "./Card";

export const IssueBox = ({ statusNum, issueData }) => {
  let issueName =
    statusNum === 0 ? "Todo" : statusNum === 1 ? "Working" : "Done";

  console.log(statusNum);
  console.log(issueData);

  return (
    <Container>
      <BoradTop>
        <div>
          <p>{issueName}</p>
        </div>
        <ImgWrap>
          <img src={require("../../images/plus.png")} alt="이슈 추가" />
        </ImgWrap>
      </BoradTop>
      <CardBox>
        {issueData?.map((item, index) => {
          if (item.status === statusNum) {
            return <Card key={item.id} cardData={item} />;
          }
        })}
      </CardBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoradTop = styled.div`
  display: flex;
  align-items: center;

  & p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const ImgWrap = styled.div`
  background-color: #c2c2c2;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 20px 0 20px;
  & img {
    display: flex;
    width: 25px;
    height: 25px;
  }
`;

const CardBox = styled.div`
  width: 30vw;
  height: 70vh;
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: #e4e4e4;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #aaa;
  }
  &::-webkit-scrollbar-thumb {
    height: 10vh;
    background: #575757;
  }
`;
