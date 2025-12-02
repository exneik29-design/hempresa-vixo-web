import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Lock, Phone, Building2, Briefcase, Image, Users } from 'lucide-react';
import { COMPANY_INFO } from '../config/company';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleNavClick = (path, isScroll = false) => {
        closeMobileMenu();

        if (isScroll) {
            // Si es un enlace de scroll (como #about)
            if (location.pathname !== '/') {
                // Si no estamos en home, ir a home primero
                navigate('/');
                // Esperar un poco a que cargue home y luego scrollear
                setTimeout(() => {
                    const element = document.getElementById(path.replace('#', ''));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                // Si ya estamos en home, solo scrollear
                const element = document.getElementById(path.replace('#', ''));
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navegación normal
            navigate(path);
        }
    };

    return (
        <header className="fixed w-full top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <span className="text-white font-bold text-xl">V</span>
                        </div>
                        <span className="text-2xl font-bold text-white font-display tracking-tight">
                            {COMPANY_INFO.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <button onClick={() => handleNavClick('/')} className={`${isActive('/')} transition-colors text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer`}>
                            Inicio
                        </button>
                        <button onClick={() => handleNavClick('#about', true)} className="text-slate-300 hover:text-white transition-colors text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer">
                            Nosotros
                        </button>
                        <button onClick={() => handleNavClick('/servicios')} className={`${isActive('/servicios')} transition-colors text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer`}>
                            Servicios
                        </button>
                        <button onClick={() => handleNavClick('/portafolio')} className={`${isActive('/portafolio')} transition-colors text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer`}>
                            Portafolio
                        </button>
                        <button onClick={() => handleNavClick('/empleo')} className={`${isActive('/empleo')} transition-colors text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer`}>
                            Empleo
                        </button>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800"
                        >
                            <Lock size={18} />
                            <span>Portal</span>
                        </button>
                        <Link
                            to="/contacto"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20 flex items-center space-x-2"
                        >
                            <Phone size={18} />
                            <span>Cotizar</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-slate-300 hover:text-white p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl animate-in slide-in-from-top-5">
                    <div className="px-4 py-6 space-y-4">
                        <button onClick={() => handleNavClick('/')} className="w-full flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors text-left">
                            <Building2 size={20} />
                            <span>Inicio</span>
                        </button>
                        <button onClick={() => handleNavClick('#about', true)} className="w-full flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors text-left">
                            <Users size={20} />
                            <span>Nosotros</span>
                        </button>
                        <button onClick={() => handleNavClick('/servicios')} className="w-full flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors text-left">
                            <Briefcase size={20} />
                            <span>Servicios</span>
                        </button>
                        <button onClick={() => handleNavClick('/portafolio')} className="w-full flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors text-left">
                            <Image size={20} />
                            <span>Portafolio</span>
                        </button>
                        <button onClick={() => handleNavClick('/empleo')} className="w-full flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors text-left">
                            <Users size={20} />
                            <span>Empleo</span>
                        </button>

                        <div className="h-px bg-slate-800 my-4"></div>

                        <button
                            onClick={() => { navigate('/login'); closeMobileMenu(); }}
                            className="w-full flex items-center justify-center space-x-2 text-slate-300 border border-slate-700 p-3 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <Lock size={18} />
                            <span>Portal Clientes</span>
                        </button>

                        <Link
                            to="/contacto"
                            onClick={closeMobileMenu}
                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                        >
                            <Phone size={18} />
                            <span>Cotizar Obra</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
