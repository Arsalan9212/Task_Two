import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import {  useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();

  let localRole = localStorage.getItem('role');
  let token = localStorage.getItem('token');
  const { role } = useSelector((state) => state.users.item);

  useEffect(() => {
    if (token) {
      if (localRole === 'false') {
        navigate('/');
      } else if (localRole === 'true') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [token, localRole, role]);
  // token, role
  return token && <Component />;
};

export default ProtectedRoute;
