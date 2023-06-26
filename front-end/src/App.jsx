import './styles/App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

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

        */
        }
        <p>{`Hola soy ${peticion.nombre}, tengo ${peticion.edad} años y trabajo de ${peticion.ocupacion}`}</p>
        <h1>con react</h1>
        <button onClick={verPeti}>Hacer clic</button>
      </>
      
  )
}

export default App
