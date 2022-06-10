import { Row, Typography } from "antd";
import React from "react";

function Homepage() {
  const { Title } = Typography;
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Title>Quiz App</Title>
    </Row>
  );
}
export default Homepage;
