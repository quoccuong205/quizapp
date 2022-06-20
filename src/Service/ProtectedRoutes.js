import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ role }) => {
  if (role === "user") {
    return <Navigate to="/quizsetting" />;
  }
  if (role === "admin") {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
};

export const UserRoute = ({ role, accessToken }) => {
  if (!accessToken || (accessToken && role === "admin")) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export const AdminRoute = ({ role, accessToken }) => {
  if (!accessToken || (accessToken && role === "user")) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
