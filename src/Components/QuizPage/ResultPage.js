import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Row } from "antd";
import Navbar from "../StartPage/Navbar";
import { clearAnswer } from "../../redux/answer/reducer";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "antd";

function ResultPage() {
  const { Title } = Typography;
  const totalTrue = useSelector((state) => state.auth.auth.user.score);
  const listQuestion = useSelector((state) => state.question.question);
  const score = Math.round((totalTrue * 100) / listQuestion.length);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleRetry = () => {
    dispatch(clearAnswer());
    nav("/listquiz");
  };

  const handleBack = () => {
    dispatch(clearAnswer());
    nav("/quizsetting");
  };
  return (
    <div>
      <Navbar />
      <Row type="flex" justify="center" align="middle">
        <Form justify="center" align="middle">
          <Form.Item>
            <Title> Final Score </Title>
          </Form.Item>
          <Form.Item>
            <Title>
              You get {totalTrue} out of {listQuestion.length}
            </Title>
          </Form.Item>
          <Form.Item>
            <Title> Your score is: {score}%</Title>
          </Form.Item>
          {score < 70 ? (
            <Form.Item>
              <p>You need at least 70% to pass</p>
              <Button size="large" shape="round" onClick={handleRetry}>
                Retry
              </Button>
            </Form.Item>
          ) : (
            <Form.Item>
              <p>Congratulation! You have passed!</p>
              <Button size="large" shape="round" onClick={handleBack}>
                Back to Settings!
              </Button>
            </Form.Item>
          )}
        </Form>
      </Row>
    </div>
  );
}

export default ResultPage;
