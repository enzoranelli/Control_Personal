import './styles/App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Boton from './components/boton';
import Logo from './components/Logo';
import cruz from './images/mas.png';
import lupa from './images/busqueda.png';

function App() {

  const [peticion, setPeticion] = useState([]);
  
  const verPeti=()=>{
    console.log(peticion);
    
  };

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:9000/api');
        setPeticion(response.data);
      
        
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
          
          <Boton texto='Hacer Consulta' imagen={lupa}/>
          <Boton texto='Configurar y ver listado' imagen={cruz}/>
            
        </div>

        <div className='contenedor-empleados'>
          {peticion.map((item, index) => (
            <div key={index}>
              <h1>{item.Nombre}</h1>
              <p><b>Direccion: </b>{item.direccion}</p>
              <p><b>Seccion de trabajo:</b>{item.seccion}</p>
            </div>
          ))}
        </div>
      </div> 
        
      </>
      
  )
}

export default App
