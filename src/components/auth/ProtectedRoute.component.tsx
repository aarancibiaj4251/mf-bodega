import React, {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import keycloak from '../../config/auth/keycloak.config';

type ProtectedRouteProps = PropsWithChildren<{}>

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

  if (!keycloak.authenticated) {
    return <Navigate to="/no-authorized" replace></Navigate>
  }

  if (keycloak.authenticated) {
    return (
      <>
        {children}
      </>
    );
  }

};

export default ProtectedRoute;
