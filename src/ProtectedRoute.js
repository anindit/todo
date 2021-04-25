import React from 'react';
import { Route,Redirect,withRouter } from 'react-router-dom';

const ProtectedRoute = ({props,isAuth:isAuth,component: Component, ...rest }) => {
  
  return (
    <Route {...rest} render={() => {
      return isAuth === false
        ? <Redirect to='/' />
        : <Component {...rest} />
    }} />
  )
}


export default withRouter(ProtectedRoute);