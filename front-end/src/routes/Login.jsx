
import {useState} from "react";
import { useAuth } from '../auth/authProvider.jsx';
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL, headers} from "../auth/constantes.js";

import axios from 'axios';

export default function Login(){
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();


    
    async function handleSubmit(e){
        e.preventDefault();
        try {
            const apiUrl = `${API_URL}/login`;
            const data = {correo: correo, password: password};
            // Realiza una solicitud POST utilizando Axios
            axios.post(apiUrl, data, {headers: headers})
            .then((response) => {
                console.log(response)
                auth.guardarUsuario(response.data.body);
                
            })
            .catch((error) => {
                console.error('Error al enviar el JSON:', error);
            });
        } catch (error) {
            console.error('Error al enviar el JSON:', error);
        }
    }

   
    if(auth.isAuthenticated){
        return <Navigate to='/dashboard'/>
    }

    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                
                <label>Correo</label>
                <input 
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)} 
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button >Iniciar sesión</button>
            </form>
        </div>
    );
}