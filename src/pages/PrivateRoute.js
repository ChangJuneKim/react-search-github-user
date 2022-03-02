import React, { useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;

  return isUser ? children : <Navigate to='/login' />;
};
export default PrivateRoute;
