import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddDomain from "./components/AddDomain";
import AddSkills from "./components/AddSkills";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Header from "./components/Header";

import "./index.scss";

const App = () => (
  <>
    <Header appName={"App 1"} />
    <Routes>
      {/* app routes: This can be changed later */}
      <Route path="/skill/list" element={<h1>List</h1>} />
      <Route path="/skill/choose" element={<h1>Choose SKill</h1>} />
      <Route path="/skill/report" element={<h1>Report</h1>} />
      <Route path="/add-domain" element={<AddDomain />} />
      <Route path="/add-skills" element={<AddSkills />} />
    

      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Routes>
  </>
);
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("app")
);
