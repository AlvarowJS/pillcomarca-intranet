// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/authentication/Login'))



const AuthenticationRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  }
]

export default AuthenticationRoutes
