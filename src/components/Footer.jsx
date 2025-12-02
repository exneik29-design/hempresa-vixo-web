import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../config/company';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.grid}>
                    {/* Company Info */}
                    <div style={styles.column}>
                        <div style={styles.brandSection}>
                            <div style={styles.logo}>
                                <span style={styles.logoText}>D</span>
                            </div>
                            <span style={styles.companyName}>{COMPANY_INFO.name}</span>
                        </div>
                        <p style={styles.description}>
                            Empresa integral de construcción e ingeniería eléctrica. Especialistas en obras industriales, comerciales y residenciales con más de 15 años de experiencia.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div style={styles.column}>
                        <h4 style={styles.heading}>Enlaces Rápidos</h4>
                        <ul style={styles.linkList}>
                            <li><Link to="/" style={styles.link}>Inicio</Link></li>
                            <li><Link to="/servicios" style={styles.link}>Servicios</Link></li>
                            <li><Link to="/portafolio" style={styles.link}>Proyectos</Link></li>
                            <li><Link to="/empleo" style={styles.link}>Carreras</Link></li>
                            <li><Link to="/contacto" style={styles.link}>Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div style={styles.column}>
                        <h4 style={styles.heading}>Servicios</h4>
                        <ul style={styles.linkList}>
                            <li><Link to="/servicios" style={styles.link}>Construcción Civil</Link></li>
                            <li><Link to="/servicios" style={styles.link}>Ingeniería Eléctrica</Link></li>
                            <li><Link to="/servicios" style={styles.link}>Gerencia de Proyectos</Link></li>
                            <li><Link to="/servicios" style={styles.link}>Instalaciones Industriales</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div style={styles.column}>
                        <h4 style={styles.heading}>Contacto</h4>
                        <ul style={styles.contactList}>
                            <li style={styles.contactItem}>
                                <i className="fa-solid fa-map-marker-alt" style={styles.contactIcon}></i>
                                <span>{COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}</span>
                            </li>
                            <li style={styles.contactItem}>
                                <i className="fa-solid fa-phone" style={styles.contactIcon}></i>
                                <span>{COMPANY_INFO.phones.main}</span>
                            </li>
                            <li style={styles.contactItem}>
                                <i className="fa-solid fa-envelope" style={styles.contactIcon}></i>
                                <a href={`mailto:${COMPANY_INFO.emails.general}`} style={styles.link}>
                                    {COMPANY_INFO.emails.general}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={styles.bottom}>
                    <p style={styles.copyright}>
                        © {new Date().getFullYear()} {COMPANY_INFO.legalName}. Todos los derechos reservados.
                    </p>
                    <div style={styles.legalLinks}>
                        <Link to="/privacy" style={styles.legalLink}>Privacidad</Link>
                        <Link to="/terms" style={styles.legalLink}>Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: '#0a192f',
        color: '#8892b0',
        padding: '4rem 5%',
        fontSize: '0.9rem'
    },
    container: {
        maxWidth: 'var(--max-width)',
        margin: '0 auto'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    brandSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '1rem'
    },
    logo: {
        width: '40px',
        height: '40px',
        background: '#2563eb',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    companyName: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Oswald, sans-serif'
    },
    description: {
        color: '#8892b0',
        lineHeight: '1.6',
        marginBottom: '1rem'
    },
    socialLinks: {
        display: 'flex',
        gap: '1rem'
    },
    socialIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8892b0',
        transition: 'all 0.3s',
        textDecoration: 'none',
        fontSize: '1.2rem'
    },
    heading: {
        color: 'white',
        marginBottom: '1.5rem',
        fontSize: '1.1rem',
        fontFamily: 'Oswald, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    linkList: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: 0,
        margin: 0
    },
    link: {
        color: '#8892b0',
        textDecoration: 'none',
        transition: 'color 0.3s'
    },
    contactList: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: 0,
        margin: 0
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        color: '#8892b0'
    },
    contactIcon: {
        color: '#2563eb',
        fontSize: '1.1rem',
        marginTop: '2px'
    },
    bottom: {
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '2rem',
        display: 'flex',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
    },
    copyright: {
        fontSize: '0.85rem',
        color: '#64748b',
        margin: 0
    },
    legalLinks: {
        display: 'flex',
        gap: '2rem'
    },
    legalLink: {
        fontSize: '0.85rem',
        color: '#64748b',
        textDecoration: 'none',
        transition: 'color 0.3s'
    }
};

export default Footer;
