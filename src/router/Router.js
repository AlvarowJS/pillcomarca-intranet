// ** Router imports
import { lazy, useEffect, useState } from 'react'

// ** Router imports
import { useRoutes, Navigate, Outlet } from "react-router-dom";

// ** GetRoutes
import { getRoutes } from "./routes";

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";
import Error from "../views/Error";

// ** Utils

// import Validation from '../views/authentication/Validation';
// import Congratulation from '../views/authentication/congratulation';
// import ForgotPassword from '../views/authentication/ForgotPassword';
// import ResetPassword from '../views/authentication/ResetPassword';
import NotAuthorized from '../views/authentication/NotAuthorized';
import { getUserData, getHomeRouteForLoggedInUser, getkey } from '../utility/Utils'

// ** Components
const Login = lazy(() => import('../views/authentication/Login'))
const ForgotPassword = lazy(() => import('../views/authentication/ForgotPassword'))
const Validation = lazy(() => import('../views/authentication/Validation'))
const ResetPassword = lazy(() => import('../views/authentication/ResetPassword'))

const Router = () => {
  // const [token, setToken] = useState()
  // useEffect(() => {
  //   const getToken = localStorage.getItem("token")
  //   setToken(getToken)
    
  // }, [])

  
  // ** Hooks
  const { layout } = useLayout();

  const allRoutes = getRoutes(layout);

  const getHomeRoute = () => {
    // console.log(token, "hola")
    // return '/login'
    const user = getkey()
    if(user != null){
      return '/tickets'
    }
    else{
      return '/login'
    }
    // if (user != null) {
    //   console.log('if route ')
    //   return getHomeRouteForLoggedInUser("normal")
    // } else {
    //   console.log('else route ')
    //   return '/login'
    // }
 
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
      // element: <Navigate replace to='/login' />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
  
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ]);

  return routes;
};

export default Router;
