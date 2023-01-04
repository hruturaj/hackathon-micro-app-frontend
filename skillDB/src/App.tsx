import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/Header';
import localRoutes from './routes';
import remoteRoutes from 'app2/routes';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { checkUserLoggedIn } from './utils';
import './index.scss';
import ErrorBoundary from './errorBoundary';
const routes = [...localRoutes];

const App = () => {
  return (
    <>
      <Header appName={'App 1'} />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<ProtectedRoute homeRoute={'/skill/list'} />}>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                  errorElement={<h1>Something went wrong</h1>}
                />
              ))}
            </Route>

            <Route
              path='/auth/login'
              element={
                checkUserLoggedIn() ? <Navigate to='/' replace /> : <Login />
              }
            />
            <Route path='/auth/register' element={<Register />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
