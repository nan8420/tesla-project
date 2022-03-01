import React, { useState, useEffect } from "react";
import { Form, Input } from "formik-antd";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Button, message } from "antd";
import * as Yup from "yup";
import { addsupport } from "../actions/post";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";

const Container = styled.div``;

const Header = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: black;
  justify-content: space-between;
`;

const Space2 = styled.div`
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
  padding: 0 0 10px 0;
`;
const FirstText = styled.text`
  font-size: 30px;
  font-weight: 600;
`;

const Second = styled.div`
  margin-top: 20px;
  padding: 0 0 10px 0;
  border-bottom: 0.3px solid lightgray;
`;

const Subject = styled.div`
  margin-top: 30px;
  width: 40%;
`;

const SubText = styled.text`
  font-weight: bold;
`;

const Help = styled.div`
  margin: 20px 0 60px 0;
`;

const PostSchema = Yup.object().shape({
  content: Yup.string()
    .min(7, "7자 이상 입력해주세요.")
    .required("게시글은 필수로 입력 하셔야 합니다.."),
});

const Support = () => {
  const { me } = useSelector((state) => state.user);
  const [action, setAction] = useState(null);
  const { addsupportLoading, addsupportDone, addsupportError } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (action) {
      if (addsupportDone) {
        message.success("문의가 접수되었습니다..").then();
      }
      if (addsupportError) {
        message.error(JSON.stringify(addsupportError, null, 4)).then();
      }
      action.setSubmitting(false);
      action.resetForm();
      setAction(null);
    }
  }, [addsupportDone, addsupportError]);

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
            <FirstText>How can i help you?</FirstText>
          </First>
          <Second>
            <Link href="/Inquiry">
              <li>
                {" "}
                {"문의 사항을 보고 싶으신가요?"}
                &nbsp; &nbsp; &nbsp;
                <a href="#">나의 문의 내역</a>{" "}
              </li>
            </Link>
          </Second>

          <Formik
            initialValues={{
              subject: "",
              content: "",
            }}
            validationSchema={PostSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              dispatch(
                addsupport({
                  subject: values.subject,
                  content: values.content,
                })
              );
              setAction({ setSubmitting, resetForm });
            }}
          >
            <Form style={{ marginBottom: 45 }} encType="multipart/form-data">
              <Form.Item name="content">
                <Subject>
                  <SubText>
                    Subject :
                    <Input
                      id="subject"
                      name="subject"
                      maxLength={140}
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      placeholder="제목"
                    />
                  </SubText>
                </Subject>
                <Help>
                  <SubText>Help : </SubText>{" "}
                  <Input.TextArea
                    id="content"
                    name="content"
                    maxLength={500}
                    autoSize={{ minRows: 10, maxRows: 10 }}
                    placeholder="문의 사항을 적어 주세요"
                  />
                </Help>
              </Form.Item>

              <div
                style={{
                  position: "relative",
                  margin: 0,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addsupportLoading}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: "-15px",
                    background: "grey",
                    border: "1px solid grey",
                  }}
                >
                  접수
                </Button>
              </div>
            </Form>
          </Formik>
        </Middle>
        <RightBlock></RightBlock>
      </SecondContainer>
    </Container>
  ) : null;
};

export default Support;
