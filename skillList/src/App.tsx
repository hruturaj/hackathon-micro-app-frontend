import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

import './index.css';
import ProductHome from './components/ProductHome';
import ProductDetail from './components/ProductDetail';
import localRoutes from './routes';
import remoteRoutes from 'app1/routes';
const Header = React.lazy(() => import('app1/Header'));

const routes = [...localRoutes,...remoteRoutes];
const App = () => (
  <>
    <React.Suspense fallback={<h1>Loading</h1>}>
    <Header appName={"App 2"} />
    <Routes>
      {/* <Route path="/" element={<h1>List</h1>} /> */}
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {/* <Route index ></Route> */}
      {/* <Route path="/product" element={<ProductHome />} />
      <Route path="/product/:id" element={<ProductDetail />} /> */}
    </Routes>
    </React.Suspense>
  </>
);
export default App;
