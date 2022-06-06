import React from "react";
import { Typography, InputNumber, Button } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

function QuestionSetting() {
  const nav = useNavigate();
  let numberOfQuestion;

  const handleChange = (values) => {
    numberOfQuestion = values;
  };

  const handleSubmit = () => {
    nav("/listquiz");
  };
  return (
    <div>
      <Title>Quiz App</Title>
      <Text>Choose Amount of question: </Text>
      <InputNumber min={1} max={numberOfQuestion} onChange={handleChange} />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default QuestionSetting;
