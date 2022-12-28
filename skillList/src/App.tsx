import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Header from "home/Header";

import "./index.css";
import ProductHome from "./components/ProductHome";
import ProductDetail from "./components/ProductDetail";

const App = () => (
  <>
    <Header appName={"App 2"} />
    <Link to="/product">Product page link</Link>
    <div className="container">
      <div>Name: skill List - micro app 2</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Empty CSS</div>
    </div>
    <Routes>
      {/* <Route index ></Route> */}
      <Route path="/product" element={<ProductHome />} />
      <Route path="/product/:id" element={<ProductDetail />} />
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
