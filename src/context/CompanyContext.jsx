import React, { createContext, useContext, useState, useEffect } from 'react';

const CompanyContext = createContext();

export const useCompany = () => {
    return useContext(CompanyContext);
};

export const CompanyProvider = ({ children }) => {
    const [companyData, setCompanyData] = useState(() => {
        const saved = localStorage.getItem('nexus_company_data');
        return saved ? JSON.parse(saved) : {
            nombre: 'DACARO SpA',
            representanteLegal: 'DAVID SALOMÓN CABRERA ROCCO',
            rut: '78.160.531-K',
            domicilio: 'Parcela 51 lote 36 el convento Santo Domingo, VALPARAISO, Chile',
            telefono: '+56 9 1234 5678',
            email: 'contacto@dacaro.cl',
            logo: null // URL o base64 del logo
        };
    });

    useEffect(() => {
        localStorage.setItem('nexus_company_data', JSON.stringify(companyData));
    }, [companyData]);

    const updateCompanyData = (newData) => {
        setCompanyData({ ...companyData, ...newData });
    };

    return (
        <CompanyContext.Provider value={{ companyData, updateCompanyData }}>
            {children}
        </CompanyContext.Provider>
    );
};
