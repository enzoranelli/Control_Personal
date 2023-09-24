import { useAuth } from '../auth/authProvider.jsx';
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect , useState} from 'react';
import { Link } from "react-router-dom";
import QRCode from 'qrcode';
import '../styles/home.css'; 

export function Home(){
    
    const auth = useAuth();
    const [qrCodeUrl, setQRCodeUrl] =useState('');
    const [datos, setDatos] = useState();
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

       
    
    return (
        <div className='contenedor-principal'>
            <Link to={`/Detalle/${auth.getUser()?.Persona || ''}`}><button className="boton-actividad">Ver Actividad</button></Link>
            
            <h1>Empleado normal de {auth.getUser()?.correo || ''}</h1>

            {qrCodeUrl && <img src={qrCodeUrl} alt='Codigo qr' className='qr-imagen' />}
        </div>
        
    );
}