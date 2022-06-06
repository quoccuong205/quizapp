import axios from "axios";
import { isAuthen } from "../utils/isAuthen";

const QUESTION_API = "https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/";
const data = isAuthen();

let userToken;
if (data && data.tokens) {
  userToken = "Bearer " + data.tokens.access.token;
}

const quesApi = axios.create({
  baseURL: QUESTION_API,
  headers: {
    contentType: "application/json",
    Authorization: userToken,
  },
});

const getQuestionUser = (limit) => {
  return quesApi.get("/", {
    params: {
      limit: limit,
    },
  });
};

const submitAnswer = (id, correctAnswer) => {
  return quesApi.post("submit", {
    id,
    correctAnswer,
  });
};

const createQuestion = (data) => {
  return quesApi.post("edit", data);
};

const updateQuestion = (id, data) => {
  return quesApi.patch(`edit/${id}`, data);
};

const deleteQuestion = (id) => {
  return quesApi.delete(`edit/${id}`);
};

const getQuestionById = (id) => {
  return quesApi.get(`edit/${id}`);
};

const getQuestionByAdmin = (id) => {
  return quesApi.get("edit");
};

const quesService = {
  getQuestionUser,
  submitAnswer,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionByAdmin,
  getQuestionById,
};

export default quesService;
