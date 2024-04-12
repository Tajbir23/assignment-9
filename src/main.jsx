import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Body from './pages/Body.jsx'
import Login from './components/Authentication/Login.jsx'
import Register from './components/Authentication/Register.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import Error from './pages/Error.jsx'
import DetailsEstate from './pages/DetailsEstate.jsx'
import Contact from './pages/Contact.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
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
      },
      {
        path: '/details/:id',
        element: <DetailsEstate />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
