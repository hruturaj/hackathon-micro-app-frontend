import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import localRoutes from "./routes";
import { checkUserLoggedIn } from "./utils";
import ProtectedRoute from "./ProtectedRoute";
import remoteRoutes from "app1/routes";
const Header = React.lazy(() => import("app1/Header"));
const Login = React.lazy(() => import("app1/Login"));
const Register = React.lazy(() => import("app1/Register"));

const routes = [...localRoutes, ...remoteRoutes];
const App = () => (
  <>
    <Header appName={"Choose Skill"} />
    <React.Suspense fallback={<h1>Loading</h1>}>
      <Routes>
        <Route
          path="/auth/login"
          element={
            checkUserLoggedIn() ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/auth/register"
          element={
            checkUserLoggedIn() ? <Navigate to="/" replace /> : <Register />
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route
            key={"home"}
            path={"/"}
            element={<Navigate to="/skill/list" />}
          />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </React.Suspense>
  </>
);
export default App;
