import React, { useState, createContext } from "react";

export const TokenContext = React.createContext();

export const TokenContextProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [captcha, setCaptcha] = useState('');

    const tokenAuth  = (data) => {
        setToken(data);
    }
    const captchaAuth = (data) => {
        setCaptcha(data)
    }
    return (
        <TokenContext.Provider value={{ tokenAuth, captchaAuth, token, captcha}}>
            {children}
        </TokenContext.Provider>
    );
};