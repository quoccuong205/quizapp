import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import authService from "../../Service/authService";
import { Typography } from "antd";

const { Title } = Typography;

function Login(params) {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (user) => {
    // console.log("Success !", values);
    try {
      const response = await authService.login(user.username, user.password);
      const role = response.data.user.role;
      const encodeData = btoa(JSON.stringify(response.data));
      localStorage.setItem("data", encodeData);
      console.log(role);
      //   console.log(JSON.stringify(response.data));
      checkRole(role);
    } catch (error) {
      console.log(error);
    }
  };

  const checkRole = (role) => {
    if (role === "user") {
      console.log("oh user");
      nav("/user");
    } else if (role === "admin") {
      nav("/admin");
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
        <Title> Login Form</Title>
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
              Login
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          Or <a href="/register">register</a>
        </Form.Item>
      </Form>
    </Row>
  );
}
export default Login;
