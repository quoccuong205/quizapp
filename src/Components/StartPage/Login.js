import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row } from "antd";
import "antd/dist/antd.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/action";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const { Title } = Typography;

function Login(params) {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (user) => {
    // console.log("Success !", values);
    try {
      dispatch(login(user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Form
          style={{ width: "400px" }}
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
        >
          <Title justify="center" align="middle">
            {" "}
            Login Form
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
    </div>
  );
}
export default Login;
