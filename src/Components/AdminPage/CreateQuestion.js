import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { createQuestion } from "../../redux/admin/action";
import { useSelector } from "react-redux";

const { Title } = Typography;

function CreateQuestion(params) {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);
  const accessToken = useSelector(
    (state) => state.auth.auth.tokens.access.token
  );

  const onFinish = async (user) => {
    // console.log("Success !", values);
    try {
      dispatch(createQuestion(user, accessToken, form));
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row type="flex" justify="center" align="middle">
      <Form
        style={{ width: "400px" }}
        form={form}
        name="horizontal_login"
        onFinish={onFinish}
      >
        <Title justify="center" align="middle">
          {" "}
          Create Question
        </Title>
        <Form.Item
          name="question"
          rules={[
            {
              required: true,
              message: "Please input your question!",
            },
          ]}
        >
          <Input placeholder="Question" />
        </Form.Item>
        <Form.Item
          name="answer1"
          rules={[
            {
              required: true,
              message: "Please input your answer1!",
            },
          ]}
        >
          <Input placeholder="Answer 1" />
        </Form.Item>
        <Form.Item
          name="answer2"
          rules={[
            {
              required: true,
              message: "Please input your answer2!",
            },
          ]}
        >
          <Input placeholder="Answer 2" />
        </Form.Item>
        <Form.Item
          name="answer3"
          rules={[
            {
              required: true,
              message: "Please input your answer3!",
            },
          ]}
        >
          <Input placeholder="Answer 3" />
        </Form.Item>
        <Form.Item
          name="answer4"
          rules={[
            {
              required: true,
              message: "Please input your answer4!",
            },
          ]}
        >
          <Input placeholder="Answer 4" />
        </Form.Item>
        <Form.Item
          name="correctanswer"
          rules={[
            {
              required: true,
              message: "Please input your correct answer!",
            },
          ]}
        >
          <Input placeholder="Correct answer" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              block
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Create
            </Button>
          )}
        </Form.Item>
      </Form>
    </Row>
  );
}
export default CreateQuestion;
