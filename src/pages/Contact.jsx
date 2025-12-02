import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const { addQuotation } = useContent();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        empresa: '',
        contacto: '',
        email: '',
        telefono: '',
        tipo_proyecto: '',
        presupuesto: '',
        fecha_inicio: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addQuotation(formData);
        setSubmitted(true);
        setFormData({
            empresa: '',
            contacto: '',
            email: '',
            telefono: '',
            tipo_proyecto: '',
            presupuesto: '',
            fecha_inicio: '',
            mensaje: ''
        });
        window.scrollTo(0, 0);
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <div style={styles.header}>
                <div className="container">
                    <h1 style={styles.title}>Solicitar Cotización</h1>
                    <p style={styles.subtitle}>Cuéntenos sus requerimientos. Nuestro equipo de ingeniería evaluará la viabilidad técnica y económica de su proyecto.</p>
                </div>
            </div>

            <div className="container" style={styles.content}>
                {submitted ? (
                    <div style={styles.successMessage}>
                        <div style={styles.successIcon}>
                            <i className="fa-solid fa-check-circle"></i>
                        </div>
                        <h2 style={{ color: '#0a192f', marginBottom: '1rem' }}>¡Solicitud Recibida!</h2>
                        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Hemos recibido los detalles de su proyecto. Nuestro equipo técnico analizará la información y se pondrá en contacto con usted en un plazo máximo de 24 horas hábiles.</p>
                        <button onClick={() => setSubmitted(false)} className="btn-cta" style={{ padding: '12px 30px' }}>
                            Enviar Nueva Solicitud
                        </button>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {/* Formulario Comercial */}
                        <div style={styles.formCol}>
                            <div style={styles.card}>
                                <h3 style={styles.cardTitle}>Detalles del Proyecto</h3>
                                <form onSubmit={handleSubmit} style={styles.form}>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Nombre de la Empresa / Cliente</label>
                                        <input
                                            type="text"
                                            name="empresa"
                                            style={styles.input}
                                            placeholder="Ej: Industrias S.A."
                                            required
                                            value={formData.empresa}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div style={styles.row}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Persona de Contacto</label>
                                            <input
                                                type="text"
                                                name="contacto"
                                                style={styles.input}
                                                required
                                                value={formData.contacto}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Teléfono</label>
                                            <input
                                                type="tel"
                                                name="telefono"
                                                style={styles.input}
                                                placeholder="+56 9..."
                                                required
                                                value={formData.telefono}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Correo Electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            style={styles.input}
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div style={styles.row}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Tipo de Proyecto</label>
                                            <select
                                                name="tipo_proyecto"
                                                style={styles.select}
                                                required
                                                value={formData.tipo_proyecto}
                                                onChange={handleChange}
                                            >
                                                <option value="">Seleccionar Categoría...</option>
                                                <option value="Obra Civil">Obra Civil (Naves, Edificios)</option>
                                                <option value="Instalación Eléctrica">Instalación Eléctrica Industrial</option>
                                                <option value="Proyecto Integral">Proyecto Integral (Llave en Mano)</option>
                                                <option value="Mantenimiento">Mantenimiento / Otros</option>
                                            </select>
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Presupuesto Estimado (Opcional)</label>
                                            <select
                                                name="presupuesto"
                                                style={styles.select}
                                                value={formData.presupuesto}
                                                onChange={handleChange}
                                            >
                                                <option value="">Seleccionar Rango...</option>
                                                <option value="Menos de 1M">Menos de $1.000.000</option>
                                                <option value="1M - 5M">$1.000.000 - $5.000.000</option>
                                                <option value="5M - 20M">$5.000.000 - $20.000.000</option>
                                                <option value="Más de 20M">Más de $20.000.000</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Fecha Estimada de Inicio</label>
                                        <input
                                            type="date"
                                            name="fecha_inicio"
                                            style={styles.input}
                                            value={formData.fecha_inicio}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Descripción del Requerimiento</label>
                                        <textarea
                                            name="mensaje"
                                            style={styles.textarea}
                                            rows="5"
                                            placeholder="Describa ubicación, metros cuadrados aproximados, alcance del trabajo y cualquier detalle relevante..."
                                            required
                                            value={formData.mensaje}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn-cta" style={{ width: '100%', marginTop: '1rem', padding: '15px', fontSize: '1.1rem' }}>
                                        ENVIAR SOLICITUD DE COTIZACIÓN
                                    </button>

                                </form>
                            </div>
                        </div>

                        {/* Datos de Contacto Directo */}
                        <div style={styles.infoCol}>
                            <div style={styles.contactInfo}>
                                <h3 style={styles.sectionTitle}>Información de Contacto</h3>
                                <p style={{ marginBottom: '2rem', color: '#64748b' }}>Si tiene dudas antes de enviar su solicitud, puede contactarnos directamente a través de nuestros canales oficiales.</p>

                                <div style={styles.infoItem}>
                                    <div style={styles.iconWrapper}><i className="fa-solid fa-location-dot"></i></div>
                                    <div>
                                        <h4 style={styles.infoTitle}>Oficina Central</h4>
                                        <p style={styles.infoText}>Av. Industrial 1234, Parque Tecnológico, Santiago.</p>
                                    </div>
                                </div>
                                <div style={styles.infoItem}>
                                    <div style={styles.iconWrapper}><i className="fa-solid fa-phone"></i></div>
                                    <div>
                                        <h4 style={styles.infoTitle}>Teléfono</h4>
                                        <p style={styles.infoText}>+56 2 2345 6789</p>
                                    </div>
                                </div>
                                <div style={styles.infoItem}>
                                    <div style={styles.iconWrapper}><i className="fa-solid fa-envelope"></i></div>
                                    <div>
                                        <h4 style={styles.infoTitle}>Email</h4>
                                        <p style={styles.infoText}>proyectos@nexusgroup.com</p>
                                    </div>
                                </div>
                                <div style={styles.infoItem}>
                                    <div style={styles.iconWrapper}><i className="fa-solid fa-clock"></i></div>
                                    <div>
                                        <h4 style={styles.infoTitle}>Horario de Atención</h4>
                                        <p style={styles.infoText}>Lunes a Viernes: 09:00 - 18:00 hrs.</p>
                                    </div>
                                </div>

                                <div style={styles.mapPlaceholder}>
                                    <i className="fa-solid fa-map" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#cbd5e1' }}></i>
                                    <span>Mapa de Ubicación</span>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    header: {
        background: 'linear-gradient(rgba(10,25,47,0.9), rgba(10,25,47,0.8)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        textAlign: 'center'
    },
    title: {
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        marginBottom: '1rem',
        fontFamily: 'Oswald, sans-serif'
    },
    subtitle: {
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        opacity: 0.9,
        maxWidth: '700px',
        margin: '0 auto',
        padding: '0 1rem'
    },
    content: {
        padding: 'clamp(2rem, 5vw, 4rem) 5%'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 900 ? '1fr' : '1.5fr 1fr',
        gap: 'clamp(2rem, 4vw, 4rem)'
    },
    card: {
        backgroundColor: 'white',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        borderTop: '5px solid var(--accent-1)'
    },
    cardTitle: {
        marginBottom: '1.5rem',
        color: 'var(--primary)',
        borderBottom: '2px solid var(--accent-1)',
        paddingBottom: '10px',
        display: 'inline-block',
        fontSize: '1.5rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 600 ? '1fr' : '1fr 1fr',
        gap: '1rem'
    },
    label: {
        fontWeight: '600',
        fontSize: '0.9rem',
        color: 'var(--steel)'
    },
    input: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        fontFamily: 'inherit',
        backgroundColor: '#f8fafc',
        transition: 'border-color 0.3s',
        outline: 'none'
    },
    select: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        fontFamily: 'inherit',
        backgroundColor: '#f8fafc',
        outline: 'none'
    },
    textarea: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        fontFamily: 'inherit',
        resize: 'vertical',
        backgroundColor: '#f8fafc',
        outline: 'none'
    },
    sectionTitle: {
        color: 'var(--primary)',
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        fontFamily: 'Oswald, sans-serif'
    },
    contactInfo: {
        backgroundColor: 'white',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '1.5rem'
    },
    iconWrapper: {
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(255, 77, 0, 0.1)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-1)',
        fontSize: '1.1rem',
        flexShrink: 0
    },
    infoTitle: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#0a192f',
        marginBottom: '0.2rem'
    },
    infoText: {
        color: '#64748b',
        fontSize: '0.95rem'
    },
    mapPlaceholder: {
        width: '100%',
        height: '250px',
        backgroundColor: '#f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        marginTop: '2rem',
        borderRadius: '8px',
        border: '2px dashed #cbd5e1'
    },
    successMessage: {
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        maxWidth: '600px',
        margin: '0 auto'
    },
    successIcon: {
        fontSize: '4rem',
        color: '#10b981',
        marginBottom: '1.5rem'
    }
};

export default Contact;
