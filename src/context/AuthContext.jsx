import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext(); 

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(()=>{
        const savedUser = localStorage.getItem('lifedrop_user');
        return savedUser ?  JSON.parse(savedUser) : null;
    })

    const login=(userData) => {
        setUser(userData);
        localStorage.setItem('lifedrop_user', JSON.stringify(userData))
    }  
    const logout=() => {
        setUser(null);
        localStorage.removeItem('lifedrop_user');
    }

    const [mapFocus, setMapFocus] = useState([77.5946, 12.9716]);

    return(
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user, mapFocus, setMapFocus }}>
            {children}
        </AuthContext.Provider>
    );
};
 

export const useAuth= () => useContext(AuthContext);
