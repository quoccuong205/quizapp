import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/add" element={<AddTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
