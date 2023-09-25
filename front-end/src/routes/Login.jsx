import imagen from '../images/login-imagen.png';
import '../styles/Login.css'
import {useState} from "react";
import { useAuth } from '../auth/authProvider.jsx';
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL, headers} from "../auth/constantes.js";

import axios from 'axios';

export default function Login(){
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();
    const goTo = useNavigate();


    
    async function handleSubmit(e){
        e.preventDefault();
        if(correo !== '' && password !== ''){
            try {
                const apiUrl = `${API_URL}/login`;
                const data = {correo: correo, password: password};
                axios.post(apiUrl, data, {headers: headers})
                .then((response) => {
                    console.log(response)
                    auth.guardarUsuario(response.data.body);
                    
                })
                .catch((error) => {
                    if(error.response && error.response.data){
                        setError(error.response.data.body);
                    }else{
                        setError('Error en la solicitud al servidor');
                    }
                });
            } catch (error) {
                console.error('Error al enviar el JSON:', error);
            }
        }else{
            setError('Campos vacios');
        }
        
    }

   
    if(auth.isAuthenticated){
        return <Navigate to='/dashboard'/>
    }

    return(
        <div>
            
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="titulo">Bienevenido a <span className="resaltado">User Testing</span></h1>
                <img className="imagen-logo"  src={imagen} alt="Logo de empresa" />
                {error !== '' && (<p className='error'>¡{error}!</p>)}
                <label className='label-login'>Correo</label>
                <input 
                    className='input-login'
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)} 
                />

                <label className='label-login'>Contraseña</label>
                <input
                className='input-login'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='boton-login'>Iniciar sesión</button>
            </form>
        </div>
    );
}