import React from "react";
import { Typography, InputNumber, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfQuestion } from "../../redux/question/reducer";
import { Row } from "antd";
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
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Title level={3}>Choose Amount of question: </Title>
        <InputNumber min={1} max={maxQuestion} onChange={handleChange} />
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Row>
    </div>
  );
}

export default QuestionSetting;
