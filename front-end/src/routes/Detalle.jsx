import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react';
import {API_URL, headers} from '../auth/constantes';
import { Link } from "react-router-dom";
import { useAuth } from '../auth/authProvider.jsx';
import  NoHayDatos from '../components/noHayDatos';

function Detalle() {
    const auth = useAuth();
    const { id } = useParams();
    const [peticion, setPeticion] = useState([]);
    // Utiliza el valor de 'id' para cargar los detalles específicos
    // Puedes realizar una consulta a una API o una base de datos aquí
    const colums = [
      {
        name: 'id',
        selector: row => row.id
      },
      {
       name: 'Persona',
       selector: row => row.Persona
      },
      {
        name: 'Fecha',
        selector: row => row.Fecha,
        cell: (row)=>(
          <div style={{ overflow: 'visible', whiteSpace: 'normal' }}>
            {row.Fecha}
          </div>
        ),
      },
    ]

    useEffect(()=>{
      
      const fetchData = async() => {
        try {
          const response = await axios.get(`${API_URL}/entrada_salida/${id}`,{headers:headers});
          
         
          if(response.status === 200){
            console.log('datos recibidos correctamente');
            console.log(response.data)
            setPeticion(response.data)
          }
        } catch (error) {
          console.log(error);
        } 
      }
      fetchData();
    },[]);


    return (
      <div>
        <Link to={`/${auth.userRole === 'admin' ? 'dashboard':'home'}`}>
          <button>Volver al inicio</button>
        </Link>
        <h2>Tabla de actividad</h2>
        <div className='contenedor-empleados'>
          <DataTable columns={colums} data={peticion.body} noDataComponent={<NoHayDatos />}/>
        </div>
      </div>
    );
  }
  
  export default Detalle;