import styled from "styled-components";
import { Card } from "./Card";

export const Working = () => {
  return (
    <Container>
      <div>
        <p>Working</p>
      </div>
      <CardBox>
        <Card />
      </CardBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardBox = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  width: 30vw;
  min-height: 50vh;
  border: 1px solid lightgray;
  border-radius: 10px;
`;
