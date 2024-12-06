import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import React from 'react';

import { selectCurrentUser } from '../store/reducers/AuthSlice';

const RequireAuth = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  return user && user.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="auth/sign_in" state={{ from: location }} replace />
  );
};
export default RequireAuth;
