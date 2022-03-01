import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Fade from "react-reveal/Fade";
import MainHeader from "../components/MainHeader";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column; /* switch to vertical */
  justify-content: space-between; /* horizontal alignment */
  align-items: center; /* vertical alignment */

  background-image: ${(props) => `url("/images/${props.bgImage}")`};
`;

const CarLabel = styled.div`
  padding-top: 15vh;
  text-align: center;
  font-size: 25px;
`;
const CarButton = styled.div`
  display: flex;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OrderButton = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 40px;
  width: 256px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  opacity: 0.85;
  font-size: 12px;
  cursor: pointer;
  letter-spacing: 1px;
  margin: 8px;
`;
const RightButton = styled(OrderButton)`
  background-color: white;
  opacity: 0.65;
  color: black;
`;

const DownArrow = styled.img`
  height: 40px;
  animation: animationDown infinite 1.5s;
  overflow-x: hidden;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderPage = () => {
  const Router = useRouter();
  const { t, i2, p } = Router.query;

  return (
    <Container bgImage={i2}>
      <MainHeader />
      <Fade bottom>
        <CarLabel>
          <h1 style={{ color: "#635C58" }}>{t}</h1>
        </CarLabel>
      </Fade>

      <Buttons>
        <Fade bottom>
          <CarButton>
            <OrderButton>{p}$</OrderButton>
            {"구입하기" && <RightButton>{"구입하기"}</RightButton>}
          </CarButton>
        </Fade>
        <DownArrow src="/images/down-arrow.svg" />
      </Buttons>
    </Container>
  );
};

export default OrderPage;
