import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Careers = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        especialidad: '',
        experiencia: '',
        presentacion: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Gracias por postular. Tus datos han sido guardados en nuestra base de talento.');
        // Aquí conectaremos con el Backend más adelante
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <div style={styles.header}>
                <div className="container">
                    <h1 style={styles.title}>Únete al Equipo Nexus</h1>
                    <p style={styles.subtitle}>Buscamos profesionales comprometidos con la excelencia técnica y la seguridad.</p>
                </div>
            </div>

            <div className="container" style={styles.content}>
                <div style={styles.grid}>
                    {/* Información */}
                    <div style={styles.infoCol}>
                        <h3 style={styles.sectionTitle}>¿Por qué trabajar con nosotros?</h3>
                        <ul style={styles.benefitList}>
                            <li style={styles.benefitItem}>
                                <i className="fa-solid fa-helmet-safety" style={styles.icon}></i>
                                <div>
                                    <strong>Seguridad Primero</strong>
                                    <p>Estándares ISO y EPP de alta calidad garantizados.</p>
                                </div>
                            </li>
                            <li style={styles.benefitItem}>
                                <i className="fa-solid fa-money-bill-trend-up" style={styles.icon}></i>
                                <div>
                                    <strong>Estabilidad y Crecimiento</strong>
                                    <p>Proyectos de larga duración y plan de carrera.</p>
                                </div>
                            </li>
                            <li style={styles.benefitItem}>
                                <i className="fa-solid fa-users-gear" style={styles.icon}></i>
                                <div>
                                    <strong>Equipo Multidisciplinario</strong>
                                    <p>Aprende trabajando junto a ingenieros civiles y eléctricos.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Formulario */}
                    <div style={styles.formCol}>
                        <div style={styles.card}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Ficha de Postulación</h3>
                            <form onSubmit={handleSubmit} style={styles.form}>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        style={styles.input}
                                        placeholder="Ej: Juan Pérez"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Teléfono de Contacto</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        style={styles.input}
                                        placeholder="+56 9 1234 5678"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div style={styles.row}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Especialidad</label>
                                        <select name="especialidad" style={styles.select} required onChange={handleChange}>
                                            <option value="">Seleccionar...</option>
                                            <option value="electricista_sec">Electricista Certificado SEC</option>
                                            <option value="ayudante_electrico">Ayudante Eléctrico</option>
                                            <option value="maestro_mayor">Maestro Mayor (Civil)</option>
                                            <option value="albanil">Albañil / Obras Civiles</option>
                                            <option value="jefe_obra">Jefe de Obra</option>
                                            <option value="prevencionista">Prevencionista de Riesgos</option>
                                        </select>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Años de Experiencia</label>
                                        <input
                                            type="number"
                                            name="experiencia"
                                            style={styles.input}
                                            placeholder="Ej: 5"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Breve Presentación / Habilidades</label>
                                    <textarea
                                        name="presentacion"
                                        style={styles.textarea}
                                        rows="3"
                                        placeholder="Cuéntanos brevemente sobre tus últimos trabajos..."
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Adjuntar CV (PDF/Word)</label>
                                    <input type="file" style={styles.fileInput} />
                                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>Máximo 5MB.</p>
                                </div>

                                <button type="submit" className="btn-cta" style={{ width: '100%', marginTop: '1rem' }}>
                                    Enviar Postulación
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    header: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
    },
    title: {
        fontSize: '3rem',
        marginBottom: '1rem'
    },
    subtitle: {
        fontSize: '1.2rem',
        opacity: 0.9,
        maxWidth: '600px',
        margin: '0 auto'
    },
    content: {
        padding: '4rem 5%'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem'
    },
    sectionTitle: {
        color: 'var(--primary)',
        fontSize: '1.8rem',
        marginBottom: '2rem',
        borderLeft: '4px solid var(--accent-1)',
        paddingLeft: '15px'
    },
    benefitList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    benefitItem: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start'
    },
    icon: {
        fontSize: '2rem',
        color: 'var(--accent-2)',
        backgroundColor: 'var(--primary)',
        padding: '15px',
        borderRadius: '8px',
        minWidth: '60px',
        textAlign: 'center'
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #eee'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
    },
    label: {
        fontWeight: '600',
        fontSize: '0.9rem',
        color: 'var(--steel)'
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        fontFamily: 'inherit'
    },
    select: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        fontFamily: 'inherit',
        backgroundColor: 'white'
    },
    textarea: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        fontFamily: 'inherit',
        resize: 'vertical'
    },
    fileInput: {
        fontSize: '0.9rem'
    }
};

export default Careers;
