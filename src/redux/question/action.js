import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import { getQuestionSuccess } from "./reducer";

export const getQuestion =
  (accessToken, numberOfQueston) => async (dispatch) => {
    try {
      const { data } = await axios.get("/v1/questions", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          limit: numberOfQueston,
        },
      });
      dispatch(getQuestionSuccess(data));
    } catch (error) {
      Modal.error({
        title: "Error getting questions",
        content: error.response.data.message,
      });
    }
  };
