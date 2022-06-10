import "antd/dist/antd.css";
import axios from "../../api/axios";
import { Modal } from "antd";
import { loginSuccess } from "./reducer";

export const register = async (values, nav) => {
  try {
    await axios.post("/v1/auth/register", {
      email: values.email,
      username: values.username,
      password: values.password,
    });
    nav("/login");
    Modal.success({
      title: "Register successed",
    });
  } catch (error) {
    Modal.error({
      title: "Register failed",
      content: error.response.data.message,
    });
  }
};

export const login = (values) => async (dispatch) => {
  try {
    const { data } = await axios.post("/v1/auth/login", {
      username: values.username,
      password: values.password,
    });
    dispatch(loginSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Login failed",
      content: error.response.data.message,
    });
  }
};
