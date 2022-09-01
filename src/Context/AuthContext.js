import React, { useState, createContext } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
    const [authkey, setAuthkey] = useState('');
    const logAuth  = (data) => {
        setAuthkey(data);
    }
    return (
        <AuthContext.Provider value={{ logAuth, authkey}}>
            {children}
        </AuthContext.Provider>
    );
};