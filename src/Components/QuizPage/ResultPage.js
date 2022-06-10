import React from "react";
import { useSelector } from "react-redux";
import { Typography, Row } from "antd";

function ResultPage() {
  const { Title } = Typography;
  const score = useSelector((state) => state.auth.auth.user.score);
  return (
    <div>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Title>Your Score is {score}</Title>
      </Row>
    </div>
  );
}

export default ResultPage;
