import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Portfolio = () => {
    const { content } = useContent();
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('all');

    const projects = content.portfolio || [];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="page-wrapper">
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}>
                    <h1 style={styles.heroTitle}>Portafolio de Proyectos</h1>
                    <p style={styles.heroSubtitle}>Trabajos realizados que transforman espacios</p>
                </div>
            </section>

            {/* Filter Section */}
            <section style={styles.filterSection}>
                <div style={styles.container}>
                    <div style={styles.filterButtons}>
                        <button
                            onClick={() => setFilter('all')}
                            style={filter === 'all' ? styles.filterButtonActive : styles.filterButton}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFilter('civil')}
                            style={filter === 'civil' ? styles.filterButtonActive : styles.filterButton}
                        >
                            Obra Civil
                        </button>
                        <button
                            onClick={() => setFilter('eléctrica')}
                            style={filter === 'eléctrica' ? styles.filterButtonActive : styles.filterButton}
                        >
                            Eléctrica
                        </button>
                        <button
                            onClick={() => setFilter('industrial')}
                            style={filter === 'industrial' ? styles.filterButtonActive : styles.filterButton}
                        >
                            Industrial
                        </button>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section style={styles.projectsSection}>
                <div style={styles.container}>
                    {filteredProjects.length === 0 ? (
                        <div style={styles.emptyState}>
                            <i className="fa-solid fa-folder-open" style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No hay proyectos en esta categoría aún</p>
                        </div>
                    ) : (
                        <div style={styles.projectsGrid}>
                            {filteredProjects.map(project => (
                                <div
                                    key={project.id}
                                    style={styles.projectCard}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div style={styles.projectImageContainer}>
                                        {project.beforeImage && project.afterImage ? (
                                            <div style={styles.beforeAfter}>
                                                <div style={styles.beforeImageWrapper}>
                                                    <img src={project.beforeImage} alt="Antes" style={styles.projectImage} />
                                                    <span style={styles.badge}>ANTES</span>
                                                </div>
                                                <div style={styles.afterImageWrapper}>
                                                    <img src={project.afterImage} alt="Después" style={styles.projectImage} />
                                                    <span style={{ ...styles.badge, backgroundColor: '#16a34a' }}>DESPUÉS</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <img src={project.image} alt={project.title} style={styles.projectImage} />
                                        )}
                                    </div>
                                    <div style={styles.projectContent}>
                                        <span style={styles.projectCategory}>{project.category}</span>
                                        <h3 style={styles.projectTitle}>{project.title}</h3>
                                        <p style={styles.projectDescription}>{project.description}</p>
                                        <div style={styles.projectMeta}>
                                            <span><i className="fa-solid fa-calendar"></i> {project.date}</span>
                                            <span><i className="fa-solid fa-map-marker-alt"></i> {project.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal for Project Details */}
            {selectedProject && (
                <div style={styles.modal} onClick={() => setSelectedProject(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button style={styles.closeButton} onClick={() => setSelectedProject(null)}>
                            <i className="fa-solid fa-times"></i>
                        </button>
                        <h2 style={styles.modalTitle}>{selectedProject.title}</h2>
                        {selectedProject.beforeImage && selectedProject.afterImage && (
                            <div style={styles.modalImages}>
                                <div>
                                    <img src={selectedProject.beforeImage} alt="Antes" style={styles.modalImage} />
                                    <p style={styles.imageLabel}>Antes</p>
                                </div>
                                <div>
                                    <img src={selectedProject.afterImage} alt="Después" style={styles.modalImage} />
                                    <p style={styles.imageLabel}>Después</p>
                                </div>
                            </div>
                        )}
                        <div style={styles.modalBody}>
                            <p>{selectedProject.fullDescription || selectedProject.description}</p>
                            <div style={styles.modalMeta}>
                                <p><strong>Categoría:</strong> {selectedProject.category}</p>
                                <p><strong>Ubicación:</strong> {selectedProject.location}</p>
                                <p><strong>Fecha:</strong> {selectedProject.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

const styles = {
    hero: {
        position: 'relative',
        minHeight: '50vh',
        background: 'linear-gradient(rgba(10,25,47,0.85), rgba(10,25,47,0.85)), url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200")',
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
    filterSection: {
        padding: '2rem 0',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0'
    },
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 5vw, 2rem)'
    },
    filterButtons: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    filterButton: {
        padding: '10px 24px',
        border: '2px solid #e2e8f0',
        backgroundColor: 'white',
        color: '#64748b',
        borderRadius: '50px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s'
    },
    filterButtonActive: {
        padding: '10px 24px',
        border: '2px solid #ff4d00',
        backgroundColor: '#ff4d00',
        color: 'white',
        borderRadius: '50px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    projectsSection: {
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        backgroundColor: '#f8fafc'
    },
    projectsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
        gap: 'clamp(2rem, 4vw, 3rem)'
    },
    projectCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s'
    },
    projectImageContainer: {
        position: 'relative',
        height: '280px',
        overflow: 'hidden',
        backgroundColor: '#e2e8f0'
    },
    beforeAfter: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100%'
    },
    beforeImageWrapper: {
        position: 'relative',
        overflow: 'hidden'
    },
    afterImageWrapper: {
        position: 'relative',
        overflow: 'hidden'
    },
    projectImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s'
    },
    badge: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: '#ff4d00',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: '700'
    },
    projectContent: {
        padding: 'clamp(1.5rem, 3vw, 2rem)'
    },
    projectCategory: {
        fontSize: '0.8rem',
        color: '#ff4d00',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    projectTitle: {
        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
        fontFamily: 'Oswald, sans-serif',
        color: '#0a192f',
        margin: '0.5rem 0',
        lineHeight: '1.3'
    },
    projectDescription: {
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        color: '#64748b',
        marginBottom: '1rem',
        lineHeight: '1.6'
    },
    projectMeta: {
        display: 'flex',
        gap: '1rem',
        fontSize: '0.85rem',
        color: '#94a3b8',
        flexWrap: 'wrap'
    },
    emptyState: {
        textAlign: 'center',
        padding: '4rem 2rem'
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1rem'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: 'clamp(2rem, 4vw, 3rem)'
    },
    closeButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#64748b',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.3s'
    },
    modalTitle: {
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontFamily: 'Oswald, sans-serif',
        color: '#0a192f',
        marginBottom: '1.5rem'
    },
    modalImages: {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
        gap: '1rem',
        marginBottom: '2rem'
    },
    modalImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px'
    },
    imageLabel: {
        textAlign: 'center',
        marginTop: '0.5rem',
        fontWeight: '600',
        color: '#64748b'
    },
    modalBody: {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.8'
    },
    modalMeta: {
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    }
};

export default Portfolio;
