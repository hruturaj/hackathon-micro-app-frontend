import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Product from "app2/Product";
import ProductDetail from "app2/ProductDetail";

import "./index.scss";

const App = () => (
  <>
    <Header appName={"App 1"} />
    <Routes>
      {/* app routes: This can be changed later */}
      <Route path="/skill/list" element={<h1>List</h1>} />
      <Route path="/skill/choose" element={<h1>Choose SKill</h1>} />
      <Route path="/skill/report" element={<h1>Report</h1>} />

      {/* Temp Routes to check app linking */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/product" element={<Product />} />

      {/* Auth Routes */}
      <Route path="/auth/login" element={<h1>Login Page</h1>} />
      <Route path="/auth/register" element={<h1>Register Page</h1>} />
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
