import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Header from "./components/Header";
import localRoutes from "./routes";
import remoteRoutes from "app2/routes";
import ProtectedRoute from "./ProtectedRoute";
import { checkUserLoggedIn } from "./utils";
import "./index.scss";

const routes = [...localRoutes, ...remoteRoutes];

const App = () => {
  return (
    <>
      <Header appName={"App 1"} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<ProtectedRoute homeRoute={"/skill/list"} />}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          <Route
            path="/auth/login"
            element={
              checkUserLoggedIn() ? (
                <Navigate to="/" replace />
              ) : (
                <h1>Login Page</h1>
              )
            }
          />
          <Route path="/auth/register" element={<h1>Register Page</h1>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
