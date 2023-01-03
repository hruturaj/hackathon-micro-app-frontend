
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
// import Product from 'app2/Product';
// import ProductDetail from 'app2/ProductDetail';
import localRoutes from './routes';
import remoteRoutes from 'app2/routes';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from './homePage';
import './index.scss';
import Navigation from './Navigation';
const routes = [...localRoutes,...remoteRoutes];

const App = () => (
  <>
    <Header appName={'App 1'} />
    {/* <Navigation/> */}
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* <Route path="/" element={<HomePage/>} /> */}
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* app routes: This can be changed later */}
        {/* <Route path="/skill/list" element={<h1>List</h1>} />
      <Route path="/skill/choose" element={<h1>Choose SKill</h1>} />
      <Route path="/skill/report" element={<h1>Report</h1>} /> */}

      {/* Temp Routes to check app linking */}
      {/* <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/product" element={<Product />} /> */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      {/* Auth Routes */}
      {/* <Route path="/auth/login" element={<h1>Login Page</h1>} />
      <Route path="/auth/register" element={<h1>Register Page</h1>} /> */}
    </Routes>
  </Suspense>
  </>
);

export default App;

