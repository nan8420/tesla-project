import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/user";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  min-height: 58px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 18px;
  top: 0;
  left: 0;
  right: 0;

  @media (max-width: 90px) {
    min-height: 40px;
    padding: 0 10px;
    a {
      img {
        width: 74px;
      }
    }
  }
`;

const MainCars = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: black;
    font-weight: bold;
    text-transform: uppercase;
    padding: 0 20px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RHeader = styled.div`
  display: flex;
  align-items: center;
  a {
    color: black;
    font-weight: bold;
    margin-right: 15px;
    white-space: nowrap;
  }
  @media (max-width: 400px) {
    a {
      font-size: 12px;
    }
  }
`;

const Option = styled.div`
  cursor: pointer;
`;

const OptionMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
  width: 300px;
  z-index: 16;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;

  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.2s ease-in-out;

  overflow-y: scroll;

  li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    a {
      color: black;
      font-weight: 600;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CustomClose = styled(CloseIcon)`
  cursor: pointer;
`;

const Name = styled.text`
  font-weight: bold;
  padding: 0px 15px 0px 0px;
`;

const LogoutButton = styled.div`
  position: relative;
  top: -2%;
`;

const LogoutText = styled.text``;
const MainHeader = () => {
  const dispatch = useDispatch();
  const [optionbars, setOptionnars] = useState(false);
  const { me } = useSelector((state) => state.user);

  const optionbarsClick = () => {
    setOptionnars(!optionbars);
    const optionsbody = document.querySelector("body");
    optionsbody.classList.toggle("hideScroll");
  };

  const Logout = useCallback(() => {
    dispatch(logout());
    setOptionnars(false);
  }, []);

  const Teslacars = [
    "CyberTruck",
    "RoadSter",
    "Model S",
    "Model 3",
    "Model X",
    "Model Y",
  ];

  return (
    <Container>
      <a href="/">
        <img src="/images/logo6.svg" alt="" />
      </a>
      <MainCars>
        {Teslacars &&
          Teslacars.map((car, index) => (
            <a key={index} href="#">
              {car}
            </a>
          ))}
      </MainCars>
      <RHeader>
        <a href="#">Shop</a>

        <Link href="/SignupPage">
          <a>계정</a>
        </Link>

        <Name>
          {me ? (
            `${me.nickname} 님`
          ) : (
            <Link href="/LoginPage">
              <a>로그인</a>
            </Link>
          )}
        </Name>
        <Option onClick={optionbarsClick}>
          <a>메뉴</a>
        </Option>
      </RHeader>
      <OptionMenu show={optionbars}>
        <CloseWrapper>
          <CustomClose onClick={optionbarsClick} />
        </CloseWrapper>
        {me ? (
          <LogoutButton onClick={Logout}>
            <LogoutText>
              <a>로그아웃</a>
            </LogoutText>
          </LogoutButton>
        ) : null}
        <Link href="/Support">
          <li>
            {" "}
            <a href="#">고객센터</a>{" "}
          </li>
        </Link>
        <Link href="/Inquiry">
          <li>
            {" "}
            <a href="#">문의 내역</a>{" "}
          </li>
        </Link>
        {Teslacars &&
          Teslacars.map((car, index) => (
            <li>
              <a key={index} href="#">
                {car}
              </a>
            </li>
          ))}
        <li>
          {" "}
          <a href="#">인벤토리</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">인증중고 인벤토리</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">보상판매</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">Roadster</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">상업용 에너지</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">공공사업용</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">에너지</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">법인 판매</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">충전</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">Tesla 찾기</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">이벤트</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">투자자 정보</a>{" "}
        </li>
        <li>
          {" "}
          <a href="#">고객센터</a>{" "}
        </li>
      </OptionMenu>
    </Container>
  );
};

export default MainHeader;
