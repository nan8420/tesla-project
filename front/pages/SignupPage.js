import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Checkbox, Form, Input } from "formik-antd";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, message } from "antd";
import styled from "styled-components";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Router from "next/router";
import axios from "axios";
import { loadMyInfo, signup } from "../actions/user";
import wrapper from "../store/configureStore";

const Signuptable = Yup.object().shape({
  user_email: Yup.string()
    .email("이메일 형식이 잘못 되었습니다.")
    .required("이메일은 필수로 입력하셔야 합니다."),
  user_nickname: Yup.string().required("닉네임은 필수로 입력하셔야 합니다."),
  user_password: Yup.string().required("비밀번호는 필수로 입력하셔야 합니다."),
  user_password_check: Yup.string()
    .oneOf([Yup.ref("user_password")], "비밀번호가 일치 하지 않습니다.")
    .required("비밀번호 체크는 필수 입니다."),
  user_term: Yup.bool().oneOf([true], "약관에 동의하여 주세요"),
});

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
  width: 30%;
`;

const Middle = styled.div`
  width: 40%;
`;

const RightBlock = styled.div`
  width: 30%;
`;

const FormWrapper = styled(Form)`
  margin-bottom: 10px;
  border: 1px solid lightgray;
  padding: 20px;
  box-sizing: border-box;
`;
const SignupPage = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { me, signupLoading, signupDone, signupError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (me && me.id) {
      message.warn("이미 로그인 하셨습니다.").then();
      Router.push("/").then();
    }
  }, [me && me.id]);

  useEffect(() => {
    if (action) {
      if (signupDone) {
        message
          .success("회원가입에 성공하셨습니다.")
          .then(() => Router.push("/").then());
      }
      if (signupError) {
        message.error(JSON.stringify(signupError, null, 4)).then();
      }
      action.setSubmitting(false);
      setAction(null);
    }
  }, [signupDone, signupError]);

  return (
    // <AppLayout>
    <Container>
      <Header>
        <a href="/">
          <img src="/images/logo6.svg" alt="" />
        </a>
      </Header>
      <Space2>{/* <SupportText>Space2</SupportText> */}</Space2>

      <Head>
        <title>회원가입</title>
      </Head>

      <SecondContainer>
        <LeftBlock></LeftBlock>

        <Middle>
          <Formik
            initialValues={{
              user_email: "",
              user_nickname: "",
              user_password: "",
              user_password_check: "",
              user_term: false,
            }}
            validationSchema={Signuptable}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              dispatch(
                signup({
                  email: values.user_email,
                  nickname: values.user_nickname,
                  password: values.user_password,
                })
              );
              setAction({ setSubmitting, resetForm });
            }}
          >
            <FormWrapper layout="vertical">
              <Form.Item name="user_email" label="이메일">
                <Input name="user_email" type="email" placeholder="이메일" />
              </Form.Item>
              <Form.Item name="user_nickname" label="닉네임">
                <Input name="user_nickname" placeholder="닉네임" />
              </Form.Item>
              <Form.Item name="user_password" label="비밀번호">
                <Input.Password name="user_password" placeholder="비밀번호" />
              </Form.Item>
              <Form.Item name="user_password_check" label="비밀번호체크">
                <Input.Password
                  name="user_password_check"
                  placeholder="비밀번호 체크"
                />
              </Form.Item>
              <Form.Item name="user_term">
                <Checkbox name="user_term" placeholder="user_term Check">
                  동의 해주세요
                </Checkbox>
              </Form.Item>
              <Form.Item name="submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={signupLoading}
                  style={{ background: "#5DCC5D", border: "1px solid #5DCC5D" }}
                >
                  가입!
                </Button>
              </Form.Item>
            </FormWrapper>
          </Formik>
        </Middle>
        <RightBlock></RightBlock>
      </SecondContainer>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadMyInfo());
    return {
      props: {},
    };
  }
);

export default SignupPage;
