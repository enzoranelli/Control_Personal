import { useContext, createContext, useState, useEffect } from "react";


const AuthContext = createContext({
    isAuthenticated: false,
    userRole:'normal',
    guardarUsuario: ()=>{},
    getUser: ()=>{},
});
export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] =useState(false);
    const [userRole, setUserRole] = useState('');
    const [user, setUser] = useState();

    function guardarUsuario(userData){
        var rol = userData.rh === 1 ? 'admin' : 'normal';
        console.log('userdata.rh : ',userData.rh)
        console.log('Rol indicado',rol)
        setUserRole(rol)
        setIsAuthenticated(true);
        setUser(userData);
    }

    function getUser(){
        return user;
    }
    
    return(
        <AuthContext.Provider value={{isAuthenticated,userRole,guardarUsuario,getUser}}>
            {children}    
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);