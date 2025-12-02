import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header style={styles.header}>
            <Link to="/" style={styles.brand}>
                <i className="fa-solid fa-bolt" style={{ color: 'var(--accent-2)' }}></i>
                DACARO
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ ...styles.nav, display: window.innerWidth > 768 ? 'flex' : 'none' }}>
                <ul style={styles.ul}>
                    <li><a href="/#nosotros" style={styles.link}>Nosotros</a></li>
                    <li><Link to="/servicios" style={styles.link}>Servicios</Link></li>
                    <li><Link to="/portafolio" style={styles.link}>Portafolio</Link></li>
                    <li><Link to="/empleo" style={styles.link}>Empleo</Link></li>
                </ul>
            </nav>

            {/* Desktop Actions */}
            <div style={{ ...styles.actions, display: window.innerWidth > 768 ? 'flex' : 'none' }}>
                <button onClick={() => navigate('/login')} className="btn-login">
                    <i className="fa-solid fa-lock"></i> Portal Clientes
                </button>
                <Link to="/contacto" className="btn-cta" style={{ textDecoration: 'none' }}>Cotizar Obra</Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                onClick={toggleMobileMenu}
                style={{ ...styles.mobileMenuToggle, display: window.innerWidth <= 768 ? 'flex' : 'none' }}
                aria-label="Toggle menu"
            >
                <span style={mobileMenuOpen ? styles.hamburgerLineOpen1 : styles.hamburgerLine}></span>
                <span style={mobileMenuOpen ? styles.hamburgerLineOpen2 : styles.hamburgerLine}></span>
                <span style={mobileMenuOpen ? styles.hamburgerLineOpen3 : styles.hamburgerLine}></span>
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div style={styles.mobileMenu}>
                    <nav style={styles.mobileNav}>
                        <a href="/#nosotros" style={styles.mobileLink} onClick={closeMobileMenu}>
                            <i className="fa-solid fa-building"></i> Nosotros
                        </a>
                        <Link to="/servicios" style={styles.mobileLink} onClick={closeMobileMenu}>
                            <i className="fa-solid fa-briefcase"></i> Servicios
                        </Link>
                        <Link to="/portafolio" style={styles.mobileLink} onClick={closeMobileMenu}>
                            <i className="fa-solid fa-images"></i> Portafolio
                        </Link>
                        <Link to="/empleo" style={styles.mobileLink} onClick={closeMobileMenu}>
                            <i className="fa-solid fa-users"></i> Empleo
                        </Link>
                        <div style={styles.mobileDivider}></div>
                        <button onClick={() => { navigate('/login'); closeMobileMenu(); }} style={styles.mobileButton}>
                            <i className="fa-solid fa-lock"></i> Portal Clientes
                        </button>
                        <Link to="/contacto" onClick={closeMobileMenu} style={styles.mobileCTA}>
                            <i className="fa-solid fa-phone"></i> Cotizar Obra
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

const styles = {
    header: {
        background: 'rgba(10, 25, 47, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '0 5%',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    brand: {
        fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
        fontWeight: '700',
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'Oswald, sans-serif',
        zIndex: 1001
    },
    nav: {
        display: 'flex'
    },
    ul: {
        display: 'flex',
        gap: '2.5rem',
        listStyle: 'none'
    },
    link: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'color 0.3s',
        textDecoration: 'none'
    },
    actions: {
        display: 'flex',
        gap: '15px',
        alignItems: 'center'
    },
    mobileMenuToggle: {
        flexDirection: 'column',
        gap: '5px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        zIndex: 1001
    },
    hamburgerLine: {
        width: '25px',
        height: '3px',
        background: 'white',
        borderRadius: '2px',
        transition: 'all 0.3s'
    },
    hamburgerLineOpen1: {
        width: '25px',
        height: '3px',
        background: 'white',
        borderRadius: '2px',
        transform: 'rotate(45deg) translate(6px, 6px)',
        transition: 'all 0.3s'
    },
    hamburgerLineOpen2: {
        width: '25px',
        height: '3px',
        background: 'white',
        borderRadius: '2px',
        opacity: 0,
        transition: 'all 0.3s'
    },
    hamburgerLineOpen3: {
        width: '25px',
        height: '3px',
        background: 'white',
        borderRadius: '2px',
        transform: 'rotate(-45deg) translate(6px, -6px)',
        transition: 'all 0.3s'
    },
    mobileMenu: {
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        background: 'rgba(10, 25, 47, 0.98)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        animation: 'slideDown 0.3s ease',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto'
    },
    mobileNav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    mobileLink: {
        color: 'white',
        fontSize: '1.1rem',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderRadius: '8px',
        transition: 'all 0.3s',
        background: 'rgba(255,255,255,0.05)',
        textDecoration: 'none'
    },
    mobileDivider: {
        height: '1px',
        background: 'rgba(255,255,255,0.1)',
        margin: '1rem 0'
    },
    mobileButton: {
        background: 'transparent',
        color: 'var(--accent-2)',
        border: '2px solid var(--accent-2)',
        padding: '1rem',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'all 0.3s'
    },
    mobileCTA: {
        background: 'var(--accent-1)',
        color: 'white',
        padding: '1rem',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '8px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        textDecoration: 'none'
    }
};

export default Navbar;
