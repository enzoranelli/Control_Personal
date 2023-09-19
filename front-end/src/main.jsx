import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import Login from './routes/Login.jsx';
import Formulario from './routes/Formulario.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './styles/index.css';
import { AuthProvider } from './auth/authProvider.jsx';
import { Home } from './routes/home.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  
  {
    path:'/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <App />,
      },
      {
        path:'/formulario',
        element: <Formulario />
      },
      {
        path:'/home',
        element:<Home />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router= {router}/>
    </AuthProvider>
    
  </React.StrictMode>,
);
