import { useAuth } from '../auth/authProvider.jsx';
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Home(){
    
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }
    if (auth.userRole !== "normal") {
        return <Navigate to="/dashboard" />; 
    }

    return (
        <>
            <Link to={"/"}>Volver al inicio</Link>
            
            <h1>Empleado normal</h1>
        </>
        
    );
}