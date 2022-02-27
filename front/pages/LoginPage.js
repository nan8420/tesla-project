import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import * as Yup from "yup";
import { LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";
import { login } from "../actions/user";
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
  width: 35%;
`;

const Middle = styled.div`
  width: 25%;
`;

const RightBlock = styled.div`
  width: 35%;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
  box-sizing: border-box;
`;

const MiniContainer = styled.div`
  margin-top: 20px;
`;

const LoginFormSchema = Yup.object().shape({
  user_email: Yup.string()
    .email("올바르지 않은 이메일 형식 입니다.")
    .required("이메일은 필수 입력 항목 입니다."),
  user_password: Yup.string().required("비밀번호는 필수 입력 항목 입니다."),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { loginLoading, loginError } = useSelector((state) => state.user);
  const { me } = useSelector((state) => state.user);

  // console.log("me:::", me);
  useEffect(() => {
    if (action) {
      if (loginError) {
        message.error(JSON.stringify(loginError, null, 4)).then();
      }
      action.setSubmitting(false);
      setAction(null);
    }
  }, [loginError]);

  useEffect(() => {
    if (me) {
      Router.push("/");
    }
  }, [me]);

  return (
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
          <Formik
            initialValues={{
              user_email: "",
              user_password: "",
            }}
            validationSchema={LoginFormSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              dispatch(
                login({
                  email: values.user_email,
                  password: values.user_password,
                })
              );
              setAction({ setSubmitting, resetForm });
            }}
          >
            <FormWrapper>
              <Form.Item name="user_email">
                <Input name="user_email" type="email" placeholder="이메일" />
              </Form.Item>
              <Form.Item name="user_password">
                <Input.Password name="user_password" placeholder="비밀번호" />
              </Form.Item>
              <Form.Item name="submit">
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loginLoading}
                  style={{ background: "#5DCC5D", border: "1px solid #5DCC5D" }}
                >
                  <LoginOutlined /> 로그인
                </Button>
                <MiniContainer>
                  <Link href="/SignupPage">
                    <span style={{ color: "black" }}>
                      회원가입 하러가기 <a stlye={{ color: "blue" }}>Click!</a>
                    </span>
                  </Link>
                </MiniContainer>
              </Form.Item>
            </FormWrapper>
          </Formik>
        </Middle>
        <RightBlock></RightBlock>
      </SecondContainer>
    </Container>
  );
};
export default LoginPage;
