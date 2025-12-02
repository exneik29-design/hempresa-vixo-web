import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { quotations } = useContent();

    // Filtrar cotizaciones pendientes
    const pendingQuotations = quotations.filter(q => q.status === 'Pendiente');

    return (
        <div style={styles.container}>
            <header style={styles.topbar}>
                <h2 style={{ color: '#1e293b' }}>Panel de Administración Web</h2>
                <div style={styles.userInfo}>
                    <span>{user?.name || 'Admin'}</span>
                    <div style={styles.avatar}>{user?.name?.[0] || 'A'}</div>
                </div>
            </header>

            <div style={styles.content}>
                {/* KPI Cards */}
                <div style={styles.kpiGrid}>
                    <div style={styles.kpiCard}>
                        <div style={styles.kpiIcon}><i className="fa-solid fa-diagram-project"></i></div>
                        <div>
                            <div style={styles.kpiLabel}>Proyectos Activos</div>
                            <div style={styles.kpiValue}>3</div>
                        </div>
                    </div>
                    <div style={styles.kpiCard}>
                        <div style={{ ...styles.kpiIcon, background: '#e0f2fe', color: '#0284c7' }}><i className="fa-solid fa-file-invoice"></i></div>
                        <div>
                            <div style={styles.kpiLabel}>Cotizaciones Pendientes</div>
                            <div style={styles.kpiValue}>{pendingQuotations.length}</div>
                        </div>
                    </div>
                    <div style={styles.kpiCard}>
                        <div style={{ ...styles.kpiIcon, background: '#dcfce7', color: '#16a34a' }}><i className="fa-solid fa-users"></i></div>
                        <div>
                            <div style={styles.kpiLabel}>Clientes Activos</div>
                            <div style={styles.kpiValue}>5</div>
                        </div>
                    </div>
                </div>

                {/* Acceso Rápido */}
                <div style={styles.quickAccessGrid}>
                    <Link to="/admin/proyectos" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-diagram-project" style={styles.quickIcon}></i>
                        <h3>Gestión de Proyectos</h3>
                        <p>Crear y administrar cronogramas Gantt</p>
                    </Link>
                    <Link to="/admin/cotizaciones" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-file-invoice-dollar" style={styles.quickIcon}></i>
                        <h3>Cotizaciones</h3>
                        <p>Revisar solicitudes de cotización</p>
                    </Link>
                    <Link to="/admin/cms" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-pen-to-square" style={styles.quickIcon}></i>
                        <h3>Contenido Web</h3>
                        <p>Editar textos e imágenes del sitio</p>
                    </Link>
                    <Link to="/admin/configuracion" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-gear" style={styles.quickIcon}></i>
                        <h3>Configuración</h3>
                        <p>Ajustes generales del sistema</p>
                    </Link>
                </div>

                {/* Cotizaciones Recientes */}
                {pendingQuotations.length > 0 && (
                    <div style={styles.section}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={styles.sectionTitle}>Cotizaciones Pendientes</h3>
                            <Link to="/admin/cotizaciones" style={styles.btnPrimary}>Ver Todas</Link>
                        </div>

                        <div style={styles.tableCard}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Fecha</th>
                                        <th style={styles.th}>Nombre</th>
                                        <th style={styles.th}>Servicio</th>
                                        <th style={styles.th}>Email</th>
                                        <th style={styles.th}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingQuotations.slice(0, 5).map(quote => (
                                        <tr key={quote.id}>
                                            <td style={styles.td}>{new Date(quote.date).toLocaleDateString()}</td>
                                            <td style={styles.td}><strong>{quote.name}</strong></td>
                                            <td style={styles.td}>{quote.service}</td>
                                            <td style={styles.td}>{quote.email}</td>
                                            <td style={styles.td}>
                                                <button style={styles.btnIcon} onClick={() => navigate('/admin/cotizaciones')}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
    },
    topbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e2e8f0'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    kpiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
    },
    kpiCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    kpiIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#fef3c7',
        color: '#f59e0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
    },
    kpiLabel: {
        fontSize: '0.85rem',
        color: '#64748b',
        marginBottom: '5px'
    },
    kpiValue: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1e293b'
    },
    quickAccessGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
    },
    quickAccessCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        textDecoration: 'none',
        color: '#1e293b',
        transition: 'all 0.2s',
        cursor: 'pointer'
    },
    quickIcon: {
        fontSize: '2rem',
        color: '#3b82f6',
        marginBottom: '1rem'
    },
    section: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
        fontSize: '1.2rem',
        color: '#1e293b',
        marginBottom: '1rem'
    },
    btnPrimary: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        textDecoration: 'none',
        display: 'inline-block'
    },
    tableCard: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        textAlign: 'left',
        padding: '1rem',
        borderBottom: '2px solid #e2e8f0',
        color: '#64748b',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    td: {
        padding: '1rem',
        borderBottom: '1px solid #f1f5f9'
    },
    btnIcon: {
        backgroundColor: '#f1f5f9',
        border: 'none',
        width: '35px',
        height: '35px',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#64748b'
    }
};

export default AdminDashboard;
