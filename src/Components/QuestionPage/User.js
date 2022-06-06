import React, { useEffect } from "react";
import quesService from "../../Service/questionService";

function User() {
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await quesService.getQuestionUser(5);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return <h1>User</h1>;
}
export default User;
