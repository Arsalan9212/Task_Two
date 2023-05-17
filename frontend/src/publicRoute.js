import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const PublicRoute = ({component: Component}) => {

  const navigate = useNavigate();
  let localRole = localStorage.getItem('role');
let localToken = localStorage.getItem('token');
//   const {token} = useSelector((state) => state.users);
  const {role} = useSelector((state) => state.users.item);

  useEffect(() => {
    if (!localToken) {
      navigate('/login');
    //   } else if (localToken && localRole) {
        // navigate('/admin');
    } else {
      navigate('/');
    }
  }, [role, localToken, localRole]);
  // token, role
  return !localToken  && <Component />;
};

export default PublicRoute;
