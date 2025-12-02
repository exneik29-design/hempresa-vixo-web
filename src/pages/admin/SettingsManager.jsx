import React, { useState } from 'react';
import { useCompany } from '../../context/CompanyContext';

const SettingsManager = () => {
    const { companyData, updateCompanyData } = useCompany();
    const [formData, setFormData] = useState(companyData);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateCompanyData(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Configuración del Sistema</h2>

            <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                    <i className="fa-solid fa-building"></i> Datos de la Empresa
                </h3>
                <p style={styles.subtitle}>
                    Esta información aparecerá en todos los presupuestos y documentos oficiales
                </p>

                <form onSubmit={handleSave} style={styles.form}>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre de la Empresa *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>RUT *</label>
                            <input
                                type="text"
                                name="rut"
                                value={formData.rut}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Representante Legal</label>
                            <input
                                type="text"
                                name="representanteLegal"
                                value={formData.representanteLegal}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Domicilio / Dirección Completa</label>
                        <textarea
                            name="domicilio"
                            value={formData.domicilio}
                            onChange={handleChange}
                            style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
                            rows="3"
                        />
                    </div>

                    <div style={styles.buttonContainer}>
                        {saved && (
                            <div style={styles.successMessage}>
                                <i className="fa-solid fa-check-circle"></i> Cambios guardados correctamente
                            </div>
                        )}
                        <button type="submit" style={styles.saveButton}>
                            <i className="fa-solid fa-save"></i> Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Card */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                    <i className="fa-solid fa-eye"></i> Vista Previa
                </h3>
                <p style={styles.subtitle}>
                    Así aparecerá tu información en los presupuestos
                </p>

                <div style={styles.previewCard}>
                    <div style={styles.previewHeader}>
                        <div style={styles.previewLogo}>{formData.nombre}</div>
                        <h4 style={styles.previewTitle}>PRESUPUESTO POR TRABAJOS ADICIONALES</h4>
                    </div>
                    <div style={styles.previewBody}>
                        <div style={styles.previewSection}>
                            <div style={styles.previewSectionTitle}>Datos de la Empresa Emisora</div>
                            <div style={styles.previewInfo}>
                                <strong>EMPRESA:</strong> {formData.nombre}<br />
                                <strong>REPRESENTANTE LEGAL:</strong> {formData.representanteLegal}<br />
                                <strong>RUT:</strong> {formData.rut}<br />
                                <strong>DOMICILIO:</strong> {formData.domicilio}<br />
                                <strong>TELÉFONO:</strong> {formData.telefono}<br />
                                <strong>EMAIL:</strong> {formData.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    title: {
        fontSize: '1.8rem',
        color: '#1e293b',
        marginBottom: '2rem'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
    },
    cardTitle: {
        fontSize: '1.3rem',
        color: '#1e293b',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    subtitle: {
        color: '#64748b',
        marginBottom: '2rem',
        fontSize: '0.9rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#334155',
        marginBottom: '0.5rem'
    },
    input: {
        padding: '0.75rem',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '0.95rem',
        transition: 'border-color 0.2s',
        outline: 'none'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem'
    },
    saveButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '0.75rem 2rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.2s'
    },
    successMessage: {
        color: '#22c55e',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600'
    },
    previewCard: {
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    previewHeader: {
        textAlign: 'center',
        padding: '1.5rem',
        borderBottom: '2px solid #3b82f6'
    },
    previewLogo: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: '#3b82f6',
        marginBottom: '0.5rem'
    },
    previewTitle: {
        margin: 0,
        color: '#333',
        fontSize: '1.2rem'
    },
    previewBody: {
        padding: '1.5rem',
        backgroundColor: '#f8fafc'
    },
    previewSection: {
        marginBottom: '1rem'
    },
    previewSectionTitle: {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.5rem 1rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        borderRadius: '4px'
    },
    previewInfo: {
        fontSize: '0.9rem',
        lineHeight: '1.8',
        color: '#334155'
    }
};

export default SettingsManager;
