import "antd/dist/antd.css";
import axios from "../../api/axios";
import { Modal } from "antd";
import { getScoreSuccess } from "../auth/reducer";

export const submitQuestion =
  (accessToken, questionAnswer, nav) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/v1/questions/submit",
        [...questionAnswer],
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch(getScoreSuccess(data));
      nav("/resultquiz");
    } catch (error) {
      Modal.error({
        title: "Submit question failed",
        content: error.message,
      });
    }
  };
