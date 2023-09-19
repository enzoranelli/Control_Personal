import '../styles/App.css';
import { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Boton from '../components/boton';
import Logo from '../components/Logo';
import cruz from '../images/mas.png';
import lupa from '../images/busqueda.png';
import {API_URL} from '../auth/constantes';
import { useAuth } from '../auth/authProvider.jsx';
import { Navigate, useNavigate } from "react-router-dom";


function App() {
  const auth = useAuth();
  const [peticion, setPeticion] = useState([]);
  /*const headers={
    "ngrok-skip-browser-warning": "69420",
  }*/
  const verPeti=()=>{
    console.log(peticion);
    
  };

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (auth.userRole !== "admin") {
    return <Navigate to="/home" />; 
  }

  const colums = [
    {
      name: 'Documento',
      selector: row => row.DNI
    },
    {
     name: 'Nombre',
     selector: row => row.Nombre
    },
    {
      name: 'Telefono',
      selector: row => row.telefono
    },
    {
      name: 'Puesto',
      selector: row => row.puesto
    },
    {
      name: 'Horas de trabajo',
      compact: true,
      selector: row => row.horasTrabajoXDia
    },
    {
      name: 'Sección',
      compact: true,
      selector: row => row.seccion
    },
    {
      name: 'Dirección',
      compact: true,
      selector: row => row.direccion
    },
    {
      name: 'Correo electronico',
      minWidth: '60',
      selector: row => row.correo
    }
    
    
  ]
  useEffect(()=>{

    const fetchData = async() => {
      try {
        const response = await axios.get(`${API_URL}/personal`);
        
       
        if(response.status === 200){
          console.log('datos recibidos correctamente');
         
          setPeticion(response.data)
        }
      } catch (error) {
        console.log(error);
      } 
    }
   fetchData();
  },[]);

  return (
      <>
        
        
        
      <Logo></Logo>
      <div className='contenedor-principal'>
        <div className='contenedor-botones'>
          
          <Boton texto='Hacer Consulta' imagen={lupa} url='consulta'/>
          <Boton texto='Configurar y ver listado' imagen={cruz} url='formulario'/>
            
        </div>

        <div className='contenedor-empleados'>
          <DataTable columns={colums} data={peticion.body}/>
        </div>
        
      </div> 
        
      </>
      
  )
}

export default App
