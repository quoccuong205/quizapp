import { Button } from "antd";
import { Typography, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../redux/question/action";
import "antd/dist/antd.css";
import { submitQuestion } from "../../redux/answer/action";
import { useNavigate } from "react-router-dom";
import { saveQuestionSuccess } from "../../redux/answer/reducer";
import Navbar from "../StartPage/Navbar";

function ListQuestion() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOption] = useState([]);
  const [answer, setAnswer] = useState("");
  const nav = useNavigate();
  const allAnswer = useSelector((state) => state.answer.answer);
  const accessToken = useSelector(
    (state) => state.auth.auth.tokens.access.token
  );
  const numberOfQuestion = useSelector(
    (state) => state.question.numberOfQuestion
  );
  const listQuestion = useSelector((state) => state.question.question);
  const question = listQuestion[currentIndex];

  useEffect(() => {
    dispatch(getQuestion(accessToken, numberOfQuestion));
  }, [accessToken, dispatch, numberOfQuestion]);
  const questionId = question?.id;

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

  const handleAnswer = (option) => {
    setAnswer(option);
  };
  const handleNextAndSubmit = () => {
    if (answer === "") {
      console.log("Please answer all question");
    } else {
      console.log(answer);
      dispatch(saveQuestionSuccess({ id: questionId, correctanswer: answer }));
      setAnswer("");
      if (currentIndex + 1 < listQuestion.length) {
        setCurrentIndex((currentIndex) => currentIndex + 1);
      } else {
        dispatch(submitQuestion(accessToken, allAnswer, nav));
      }
    }
  };
  return (
    <div>
      <Navbar />
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
              onClick={() => handleAnswer(option)}
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
    </div>
  );
}
export default ListQuestion;
