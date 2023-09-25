import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react';
import {API_URL, headers} from '../auth/constantes';
import { Link } from "react-router-dom";
import { useAuth } from '../auth/authProvider.jsx';
import  NoHayDatos from '../components/noHayDatos';
import Eliminar from '../components/Eliminar';
import { useNavigate} from "react-router-dom";
import '../styles/Detalle.css';


function Detalle() {
    const auth = useAuth();
    const { id } = useParams();
    const [peticion, setPeticion] = useState([]);
    const [cartelAbierto, setCartelAbierto] = useState(false);
    const navigate = useNavigate()

    const handleDelete = () => {
     
      alert('Usuario eliminado');
      setCartelAbierto(false);
      const apiUrl = `${API_URL}/personal/${id}`;

      try {
        axios.delete(apiUrl,{headers: headers})
        .then((response)=>{
          console.log('Respuesta de la API:', response.data);
          alert('Empleado eliminado exitosamente');
          navigate('/dashboard');
        })
      } catch (error) {
        console.error('Error al enviar el JSON:', error);
      }
      

    };
  
    const handleCancel = () => {
      setCartelAbierto(false); 
    };
  
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
            console.log(response.data);
            setPeticion(response.data);
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
          <button className="boton-volver">Volver al inicio</button>
        </Link>
        <h2>Tabla de actividad</h2>
        <div className='contenedor-actividad'>
          <DataTable columns={colums} data={peticion.body} noDataComponent={<NoHayDatos />} pagination/>
        </div>
        {auth.userRole === 'admin' ? (
        <>
          <button 
            className="boton-eliminar"
            onClick={()=> setCartelAbierto(true)}>
              Eliminar
          </button>
          <Eliminar
            estaAbierto={cartelAbierto}
            confirmar={handleDelete}
            cancelar={handleCancel}
          />
        </>
        ) : (
          <></>
        )}
      </div>
    );
  }
  
  export default Detalle;