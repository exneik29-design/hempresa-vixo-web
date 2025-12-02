import React from 'react';
import { useContent } from '../context/ContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
    const { content } = useContent();

    return (
        <div className="page-wrapper">
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}>
                    <h1 style={styles.heroTitle}>Nuestros Servicios</h1>
                    <p style={styles.heroSubtitle}>Soluciones integrales en ingeniería civil y eléctrica</p>
                </div>
            </section>

            {/* Services Grid */}
            <section style={styles.servicesSection}>
                <div style={styles.container}>
                    <div style={styles.servicesGrid}>
                        {content.services.map(service => (
                            <div key={service.id} style={styles.serviceCard}>
                                <div style={styles.serviceImage}>
                                    <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={styles.serviceIcon}>
                                        <i className={`fa-solid ${service.icon}`}></i>
                                    </div>
                                </div>
                                <div style={styles.serviceContent}>
                                    <h3 style={styles.serviceTitle}>{service.title}</h3>
                                    <p style={styles.serviceDescription}>{service.description}</p>
                                    <ul style={styles.featuresList}>
                                        {service.features && service.features.map((feature, idx) => (
                                            <li key={idx} style={styles.featureItem}>
                                                <i className="fa-solid fa-check" style={{ color: '#ff4d00', marginRight: '10px' }}></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button style={styles.ctaButton}>
                                        Solicitar Cotización <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section style={styles.ctaBanner}>
                <h2 style={styles.ctaTitle}>¿Listo para iniciar tu proyecto?</h2>
                <p style={styles.ctaText}>Contacta con nuestro equipo y recibe una cotización personalizada</p>
                <a href="/contacto" style={styles.ctaButtonLarge}>
                    Contactar Ahora
                </a>
            </section>

            <Footer />
        </div>
    );
};

const styles = {
    hero: {
        position: 'relative',
        minHeight: '50vh',
        background: 'linear-gradient(rgba(10,25,47,0.85), rgba(10,25,47,0.85)), url("https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
    },
    heroOverlay: {
        textAlign: 'center',
        color: 'white',
        maxWidth: '800px'
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontFamily: 'Oswald, sans-serif',
        marginBottom: '1rem',
        color: 'white'
    },
    heroSubtitle: {
        fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
        opacity: 0.9
    },
    servicesSection: {
        padding: 'clamp(4rem, 8vw, 8rem) 0',
        backgroundColor: '#f3f4f6'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 5vw, 2rem)'
    },
    servicesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
        gap: 'clamp(2rem, 4vw, 3rem)'
    },
    serviceCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s'
    },
    serviceImage: {
        position: 'relative',
        height: '250px',
        overflow: 'hidden',
        backgroundColor: '#0a192f'
    },
    serviceIcon: {
        position: 'absolute',
        bottom: '-30px',
        left: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#ff4d00',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: 'white',
        boxShadow: '0 5px 15px rgba(255,77,0,0.3)'
    },
    serviceContent: {
        padding: 'clamp(2rem, 4vw, 2.5rem)',
        paddingTop: '3rem'
    },
    serviceTitle: {
        fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
        fontFamily: 'Oswald, sans-serif',
        color: '#0a192f',
        marginBottom: '1rem'
    },
    serviceDescription: {
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        color: '#64748b',
        marginBottom: '1.5rem',
        lineHeight: '1.6'
    },
    featuresList: {
        listStyle: 'none',
        marginBottom: '2rem'
    },
    featureItem: {
        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
        color: '#475569',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center'
    },
    ctaButton: {
        backgroundColor: '#0a192f',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s'
    },
    ctaBanner: {
        backgroundColor: '#0a192f',
        color: 'white',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        textAlign: 'center'
    },
    ctaTitle: {
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontFamily: 'Oswald, sans-serif',
        marginBottom: '1rem'
    },
    ctaText: {
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
        marginBottom: '2rem',
        opacity: 0.9
    },
    ctaButtonLarge: {
        display: 'inline-block',
        backgroundColor: '#ff4d00',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '6px',
        fontSize: '1.1rem',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.3s'
    }
};

export default Services;
