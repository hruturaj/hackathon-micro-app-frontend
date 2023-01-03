import React from "react";
import { Navigate } from "react-router-dom";

const HomePage = ({ redirectLink }) => (
  <Navigate replace to={redirectLink ?? ""} />
);

export default HomePage;
