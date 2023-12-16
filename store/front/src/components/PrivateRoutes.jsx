import { Backdrop } from '@mui/material';
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import SignInSide from './SignIn';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ?<Element />:<SignInSide></SignInSide>
};

export default PrivateRoute;
