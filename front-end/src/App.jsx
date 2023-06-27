import './styles/App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Boton from './components/boton';
import Logo from './components/Logo';
import cruz from './images/mas.png';
import lupa from './images/busqueda.png';

function App() {
  const [peticion, setPeticion] = useState('');


  const verPeti=()=>{
    console.log(peticion);
    
  };
  useEffect(()=>{
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:9000/')
        setPeticion(response.data)
        verPeti();
        
      } catch (error) {
        console.log(error);
      } 
    }
   fetchData();
  },[]);

  
  return (
      <>
        {/* Peticion de prueba a mi server 

        <h1>{peticion}</h1>
        <p>{`Hola soy ${peticion.nombre}, tengo ${peticion.edad} años y trabajo de ${peticion.ocupacion}`}</p>
        */
        }
        <Logo></Logo>
        <div className='contenedor-botones'>
          
          <Boton texto='Hacer Consulta' imagen={lupa}/>
          <Boton texto='Configurar y ver listado' imagen={cruz}/>
        </div>
        
        
      </>
      
  )
}

export default App
