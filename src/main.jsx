import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Body from './pages/Body.jsx'
import Login from './components/Authentication/Login.jsx'
import Register from './components/Authentication/Register.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Register />
      },
      {
        path: '/profile/:id',
        element: <UpdateProfile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
