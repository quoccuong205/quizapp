import React from "react";
import quesService from "../../Service/questionService";

function ListQuestion() {
  const fetchData = async () => {
    try {
      const response = await quesService.getQuestionUser(5);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
  return <h1>User</h1>;
}
export default ListQuestion;
