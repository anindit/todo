import React from 'react';
import { Route,Redirect,withRouter } from 'react-router-dom';

const ProtectedRoute = ({isAuth:isAuth,component: Component, ...rest }) => {
  
  return (
    <Route {...rest} render={(props) => {
      return isAuth === false
        ? <Redirect to='/' />
        : <Component {...props} {...rest} />
    }} />
  )
}


export default ProtectedRoute;