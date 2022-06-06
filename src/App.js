import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/StartPage/Register";
import Homepage from "./Components/QuestionPage/Homepage";
import Login from "./Components/StartPage/Login";
import {
  AdminRoute,
  UserRoute,
  ProtectedRoute,
} from "./Service/ProtectedRoutes";
import Admin from "./Components/QuestionPage/Admin";
import User from "./Components/QuestionPage/User";
import { isAuthen } from "./utils/isAuthen";

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
          <Route path="/user" element={<User />} />
        </Route>
        <Route element={<AdminRoute role={role} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
