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

const routes = [...localRoutes, ...remoteRoutes];

const App = () => {
  return (
    <>
      <Header appName={'App 1'} loggedIn={checkUserLoggedIn()} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path='/auth/login'
            element={
              checkUserLoggedIn() ? <Navigate to='/' replace /> : <Login />
            }
          />
          <Route
            path='/auth/register'
            element={
              checkUserLoggedIn() ? <Navigate to='/' replace /> : <Register />
            }
          />
          <Route element={<ProtectedRoute loggedIn={checkUserLoggedIn()} />}>
            <Route
              key={'home'}
              path={'/'}
              element={<Navigate to='/skill/list' />}
            />

            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
