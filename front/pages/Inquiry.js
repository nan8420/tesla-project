import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { loadMyInfo } from "../actions/user";
import { loadsupports } from "../actions/post";
import axios from "axios";
import wrapper from "../store/configureStore";
import Supportcard from "../components/Supportcard";
import Router from "next/router";
const Container = styled.div``;

const Header = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: black;
  justify-content: space-between;
`;

const Space2 = styled.div`
  /* background: orange; */
  height: 70px;
`;

const SecondContainer = styled.div`
  display: flex;
`;

const LeftBlock = styled.div`
  width: 20%;
`;

const Middle = styled.div`
  width: 60%;
`;

const RightBlock = styled.div`
  width: 20%;
`;

const First = styled.div`
  border-bottom: 0.3px solid lightgray;
  margin-bottom: 30px;
`;

const FirstText = styled.text`
  font-size: 30px;
  font-weight: 600;
`;

const Inquiry = () => {
  const { supports } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push("/");
      alert("로그인이 필요합니다.");
    }
  }, []);
  return me ? (
    <Container>
      <Header>
        <a href="/">
          <img src="/images/logo6.svg" alt="" />
        </a>
      </Header>

      <Space2></Space2>

      <SecondContainer>
        <LeftBlock></LeftBlock>

        <Middle>
          <First>
            <FirstText> ❓나의 문의 내역</FirstText>
          </First>
          {supports.map((post) => (
            <Supportcard key={post.id} post={post} />
          ))}
        </Middle>
        <RightBlock></RightBlock>
      </SecondContainer>
    </Container>
  ) : null;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadsupports());
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Inquiry;
