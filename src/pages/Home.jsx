import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContent } from '../context/ContentContext';

const Home = () => {
    const { content } = useContent();

    return (
        <div className="page-wrapper">
            <Navbar />

            {/* HERO SECTION */}
            <section style={{ ...styles.hero, backgroundImage: `linear-gradient(rgba(10,25,47,0.7), rgba(10,25,47,0.6)), url('${content.hero.backgroundImage}')` }} id="nosotros">
                <div style={styles.heroContent}>
                    <span style={styles.fusionBadge}>{content.hero.subtitle}</span>
                    <h1 style={styles.heroTitle}>{content.hero.title}</h1>
                    <p style={styles.heroText}>{content.hero.description}</p>
                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/contacto" className="btn-cta" style={{ padding: '15px 30px', fontSize: '1rem', textDecoration: 'none' }}>{content.hero.ctaText}</Link>
                    </div>
                </div>
            </section>

            <div style={styles.statsBar}>
                {content.values.map(value => (
                    <div key={value.id} style={styles.statItem}>
                        <span style={styles.statNumber}><i className={`fa-solid ${value.icon}`}></i></span>
                        <span style={styles.statLabel}>{value.description}</span>
                    </div>
                ))}
            </div>

            {/* SECCIÓN NOSOTROS / HISTORIA */}
            <section style={styles.aboutSection} id="nosotros-detalle">
                <div style={styles.aboutContainer}>
                    <div style={styles.aboutImageCol}>
                        <img
                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Fusión Construcción y Electricidad"
                            style={styles.aboutImage}
                        />
                        <div style={styles.experienceBadge}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'block' }}>+15</span>
                            <span>Años de<br />Experiencia</span>
                        </div>
                    </div>
                    <div style={styles.aboutTextCol}>
                        <h4 style={{ color: 'var(--accent-1)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Nuestra Historia</h4>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            La Unión de Dos Potencias
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                            <strong>DACARO</strong> no es una empresa constructora más. Somos el resultado de la fusión estratégica entre una firma líder en <strong>Ingeniería Eléctrica</strong> de alta complejidad y una especialista en <strong>Construcción Civil</strong>.
                        </p>
                        <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
                            Entendimos que nuestros clientes perdían tiempo y dinero coordinando múltiples proveedores. Por eso, unimos fuerzas para ofrecer una <strong>logística impecable</strong>: desde los cimientos hasta el último cableado, todo bajo un mismo estándar de excelencia y responsabilidad.
                        </p>

                        <div style={styles.featuresList}>
                            <div style={styles.featureItem}>
                                <i className="fa-solid fa-check-circle" style={{ color: 'var(--accent-2)', fontSize: '1.2rem' }}></i>
                                <span>Coordinación técnica unificada</span>
                            </div>
                            <div style={styles.featureItem}>
                                <i className="fa-solid fa-check-circle" style={{ color: 'var(--accent-2)', fontSize: '1.2rem' }}></i>
                                <span>Menores tiempos de ejecución</span>
                            </div>
                            <div style={styles.featureItem}>
                                <i className="fa-solid fa-check-circle" style={{ color: 'var(--accent-2)', fontSize: '1.2rem' }}></i>
                                <span>Responsabilidad centralizada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICIOS DESTACADOS */}
            <section style={styles.servicesSection} id="servicios">
                <div style={styles.sectionHeader}>
                    <h4 style={{ color: 'var(--steel)', opacity: 0.8 }}>Nuestras Especialidades</h4>
                    <h2 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '10px' }}>Soluciones Integrales <br />B2B</h2>
                    <p style={{ maxWidth: '600px' }}>Eliminamos la fricción entre contratistas. Un solo proveedor para obra gris y sistemas críticos.</p>
                </div>

                <div style={styles.servicesGrid}>
                    {/* Servicio Civil */}
                    <div style={{ ...styles.serviceCard, backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
                        <div className="service-overlay" style={styles.serviceOverlay}>
                            <div style={styles.serviceIcon}><i className="fa-solid fa-city"></i></div>
                            <h3 style={{ color: 'white' }}>Infraestructura Civil</h3>
                            <p style={{ color: 'white', opacity: 0.9 }}>Naves industriales, edificios corporativos y reforzamiento estructural.</p>
                            <a href="#" style={{ color: 'var(--accent-1)', fontWeight: 'bold', marginTop: '10px', display: 'block' }}>Explorar División Civil →</a>
                        </div>
                    </div>

                    {/* Servicio Eléctrico */}
                    <div id="electrica" style={{ ...styles.serviceCard, backgroundImage: "url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
                        <div className="service-overlay" style={styles.serviceOverlay}>
                            <div style={{ ...styles.serviceIcon, color: 'var(--accent-2)' }}><i className="fa-solid fa-bolt"></i></div>
                            <h3 style={{ color: 'white' }}>Ingeniería Eléctrica</h3>
                            <p style={{ color: 'white', opacity: 0.9 }}>Tableros de control, subestaciones, iluminación industrial y certificación.</p>
                            <a href="#" style={{ color: 'var(--accent-2)', fontWeight: 'bold', marginTop: '10px', display: 'block' }}>Explorar División Energía →</a>
                        </div>
                    </div>

                    {/* Gerencia Proyectos */}
                    <div style={{ ...styles.serviceCard, backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
                        <div className="service-overlay" style={styles.serviceOverlay}>
                            <div style={{ ...styles.serviceIcon, color: 'white' }}><i className="fa-solid fa-clipboard-check"></i></div>
                            <h3 style={{ color: 'white' }}>Gerencia de Proyectos</h3>
                            <p style={{ color: 'white', opacity: 0.9 }}>Planificación, control de costes y gestión llave en mano.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PORTAL CLIENTE (Tech Showcase) */}
            <section style={styles.portalPreview} id="proyectos">
                <div style={styles.textCol}>
                    <h4 style={{ color: 'var(--accent-2)' }}>INNOVACIÓN EN GESTIÓN</h4>
                    <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Transparencia Total en Su Obra</h2>
                    <p style={{ color: '#a8b2d1', marginBottom: '2rem' }}>
                        Olvídese de los correos perdidos. Nuestros clientes corporativos acceden a un <strong>Dashboard Privado</strong> para monitorear avances, aprobar presupuestos y descargar planos actualizados en tiempo real.
                    </p>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', color: 'white' }}>
                        <li style={{ marginBottom: '10px' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-2)', marginRight: '10px' }}></i> Cronograma Gantt Interactivo</li>
                        <li style={{ marginBottom: '10px' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-2)', marginRight: '10px' }}></i> Reportes Fotográficos Diarios</li>
                        <li><i className="fa-solid fa-check" style={{ color: 'var(--accent-2)', marginRight: '10px' }}></i> Chat directo con Jefes de Obra</li>
                    </ul>
                </div>

                <div style={styles.imgCol}>
                    {/* Mockup del Sistema */}
                    <div style={styles.portalScreen}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>PROYECTO #4092 - PLANTA SUR</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-2)' }}>● EN VIVO</span>
                        </div>
                        <div style={styles.ganttMock}>
                            <div style={styles.ganttLine}>
                                <div style={{ ...styles.ganttProgress, width: '100%', background: 'var(--accent-1)' }}></div>
                                <span style={{ position: 'relative', zIndex: 2, marginLeft: '10px', color: 'white' }}>Fase 1: Obra Gruesa (Completado)</span>
                            </div>
                            <div style={styles.ganttLine}>
                                <div style={{ ...styles.ganttProgress, width: '65%', background: 'var(--accent-2)', boxShadow: '0 0 15px rgba(0,240,255,0.3)' }}></div>
                                <span style={{ position: 'relative', zIndex: 2, marginLeft: '10px', color: 'white' }}>Fase 2: Cableado Industrial (65%)</span>
                            </div>
                            <div style={styles.ganttLine}>
                                <span style={{ marginLeft: '10px' }}>Fase 3: Terminaciones</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN RRHH */}
            <section style={styles.ctaBanner}>
                <h3 style={{ color: 'var(--primary)' }}>Buscamos Talento Técnico</h3>
                <p style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>¿Eres electricista certificado o especialista en construcción? Sube tu CV a nuestra base de datos prioritaria.</p>
                <a href="/empleo" style={{ borderBottom: '2px solid var(--primary)', fontWeight: '700', color: 'var(--primary)' }}>POSTULAR AQUÍ</a>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

const styles = {
    hero: {
        position: 'relative',
        minHeight: '80vh',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'var(--white)',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem 1rem'
    },
    heroContent: {
        zIndex: 1,
        padding: '0 1rem',
        maxWidth: '900px',
        margin: '0 auto'
    },
    heroTitle: {
        fontSize: 'clamp(2rem, 8vw, 5rem)',
        marginBottom: '1rem',
        textShadow: '0 4px 10px rgba(0,0,0,0.5)',
        lineHeight: 1.1
    },
    heroText: {
        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
        fontWeight: 300,
        maxWidth: '700px',
        margin: '0 auto 2rem',
        opacity: 0.9
    },
    fusionBadge: {
        display: 'inline-block',
        border: '1px solid rgba(255,255,255,0.3)',
        background: 'rgba(0,0,0,0.3)',
        padding: 'clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px)',
        borderRadius: '50px',
        marginBottom: '20px',
        fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
        textTransform: 'uppercase',
        letterSpacing: '2px'
    },
    statsBar: {
        background: 'var(--accent-1)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        justifyContent: 'space-around',
        padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 5vw, 10%)',
        marginTop: window.innerWidth <= 768 ? '0' : '-50px',
        position: 'relative',
        zIndex: 10,
        fontFamily: 'Oswald',
        display: 'block',
        marginBottom: '0.5rem'
    },
    statLabel: {
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
        opacity: 0.9,
        textTransform: 'uppercase'
    },

    // Nuevos estilos para sección Nosotros
    aboutSection: {
        padding: '5rem 5%',
        background: '#fff'
    },
    aboutContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
    },
    aboutImageCol: {
        position: 'relative'
    },
    aboutImage: {
        width: '100%',
        borderRadius: '12px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    },
    experienceBadge: {
        position: 'absolute',
        bottom: '-20px',
        right: '-20px',
        background: 'var(--primary)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        textAlign: 'center',
        lineHeight: '1.2'
    },
    aboutTextCol: {
        paddingRight: '2rem'
    },
    featuresList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '1rem',
        color: '#334155',
        fontWeight: '500'
    },

    servicesSection: {
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 5vw, 10%)',
        background: 'var(--white)'
    },
    sectionHeader: {
        marginBottom: 'clamp(2rem, 4vw, 4rem)',
        borderLeft: '5px solid var(--accent-1)',
        paddingLeft: '20px'
    },
    servicesGrid: {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2rem)'
    },
    serviceCard: {
        position: 'relative',
        height: window.innerWidth <= 768 ? '300px' : '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        transition: '0.4s',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    serviceOverlay: {
        background: 'linear-gradient(to top, #000, transparent)',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        color: 'white',
        transition: '0.4s'
    },
    serviceIcon: {
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        marginBottom: '1rem',
        color: 'var(--accent-1)'
    },

    portalPreview: {
        background: 'var(--primary)',
        color: 'white',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 5vw, 10%)',
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(2rem, 4vw, 4rem)',
        alignItems: 'center'
    },
    textCol: {
        order: window.innerWidth <= 768 ? 2 : 1
    },
    imgCol: {
        order: window.innerWidth <= 768 ? 1 : 2
    },
    portalScreen: {
        background: '#1b2a41',
        borderRadius: '10px',
        padding: 'clamp(15px, 3vw, 20px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        border: '1px solid #334155'
    },
    ganttMock: {
        marginTop: '1rem'
    },
    ganttLine: {
        height: window.innerWidth <= 768 ? '35px' : '40px',
        background: '#2d3b55',
        marginBottom: '10px',
        borderRadius: '4px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '15px',
        fontSize: window.innerWidth <= 768 ? '0.7rem' : '0.8rem',
        color: '#aaa'
    },
    ganttProgress: {
        position: 'absolute',
        height: '100%',
        left: 0,
        top: 0,
        opacity: 0.7,
        borderRadius: '4px'
    },

    ctaBanner: {
        background: 'var(--concrete)',
        padding: 'clamp(3rem, 5vw, 5rem) clamp(1rem, 5vw, 10%)',
        textAlign: 'center'
    }
};

export default Home;
