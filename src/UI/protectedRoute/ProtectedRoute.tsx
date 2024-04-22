import React from 'react';
import { Navigate, RouteProps} from "react-router-dom";
import { auth } from '../../store/auth/authSlice';
function ProtectedRoute ({ element: Component, ...props  }: {
    element: React.FC<any>;
    auth:boolean
  }) {
   //console.log(auth);
   
  return (
  
   (props.auth) ?  <Component />  : <Navigate to="/login" replace/>
)
}

export default ProtectedRoute;