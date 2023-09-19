import { useContext, createContext, useState, useEffect } from "react";


const AuthContext = createContext({
    isAuthenticated: false,
    userRole:'normal',
    autenticar: ()=>{},
});
export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] =useState(false);
    const [userRole, setUserRole] = useState('');
   

   
    function autenticar(rol){
            setIsAuthenticated(true);
            setUserRole(rol)
    }

    
    return(
        <AuthContext.Provider value={{isAuthenticated,userRole,autenticar}}>
            {children}    
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);