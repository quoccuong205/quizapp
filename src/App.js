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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
