import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Router from "next/router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-image: ${(props) => `url("/images/${props.bgImage}")`};
`;

const CarLabel = styled.div`
  padding-top: 15vh;
  text-align: center;

  h1 {
    font-size: 40px;
  }

  span {
    font-size: 18px;
    padding: 0px 7px;
  }
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

const Category = ({ title, description, img, img2, price, order, detail }) => {
  const OrderFunction = (title, img2) => () => {
    Router.push({
      pathname: `/OrderPage`,
      query: { t: title, i2: img2, p: price },
    });
  };

  return (
    <Container bgImage={img}>
      {" "}
      {/* pass props */}
      <Fade bottom>
        <CarLabel>
          <h1>{title}</h1>
          {/* <p>{description}</p> */}
          <span>
            Order Online for
            <span style={{ textDecoration: "underline" }}>
              Touchless Delivery
            </span>
          </span>
        </CarLabel>
      </Fade>
      <Buttons>
        <Fade bottom>
          <CarButton>
            <OrderButton onClick={OrderFunction(title, img2, price)}>
              {order}
            </OrderButton>
            {detail && <RightButton>{detail}</RightButton>}
          </CarButton>
        </Fade>
        <DownArrow src="/images/down-arrow.svg" />
      </Buttons>
    </Container>
  );
};

export default Category;
