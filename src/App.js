import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/StartPage/Register";
import Homepage from "./Components/QuestionPage/Homepage";
import Login from "./Components/StartPage/Login";
import ProtectedRoutes from "./Service/ProtectedRoutes";
import Admin from "./Components/QuestionPage/Admin";
import User from "./Components/QuestionPage/User";

function App() {
  const data = JSON.parse(localStorage.getItem("data"));
  let role;
  if (data) {
    role = data.user.role;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes role={role} />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
