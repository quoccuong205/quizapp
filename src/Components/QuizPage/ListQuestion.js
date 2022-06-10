import { Button } from "antd";
import { Typography, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../redux/question/action";
import "antd/dist/antd.css";

function ListQuestion() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOption] = useState([]);
  const [answer, setAnswer] = useState("");
  const accessToken = useSelector(
    (state) => state.auth.auth.tokens.access.token
  );
  let allAnswer = [];
  const numberOfQuestion = useSelector(
    (state) => state.question.numberOfQuestion
  );
  const listQuestion = useSelector((state) => state.question.question);
  const question = listQuestion[currentIndex];
  useEffect(() => {
    dispatch(getQuestion(accessToken, numberOfQuestion));
  }, [accessToken]);

  useEffect(() => {
    if (listQuestion?.length) {
      let answers = [
        question?.answer1,
        question?.answer2,
        question?.answer3,
        question?.answer4,
      ];
      setOption(answers);
    }
  }, [question, listQuestion]);
  const handleBack = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const handleNextAndSubmit = () => {
    // try {
    //   if (answers!==''){
    //     if (allAnswer.map((item, index)=> item[index].id === currentIndex)){
    //     }
    //   }
    // } catch (error) {
    // }
  };
  const handleClick = (option) => {
    setAnswer(option);
  };
  return (
    <div className="container">
      <div className="container__question">
        <Title justify="center" align="middle" style={{ marginLeft: "50px" }}>
          {" "}
          Question {currentIndex + 1}/ {listQuestion.length}{" "}
        </Title>
        <Title
          justify="center"
          align="middle"
          level={3}
          style={{ marginLeft: "50px" }}
        >
          {question?.question}
        </Title>
      </div>
      <Col md={{ span: 12, offset: 6 }}>
        {options.map((option, index) => (
          <Button
            block
            size="large"
            shape="round"
            style={{ margin: "15px" }}
            key={index}
            onClick={handleClick}
          >
            {option}
          </Button>
        ))}

        <Row
          type="flex"
          justify="center"
          align="middle"
          md={{ span: 12, offset: 6 }}
        >
          <Button
            shape="round"
            style={{ margin: "20px" }}
            disabled={currentIndex < 1 ? true : false}
            onClick={handleBack}
            style={{ marginLeft: "50px" }}
          >
            Back
          </Button>
          <Button
            shape="round"
            type="flex"
            style={{ margin: "20px" }}
            onClick={handleNextAndSubmit}
          >
            {currentIndex + 1 < listQuestion.length ? "Next" : "Submit"}
          </Button>
        </Row>
      </Col>
    </div>
  );
}
export default ListQuestion;
