import { useAuth } from '../auth/authProvider.jsx';
import { Navigate} from "react-router-dom";
import { useEffect , useState} from 'react';
import { Link } from "react-router-dom";
import QRCode from 'qrcode';
import '../styles/home.css'; 
import {API_URL , headers} from '../auth/constantes';
import axios from 'axios';


export function Home(){
    
    const auth = useAuth();
    const [qrCodeUrl, setQRCodeUrl] =useState('');
    const [peticion, setPeticion] = useState();
    const [loading, setLoading] = useState(true);
    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }
    if (auth.userRole !== "normal") {
        return <Navigate to="/dashboard" />; 
    }


    
    
    useEffect(()=>{

        const qr = auth.getUser()?.qr || '';

        QRCode.toDataURL(qr)
        .then(url => {
            setQRCodeUrl(url);
        })
        .catch(error => {
            console.error('Error al generar el código QR:', error);
        });

    },[]); 

       
    useEffect(()=>{
        const fetchData = async() => {
            try {
                const id = auth.getUser()?.Persona || '';
                const response = await axios.get(`${API_URL}/personal/${id}`,{headers:headers});
                if(response.status === 200){
                    console.log('datos recibidos correctamente');
                    console.log(response);
                    console.log(response.data)
                    setPeticion(response.data.body);
                    setLoading(false);
                }
            }catch (error) {
              console.log(error);
            } 
          }
         fetchData();
    },[]);
    
    return (
        <div className='contenedor-home'>
            <Link to={`/Detalle/${auth.getUser()?.Persona || ''}`}>
                <button className="boton-volver">Ver Actividad</button>
            </Link>
            
            <h1>¡Bienvenido,{peticion?.Nombre || ''}!</h1>
            <div className='contenedor-qr'>
                {qrCodeUrl && <img src={qrCodeUrl} alt='Codigo qr' className='qr-imagen' />}
                <p>Escaneé su QR en los puntos de accesos para su ingreso y salida.</p>
            </div>

            <div className="datos">
                <h2>Tus datos</h2>
                {
                    loading ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <ul>
                            {Object.keys(peticion).map((key, index)=>(
                                <li key={index}>
                                    <strong>{key}:</strong> {peticion[key]}
                                </li>
                            ))}
                        </ul>
                    )
                }

            </div>
            

        </div>
        
    );
}