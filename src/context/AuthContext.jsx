import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('nexus_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Simulación de autenticación
        if (email === 'admin@dacaro.cl' && password === 'admin') {
            const userData = { email, role: 'admin', name: 'Administrador' };
            setUser(userData);
            localStorage.setItem('nexus_user', JSON.stringify(userData));
            return { success: true, role: 'admin' };
        } else if (email === 'cliente@dacaro.cl' && password === 'cliente') {
            const userData = { email, role: 'client', name: 'Cliente Demo' };
            setUser(userData);
            localStorage.setItem('nexus_user', JSON.stringify(userData));
            return { success: true, role: 'client' };
        }
        return { success: false, message: 'Credenciales inválidas' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nexus_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};
