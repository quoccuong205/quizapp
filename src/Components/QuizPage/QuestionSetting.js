import React from "react";
import { Typography, InputNumber, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfQuestion } from "../../redux/question/reducer";
import { Col } from "antd";
import Navbar from "../StartPage/Navbar";
const { Title } = Typography;

function QuestionSetting() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const maxQuestion = useSelector((state) => state.question.maxQuestion);
  const handleChange = (values) => {
    dispatch(getNumberOfQuestion(values));
  };

  const handleSubmit = () => {
    nav("/listquiz");
  };
  return (
    <div>
      <Navbar />
      <Col type="flex" justify="center" align="middle">
        <Title level={3}>Choose Amount of question: </Title>
        <InputNumber min={1} max={maxQuestion} onChange={handleChange} />
        <br />
        <br />
        <Button
          size="medium"
          shape="round"
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Col>
    </div>
  );
}

export default QuestionSetting;
