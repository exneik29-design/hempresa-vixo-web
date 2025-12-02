import React, { createContext, useState, useContext, useEffect } from 'react';

const ContentContext = createContext(null);

const defaultContent = {
    config: {
        siteName: 'DACARO',
        logoUrl: '', // Si está vacío usa el icono por defecto
        primaryColor: '#0a192f',
        accentColor: '#ff4d00',
        menuItems: [
            { id: 1, label: 'Nosotros', path: '/#nosotros', type: 'anchor' },
            { id: 2, label: 'Servicios', path: '/servicios', type: 'link' },
            { id: 3, label: 'Portafolio', path: '/portafolio', type: 'link' },
            { id: 4, label: 'Empleo', path: '/empleo', type: 'link' },
            { id: 5, label: 'Contacto', path: '/contacto', type: 'link' }
        ]
    },
    hero: {
        title: 'DACARO',
        subtitle: 'Potencia Eléctrica + Solidez Constructiva',
        description: 'Nacemos de la fusión de dos líderes en electricidad y construcción. Unimos décadas de experiencia para ofrecer soluciones integrales, optimizando la logística y haciendo la excelencia técnica más accesible para tu proyecto.',
        ctaText: 'Solicitar Cotización',
        backgroundImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    about: {
        title: 'Nuestra Historia',
        description: 'DACARO es el resultado de la fusión estratégica de dos empresas con larga trayectoria: una especialista en ingeniería eléctrica de alta complejidad y otra líder en construcción civil. Nos unimos con un propósito claro: eliminar las barreras entre especialidades, mejorar la logística de obra y ofrecer un servicio unificado que garantiza calidad y eficiencia desde los cimientos hasta la puesta en marcha.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600'
    },
    values: [
        {
            id: 1,
            icon: 'fa-certificate',
            title: 'Certificación SEC',
            description: 'Instaladores eléctricos autorizados con credenciales vigentes'
        },
        {
            id: 2,
            icon: 'fa-award',
            title: 'Excelencia',
            description: 'Estándares de calidad internacional en cada proyecto'
        },
        {
            id: 3,
            icon: 'fa-handshake',
            title: 'Confianza',
            description: 'Transparencia y compromiso con plazos y presupuestos'
        },
        {
            id: 4,
            icon: 'fa-lightbulb',
            title: 'Innovación',
            description: 'Tecnología de punta y soluciones a medida'
        }
    ],
    services: [
        {
            id: 1,
            icon: 'fa-bolt',
            title: 'Instalaciones Eléctricas Industriales',
            description: 'Proyectos de baja, media y alta tensión con certificación SEC para obras industriales y comerciales',
            image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400',
            features: [
                'Instalaciones industriales certificadas',
                'Tableros de control y automatización',
                'Subestaciones eléctricas',
                'Mantención preventiva y correctiva'
            ]
        },
        {
            id: 2,
            icon: 'fa-building',
            title: 'Construcción Civil e Industrial',
            description: 'Construcción de obras industriales, comerciales y residenciales desde los cimientos',
            image: 'https://images.unsplash.com/photo-1541976590-713941681591?w=400',
            features: [
                'Construcción de naves industriales',
                'Edificios comerciales y galpones',
                'Obras residenciales',
                'Reforzamiento estructural'
            ]
        },
        {
            id: 3,
            icon: 'fa-hammer',
            title: 'Remodelaciones y Ampliaciones',
            description: 'Renovación y ampliación de espacios industriales, comerciales y residenciales',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
            features: [
                'Remodelación de oficinas y locales',
                'Ampliación de plantas industriales',
                'Modernización de instalaciones eléctricas',
                'Adecuación y mejoras estructurales'
            ]
        }
    ],
    portfolio: [
        {
            id: 1,
            title: 'Planta Industrial Sur',
            description: 'Construcción completa de planta industrial de 5,000 m²',
            category: 'industrial',
            location: 'Santiago, Chile',
            date: '2024',
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600',
            beforeImage: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600',
            afterImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600',
            fullDescription: 'Proyecto integral que incluyó diseño, construcción de estructura, instalaciones eléctricas certificadas SEC y sistemas de automatización. Completado en 8 meses.'
        },
        {
            id: 2,
            title: 'Subestación Eléctrica 220kV',
            description: 'Instalación y certificación de subestación de alta tensión',
            category: 'eléctrica',
            location: 'Valparaíso, Chile',
            date: '2024',
            image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600',
            beforeImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600',
            afterImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600',
            fullDescription: 'Subestación eléctrica de 220kV con certificación SEC. Incluye tableros de control, sistemas de protección y puesta a tierra.'
        }
    ],
    contact: {
        email: 'contacto@nexusgroup.cl',
        phone: '+56 9 1234 5678',
        address: 'Av. Providencia 1234, Santiago, Chile'
    },
    posts: [
        {
            id: 1,
            title: 'Nuevo Proyecto: Ampliación Planta Industrial Sur',
            content: 'Iniciamos la construcción de una moderna planta industrial de 5,000 m² que incluirá instalaciones eléctricas de alta tensión...',
            category: 'Proyectos',
            date: '2024-10-15',
            status: 'Publicado',
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'
        },
        {
            id: 2,
            title: 'Certificación SEC Obtenida para Subestación',
            content: 'Completamos exitosamente la certificación SEC de nuestra nueva subestación eléctrica de 220kV...',
            category: 'Noticias',
            date: '2024-10-10',
            status: 'Publicado',
            image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400'
        }
    ]
};

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(() => {
        const saved = localStorage.getItem('nexus_content');
        // Merge con defaultContent para asegurar que existan nuevas propiedades como 'config'
        return saved ? { ...defaultContent, ...JSON.parse(saved), config: { ...defaultContent.config, ...(JSON.parse(saved).config || {}) } } : defaultContent;
    });

    const [quotations, setQuotations] = useState(() => {
        const saved = localStorage.getItem('nexus_quotations');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('nexus_content', JSON.stringify(content));
    }, [content]);

    useEffect(() => {
        localStorage.setItem('nexus_quotations', JSON.stringify(quotations));
    }, [quotations]);

    const updateConfig = (newConfig) => {
        setContent(prev => ({ ...prev, config: { ...prev.config, ...newConfig } }));
    };

    const updateHero = (heroData) => {
        setContent(prev => ({ ...prev, hero: { ...prev.hero, ...heroData } }));
    };

    const updateAbout = (aboutData) => {
        setContent(prev => ({ ...prev, about: { ...prev.about, ...aboutData } }));
    };

    const updateValues = (values) => {
        setContent(prev => ({ ...prev, values }));
    };

    const updateServices = (services) => {
        setContent(prev => ({ ...prev, services }));
    };

    const updateContact = (contactData) => {
        setContent(prev => ({ ...prev, contact: { ...prev.contact, ...contactData } }));
    };

    const addPost = (post) => {
        setContent(prev => ({
            ...prev,
            posts: [{ ...post, id: Date.now() }, ...prev.posts]
        }));
    };

    const updatePost = (id, updatedPost) => {
        setContent(prev => ({
            ...prev,
            posts: prev.posts.map(p => p.id === id ? { ...p, ...updatedPost } : p)
        }));
    };

    const deletePost = (id) => {
        setContent(prev => ({
            ...prev,
            posts: prev.posts.filter(p => p.id !== id)
        }));
    };

    // Portfolio management
    const addPortfolioProject = (project) => {
        setContent(prev => ({
            ...prev,
            portfolio: [{ ...project, id: Date.now() }, ...(prev.portfolio || [])]
        }));
    };

    const updatePortfolioProject = (id, updatedProject) => {
        setContent(prev => ({
            ...prev,
            portfolio: (prev.portfolio || []).map(p => p.id === id ? { ...p, ...updatedProject } : p)
        }));
    };

    const deletePortfolioProject = (id) => {
        setContent(prev => ({
            ...prev,
            portfolio: (prev.portfolio || []).filter(p => p.id !== id)
        }));
    };

    // Quotations management
    const addQuotation = (quotation) => {
        setQuotations(prev => [{ ...quotation, id: Date.now(), status: 'Pendiente', date: new Date().toISOString() }, ...prev]);
    };

    const updateQuotationStatus = (id, status) => {
        setQuotations(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    };

    const deleteQuotation = (id) => {
        setQuotations(prev => prev.filter(q => q.id !== id));
    };

    const resetContent = () => {
        setContent(defaultContent);
    };

    return (
        <ContentContext.Provider value={{
            content,
            quotations,
            updateConfig,
            updateHero,
            updateAbout,
            updateValues,
            updateServices,
            updateContact,
            addPost,
            updatePost,
            deletePost,
            addPortfolioProject,
            updatePortfolioProject,
            deletePortfolioProject,
            addQuotation,
            updateQuotationStatus,
            deleteQuotation,
            resetContent
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent debe usarse dentro de ContentProvider');
    }
    return context;
};
