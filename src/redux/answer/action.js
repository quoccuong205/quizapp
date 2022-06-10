import "antd/dist/antd.css";
import axios from "../../api/axios";
import { Modal } from "antd";
import { submitQuestionSuccess } from "./reducer";

export const submitQuestion =
  (accessToken, questionAnswer) => async (dispatch) => {
    try {
      const { data } = await axios.get("/v1/questions/submit", questionAnswer, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(submitQuestionSuccess(data));
    } catch (error) {
      Modal.error({
        title: "Submit question failed",
        content: error.message,
      });
    }
  };
