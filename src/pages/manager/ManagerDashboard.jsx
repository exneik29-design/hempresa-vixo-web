import React from 'react';

const ManagerDashboard = () => {
    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Panel de Control</h1>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Bienvenido al Sistema de Gestión Integral Nexus.</p>

            <div style={styles.grid}>
                {/* Accesos Rápidos */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h3><i className="fa-solid fa-bolt" style={{ color: '#f59e0b' }}></i> Accesos Rápidos</h3>
                    </div>
                    <div style={styles.quickActions}>
                        <button style={styles.actionBtn}>
                            <div style={styles.actionIcon}><i className="fa-solid fa-plus"></i></div>
                            <span>Nuevo Proyecto</span>
                        </button>
                        <button style={styles.actionBtn}>
                            <div style={{ ...styles.actionIcon, background: '#e0f2fe', color: '#0284c7' }}><i className="fa-solid fa-file-invoice"></i></div>
                            <span>Crear Cotización</span>
                        </button>
                        <button style={styles.actionBtn}>
                            <div style={{ ...styles.actionIcon, background: '#fef9c3', color: '#ca8a04' }}><i className="fa-solid fa-user-plus"></i></div>
                            <span>Registrar Cliente</span>
                        </button>
                    </div>
                </div>

                {/* Resumen de Estado */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h3><i className="fa-solid fa-chart-pie" style={{ color: '#3b82f6' }}></i> Estado Operativo</h3>
                    </div>
                    <div style={styles.statsRow}>
                        <div style={styles.stat}>
                            <span style={styles.statValue}>4</span>
                            <span style={styles.statLabel}>Obras Activas</span>
                        </div>
                        <div style={styles.stat}>
                            <span style={styles.statValue}>12</span>
                            <span style={styles.statLabel}>Cotizaciones</span>
                        </div>
                        <div style={styles.stat}>
                            <span style={styles.statValue}>28</span>
                            <span style={styles.statLabel}>Trabajadores</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Placeholder para Gantt */}
            <div style={{ ...styles.card, marginTop: '2rem', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <i className="fa-solid fa-timeline" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                <h3 style={{ color: '#94a3b8' }}>Cronograma General de Obras</h3>
                <p style={{ color: '#cbd5e1' }}>Próximamente: Vista de Gantt interactiva</p>
            </div>
        </div>
    );
};

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
    },
    cardHeader: {
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    quickActions: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem'
    },
    actionBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        background: 'transparent',
        border: '1px solid #e2e8f0',
        padding: '1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        ':hover': {
            borderColor: '#3b82f6',
            backgroundColor: '#f0f9ff'
        }
    },
    actionIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#dcfce7',
        color: '#16a34a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
    },
    statsRow: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
    },
    stat: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#0f172a'
    },
    statLabel: {
        fontSize: '0.9rem',
        color: '#64748b'
    }
};

export default ManagerDashboard;
