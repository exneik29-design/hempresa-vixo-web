import React from 'react';
import { useContent } from '../../context/ContentContext';

const QuotationsManager = () => {
    const { quotations, updateQuotationStatus, deleteQuotation } = useContent();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pendiente': return '#f59e0b';
            case 'En Revisión': return '#3b82f6';
            case 'Contactado': return '#10b981';
            case 'Rechazado': return '#ef4444';
            default: return '#64748b';
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2 style={styles.title}>Gestión de Cotizaciones</h2>
                <p style={styles.subtitle}>Administra las solicitudes de presupuesto recibidas desde la web.</p>
            </header>

            <div style={styles.content}>
                {quotations.length === 0 ? (
                    <div style={styles.emptyState}>
                        <i className="fa-solid fa-inbox" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                        <p>No hay solicitudes de cotización pendientes.</p>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {quotations.map(quotation => (
                            <div key={quotation.id} style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <div>
                                        <span style={{ ...styles.badge, backgroundColor: getStatusColor(quotation.status) }}>
                                            {quotation.status}
                                        </span>
                                        <span style={styles.date}>{new Date(quotation.date).toLocaleDateString()}</span>
                                    </div>
                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => deleteQuotation(quotation.id)}
                                            style={styles.deleteBtn}
                                            title="Eliminar solicitud"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <h3 style={styles.companyName}>{quotation.empresa}</h3>
                                <p style={styles.contactPerson}><i className="fa-solid fa-user"></i> {quotation.contacto}</p>

                                <div style={styles.details}>
                                    <div style={styles.detailItem}>
                                        <span style={styles.label}>Email:</span>
                                        <a href={`mailto:${quotation.email}`} style={styles.link}>{quotation.email}</a>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.label}>Teléfono:</span>
                                        <a href={`tel:${quotation.telefono}`} style={styles.link}>{quotation.telefono}</a>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.label}>Proyecto:</span>
                                        <span>{quotation.tipo_proyecto}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.label}>Presupuesto:</span>
                                        <span>{quotation.presupuesto || 'No especificado'}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={styles.label}>Inicio:</span>
                                        <span>{quotation.fecha_inicio || 'No especificado'}</span>
                                    </div>
                                </div>

                                <div style={styles.messageBox}>
                                    <p style={styles.messageLabel}>Descripción del Requerimiento:</p>
                                    <p style={styles.messageText}>{quotation.mensaje}</p>
                                </div>

                                <div style={styles.statusActions}>
                                    <select
                                        value={quotation.status}
                                        onChange={(e) => updateQuotationStatus(quotation.id, e.target.value)}
                                        style={styles.statusSelect}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="En Revisión">En Revisión</option>
                                        <option value="Contactado">Contactado</option>
                                        <option value="Rechazado">Rechazado</option>
                                    </select>
                                    <a href={`mailto:${quotation.email}?subject=Respuesta a Solicitud de Cotización - Nexus Group`} style={styles.replyBtn}>
                                        <i className="fa-solid fa-reply"></i> Responder
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
    header: {
        marginBottom: '2rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '1rem'
    },
    title: {
        fontSize: '1.8rem',
        color: '#0f172a',
        marginBottom: '0.5rem'
    },
    subtitle: {
        color: '#64748b',
        fontSize: '1rem'
    },
    content: {
        marginTop: '1rem'
    },
    emptyState: {
        textAlign: 'center',
        padding: '4rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        color: '#64748b'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e2e8f0'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    },
    badge: {
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '600',
        marginRight: '8px'
    },
    date: {
        fontSize: '0.8rem',
        color: '#94a3b8'
    },
    actions: {
        display: 'flex',
        gap: '0.5rem'
    },
    deleteBtn: {
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        cursor: 'pointer',
        fontSize: '0.9rem',
        padding: '4px',
        transition: 'color 0.2s',
        ':hover': { color: '#ef4444' }
    },
    companyName: {
        fontSize: '1.2rem',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '0.2rem'
    },
    contactPerson: {
        fontSize: '0.9rem',
        color: '#64748b',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1rem',
        fontSize: '0.9rem'
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '4px'
    },
    label: {
        color: '#64748b',
        fontWeight: '500'
    },
    link: {
        color: '#3b82f6',
        textDecoration: 'none'
    },
    messageBox: {
        backgroundColor: '#f8fafc',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1.5rem',
        flex: 1
    },
    messageLabel: {
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#64748b',
        marginBottom: '0.5rem'
    },
    messageText: {
        fontSize: '0.9rem',
        color: '#334155',
        lineHeight: '1.5'
    },
    statusActions: {
        display: 'flex',
        gap: '1rem',
        marginTop: 'auto'
    },
    statusSelect: {
        flex: 1,
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #cbd5e1',
        fontSize: '0.9rem',
        color: '#334155'
    },
    replyBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500'
    }
};

export default QuotationsManager;
