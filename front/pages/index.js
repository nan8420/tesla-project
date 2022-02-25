import React from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import Category from "../components/Category";
import { loadMyInfo } from "../actions/user";
import { loadsupports } from "../actions/post";
import wrapper from "../store/configureStore";

const Home = () => {
  return (
    <MainLayout>
      <Category />
    </MainLayout>
  );
};

// SSR (프론트 서버에서 실행)
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

export default Home;
