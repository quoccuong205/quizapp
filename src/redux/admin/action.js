import "antd/dist/antd.css";
import axios from "../../api/axios";
import { Modal } from "antd";
import {
  getQuestionAdminSuccess,
  updateQuestionSuccess,
  deleteQuestionSuccess,
} from "./reducer";

export const getListQuestion = (accessToken) => async (dispatch) => {
  try {
    const { data } = await axios.get("/v1/questions/edit", {
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

export const deleteQuestion = (accessToken, questionId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/v1/questions/edit/${questionId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteQuestionSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Update failed",
      content: error.message,
    });
  }
};
