import React from "react";
import styled from "styled-components";
import Category from "./Category";

const MainView = () => {
  return (
    <Container>
      <Category
        title="Roadster"
        description="Order Online fro Touchless Delivery"
        img="Roadster1.jpg"
        img2="Roadster3.jpg"
        price="200,000"
        order="주문하기"
        detail="자세히 알아보기"
      />
      <Category
        // title="rodster"
        title="Cybertruck"
        description="Order Online fro Touchless Delivery"
        img="cybertruck.jpg"
        img2="cybertruck3.jpg"
        price="450,000"
        order="주문하기"
        detail="자세히 알아보기"
      />
      <Category
        title="Model S"
        description="Order Online fro Touchless Delivery"
        img="models.jpg"
        img2="models2.jpg"
        price="140,000"
        order="주문하기"
        detail="자세히 알아보기"
      />
      <Category
        title="Model 3"
        description="Order Online fro Touchless Delivery"
        img="model-3.jpg"
        img2="model3-2.jpg"
        price="180,000"
        order="주문하기"
        detail="자세히 알아보기"
      />
      <Category
        title="Model X"
        description="Order Online fro Touchless Delivery"
        img="modelx.jpg"
        img2="modelX2.jpg"
        price="23,000"
        order="주문하기"
        detail="자세히 알아보기"
      />
      <Category
        title="Model Y"
        description="Order Online fro Touchless Delivery"
        img="modely3.jpg"
        img2="ModelY7.jpg"
        price="13,000"
        order="주문하기"
        detail="자세히 알아보기"
      />
      <Category
        title="Supercharger"
        description=""
        img="Supercharger.jpg"
        img2="Supercharger2.jpg"
        price="43,000"
        order="주문하기"
        detail="자세히 알아보기"
      ></Category>
      <Category
        title="Solar for New Roofs"
        description="Solar Roof Costs Less Than a New"
        img="solar-roof.jpg"
        img2="SolarRoof2.jpg"
        price="500,000"
        order="주문하기"
        detail="자세히 알아보기"
      ></Category>

      <Category
        title="Comming Soon 2020년에 판매 시작합니다."
        img="ai.jpg"
        order="주문하기"
        detail="자세히 알아보기"
      ></Category>
    </Container>
  );
};

export default MainView;

const Container = styled.div`
  height: 100vh;
`;
