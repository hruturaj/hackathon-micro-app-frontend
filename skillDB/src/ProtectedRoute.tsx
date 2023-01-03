import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkUserLoggedIn } from "./utils";

const ProtectedRoute = ({ redirectPath = "/auth/login", homeRoute = "/" }) => {
  const loggedIn = checkUserLoggedIn();
  const url = window.location.href;
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  if (url === "/") {
    <Navigate to={homeRoute} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
