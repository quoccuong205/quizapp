import "antd/dist/antd.css";
import axios from "../../api/axios";
import { Modal } from "antd";
import {
  getQuestionAdminSuccess,
  updateQuestionSuccess,
  deleteQuestionSuccess,
  getUsersSuccess,
  updateUserSuccess,
} from "./reducer";

export const getListQuestion = (accessToken) => async (dispatch) => {
  try {
    const { data } = await axios.get("/v1/questions/edit?limit=500", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionAdminSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Get question failed",
      content: error.message,
    });
  }
};

export const updateQuestion =
  (accessToken, question, questionId) => async (dispatch) => {
    try {
      const { data } = await axios.patch(
        `/v1/questions/edit/${questionId}`,
        question,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch(updateQuestionSuccess(data));
    } catch (error) {
      Modal.error({
        title: "Update failed",
        content: error.message,
      });
    }
  };

export const createQuestion = (values, accessToken, form) => async () => {
  try {
    await axios.post(
      "/v1/questions/edit",
      {
        question: values.question,
        answer1: values.answer1,
        answer2: values.answer2,
        answer3: values.answer3,
        answer4: values.answer4,
        correctanswer: values.correctanswer,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    form.resetFields();
    Modal.success({
      title: "Create question successfully",
    });
  } catch (error) {
    Modal.error({
      title: "Create question failed",
    });
  }
};

export const deleteQuestion = (accessToken, questionId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/v1/questions/edit/${questionId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteQuestionSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Delete failed",
      content: error.message,
    });
  }
};

export const getListUser = (accessToken) => async (dispatch) => {
  try {
    const { data } = await axios.get("/v1/users?limit=500", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Can not get user",
    });
  }
};

export const createUser = (values, accessToken, form) => async () => {
  try {
    await axios.post(
      "/v1/users",
      {
        username: values.username,
        password: values.password,
        email: values.email,
        role: values.role,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    Modal.success({
      title: "Create successfully",
    });
    form.resetFields();
  } catch (error) {
    Modal.error({
      title: "Create failed",
    });
  }
};

export const updateUser =
  (accessToken, updateInfor, userId) => async (dispatch) => {
    try {
      const { data } = await axios.patch(`/v1/users/${userId}`, updateInfor, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(updateUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
