
import {useState} from "react";
import { useAuth } from '../auth/authProvider.jsx';
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constantes.js";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();


    
    function handleSubmit(e){
        e.preventDefault();
        auth.autenticar('normal');
    }

    console.log(auth.isAuthenticated)
    if(auth.isAuthenticated){
        return <Navigate to='/dashboard'/>
    }

    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                
                <label>Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
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