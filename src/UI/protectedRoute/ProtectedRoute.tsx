import React from 'react';
import { Navigate} from "react-router-dom";

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