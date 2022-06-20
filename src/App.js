import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/StartPage/Register";
import Login from "./Components/StartPage/Login";
import {
  AdminRoute,
  UserRoute,
  ProtectedRoute,
} from "./Service/ProtectedRoutes";
import Admin from "./Components/AdminPage/Admin";
import QuestionSetting from "./Components/QuizPage/QuestionSetting";
import ListQuestion from "./Components/QuizPage/ListQuestion";
import { useDispatch, useSelector } from "react-redux";
import ResultPage from "./Components/QuizPage/ResultPage";
import NotFound from "./Components/StartPage/NotFound";
import GetUsers from "./Components/AdminPage/GetUsers";
import CreateUser from "./Components/AdminPage/CreateUser";
import GetQuestion from "./Components/AdminPage/GetQuestion";
import CreateQuestion from "./Components/AdminPage/CreateQuestion";
import tokenExpried from "./api/tokenExpired";
import { refresh } from "./redux/auth/action";
import { useEffect } from "react";

function App() {
  // const data = useSelector((state) => state.auth);
  // console.log(data);
  const accessToken = useSelector(
    (state) => state.auth?.auth?.tokens?.access?.token
  );
  const refreshToken = useSelector(
    (state) => state.auth?.auth?.tokens?.refresh?.token
  );
  const role = useSelector((state) => state.auth?.auth?.user?.role);

  const dispatch = useDispatch;

  useEffect(() => {
    if (accessToken && refreshToken) {
      tokenExpried(accessToken, () => {
        dispatch(refresh(refreshToken));
      });
    }
  }, [accessToken, refreshToken]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute role={role} />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<UserRoute role={role} accessToken={accessToken} />}>
          <Route path="/quizsetting" element={<QuestionSetting />} />
          <Route path="/listquiz" element={<ListQuestion />} />
          <Route path="/resultquiz" element={<ResultPage />} />
        </Route>
        <Route element={<AdminRoute role={role} accessToken={accessToken} />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/getusers" element={<GetUsers />} />
            <Route path="/admin/createuser" element={<CreateUser />} />

            <Route path="/admin/getquestions" element={<GetQuestion />} />
            <Route path="/admin/createquestion" element={<CreateQuestion />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
