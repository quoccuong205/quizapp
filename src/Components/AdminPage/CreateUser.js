import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/admin/action";
import { useSelector } from "react-redux";

const { Title } = Typography;

function CreateUser(params) {
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
      dispatch(createUser(user, accessToken, form));
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
          Create new User
        </Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: "Please input your role!",
            },
          ]}
        >
          <Input placeholder="Role" />
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
export default CreateUser;
