import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/StartPage/Register";
import Homepage from "./Components/StartPage/Homepage";
import Login from "./Components/StartPage/Login";
import {
  AdminRoute,
  UserRoute,
  ProtectedRoute,
} from "./Service/ProtectedRoutes";
import Admin from "./Components/AdminPage/Admin";
import { isAuthen } from "./utils/isAuthen";
import QuestionSetting from "./Components/QuizPage/QuestionSetting";
import ListQuestion from "./Components/QuizPage/ListQuestion";

function App() {
  let role;
  const data = isAuthen();
  if (data) {
    role = data.user.role;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<ProtectedRoute role={role} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<UserRoute role={role} />}>
          <Route path="/quizsetting" element={<QuestionSetting />} />
          <Route path="/listquiz" element={<ListQuestion />} />
        </Route>
        <Route element={<AdminRoute role={role} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
