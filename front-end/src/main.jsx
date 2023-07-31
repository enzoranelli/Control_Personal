import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Formulario from './components/Formulario.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path:'/formulario',
    element: <Formulario />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router= {router}/>
  </React.StrictMode>,
);
