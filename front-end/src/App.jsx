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
        <div className='contenedor-botones'>
        
          <Boton texto='Hacer Consulta' imagen={lupa}/>
          <Boton texto='Configurar y ver listado' imagen={cruz}/>
          
        </div>

      <div>
        {peticion.map((item, index) => (
          <div key={index}>
            <h1>{item.Nombre}</h1>
            <p>{item.direccion}</p>
            <p>{item.seccion}</p>
          </div>
        ))}
      </div>
        
        
      </>
      
  )
}

export default App
