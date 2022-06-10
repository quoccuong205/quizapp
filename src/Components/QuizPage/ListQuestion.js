import { Button } from "antd";
import { Typography, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../redux/question/action";
import "antd/dist/antd.css";

function ListQuestion() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOption] = useState([]);
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
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handleClick = () => {
    console.log("hihi");
  };
  return (
    <div className="container">
      <div className="container__question">
        <Title justify="center" align="middle">
          {" "}
          Question {currentIndex + 1}/ {listQuestion.length}{" "}
        </Title>
        <Title justify="center" align="middle" level={3}>
          {question?.question}
        </Title>
      </div>
      <Col md={{ span: 12, offset: 6 }}>
        <div className="container__answer">
          {options.map((option, index) => (
            <Button
              block
              size="large"
              shape="round"
              type="flex"
              justify="center"
              align="middle"
              margin="50px"
              style={{ margin: "15px" }}
              key={index}
              onClick={handleClick}
            >
              {option}
            </Button>
          ))}
          <Button
            block
            size="large"
            shape="round"
            type="flex"
            justify="center"
            align="middle"
            margin="50px"
            style={{ margin: "20px" }}
            md={{ span: 12, offset: 6 }}
            disabled={currentIndex + 1 < listQuestion.length ? false : true}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </Col>
    </div>
  );
}
export default ListQuestion;
