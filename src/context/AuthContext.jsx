import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('nexus_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Simulación de autenticación
        if (email === 'admin@nexus.com' && password === 'admin') {
            const userData = { email, role: 'admin', name: 'Administrador' };
            setUser(userData);
            localStorage.setItem('nexus_user', JSON.stringify(userData));
            return { success: true, role: 'admin' };
        } else if (email === 'cliente@empresa.com' && password === 'cliente') {
            const userData = { email, role: 'client', name: 'Industrias S.A.' };
            setUser(userData);
            localStorage.setItem('nexus_user', JSON.stringify(userData));
            return { success: true, role: 'client' };
        } else if (email === 'trabajador@vixo.com' && password === 'trabajador') {
            const userData = { email, role: 'worker', name: 'Juan Pérez' };
            setUser(userData);
            localStorage.setItem('nexus_user', JSON.stringify(userData));
            return { success: true, role: 'worker' };
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
