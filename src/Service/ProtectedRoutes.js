import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthen } from "../utils/isAuthen";

const ProtectedRoutes = () => {
  return isAuthen() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
