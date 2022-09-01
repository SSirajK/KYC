import React, { useState, createContext } from "react";

export const DataContext = React.createContext();

export const DataContextProvider = ({ children }) => {
    const [datas, setDatas] = useState('');
    const dataAuth  = (e) => {
        setDatas(e);
    }
    return (
        <DataContext.Provider value={{ dataAuth, datas}}>
            {children}
        </DataContext.Provider>
    );
};