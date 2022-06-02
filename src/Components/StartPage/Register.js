import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import authService from "../../Service/authService";
import { Typography } from "antd";

const { Title } = Typography;

function Register(params) {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (user) => {
    // console.log("Success !", values);
    try {
      await authService.register(user.username, user.password, user.email);
      //   console.log(response);
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Form form={form} name="horizontal_login" onFinish={onFinish}>
        <Title> Register Form</Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
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
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
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
          <Input
            prefix={<GoogleOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
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
              Register
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          Or <a href="/login">Login now!</a>
        </Form.Item>
      </Form>
    </Row>
  );
}
export default Register;
