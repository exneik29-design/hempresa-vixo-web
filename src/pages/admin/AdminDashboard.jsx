import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div style={styles.container}>
            <header style={styles.topbar}>
                <h2 style={{ color: '#1e293b' }}>Panel de Control</h2>
                <div style={styles.userInfo}>
                    <span>{user?.name || 'Admin'}</span>
                    <div style={styles.avatar}>{user?.name?.[0] || 'A'}</div>
                </div>
            </header>

            <div style={styles.content}>
                {/* KPI Cards */}
                <div style={styles.kpiGrid}>
                    <div style={styles.kpiCard}>
                        <div style={styles.kpiIcon}><i className="fa-solid fa-building-columns"></i></div>
                        <div>
                            <div style={styles.kpiLabel}>Proyectos Activos</div>
                            <div style={styles.kpiValue}>4</div>
                        </div>
                    </div>
                    <div style={styles.kpiCard}>
                        <div style={{ ...styles.kpiIcon, background: '#e0f2fe', color: '#0284c7' }}><i className="fa-solid fa-users"></i></div>
                        <div>
                            <div style={styles.kpiLabel}>Personal en Obra</div>
                            <div style={styles.kpiValue}>28</div>
                        </div>
                    </div>
                    <div style={styles.kpiCard}>
                        <div style={{ ...styles.kpiIcon, background: '#dcfce7', color: '#16a34a' }}><i className="fa-solid fa-money-bill-wave"></i></div>
                        <div>
                            <div style={styles.kpiLabel}>Facturación Mes</div>
                            <div style={styles.kpiValue}>$ 45M</div>
                        </div>
                    </div>
                </div>

                {/* Secciones de Acceso Rápido */}
                <div style={styles.quickAccessGrid}>
                    <Link to="/manager/projects" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-helmet-safety" style={styles.quickIcon}></i>
                        <h3>Gestión de Proyectos</h3>
                        <p>Ver y administrar proyectos de obra</p>
                    </Link>
                    <Link to="/manager/workers" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-users" style={styles.quickIcon}></i>
                        <h3>Recursos Humanos</h3>
                        <p>Administrar personal y nómina</p>
                    </Link>
                    <Link to="/manager/finance" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-money-bill-trend-up" style={styles.quickIcon}></i>
                        <h3>Finanzas</h3>
                        <p>Gestión financiera y adquisiciones</p>
                    </Link>
                    <Link to="/manager/inventory" style={styles.quickAccessCard}>
                        <i className="fa-solid fa-warehouse" style={styles.quickIcon}></i>
                        <h3>Inventario</h3>
                        <p>Control de bodega y logística</p>
                    </Link>
                </div>

                {/* Proyectos Recientes */}
                <div style={styles.section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={styles.sectionTitle}>Estado de Obras</h3>
                        <Link to="/manager/projects" style={styles.btnPrimary}>+ Nuevo Proyecto</Link>
                    </div>

                    <div style={styles.tableCard}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Proyecto</th>
                                    <th style={styles.th}>Cliente</th>
                                    <th style={styles.th}>Avance</th>
                                    <th style={styles.th}>Estado</th>
                                    <th style={styles.th}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={styles.td}><strong>#4092 - Planta Sur</strong></td>
                                    <td style={styles.td}>Industrias S.A.</td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={styles.progressBar}><div style={{ width: '65%', background: '#2ecc71', height: '100%' }}></div></div>
                                            <span>65%</span>
                                        </div>
                                    </td>
                                    <td style={styles.td}><span style={styles.badgeSuccess}>En Ejecución</span></td>
                                    <td style={styles.td}><button style={styles.btnIcon}><i className="fa-solid fa-pen"></i></button></td>
                                </tr>
                                <tr>
                                    <td style={styles.td}><strong>#4093 - Oficinas Centrales</strong></td>
                                    <td style={styles.td}>TechCorp SpA</td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={styles.progressBar}><div style={{ width: '15%', background: '#f1c40f', height: '100%' }}></div></div>
                                            <span>15%</span>
                                        </div>
                                    </td>
                                    <td style={styles.td}><span style={styles.badgeWarning}>Inicio</span></td>
                                    <td style={styles.td}><button style={styles.btnIcon}><i className="fa-solid fa-pen"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Postulaciones Recientes (RRHH) */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Nuevos Postulantes</h3>
                    <div style={styles.gridCandidates}>
                        <div style={styles.candidateCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ margin: 0 }}>Juan Pérez</h4>
                                <span style={styles.badgeInfo}>Electricista SEC</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '10px 0' }}>Exp: 5 años. Especialista en tableros industriales.</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={styles.btnSmall}>Ver CV</button>
                                <button style={styles.btnSmallOutline}>Contactar</button>
                            </div>
                        </div>
                        <div style={styles.candidateCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ margin: 0 }}>Pedro Soto</h4>
                                <span style={styles.badgeInfo}>Maestro Mayor</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '10px 0' }}>Exp: 12 años. Obra gruesa y terminaciones.</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={styles.btnSmall}>Ver CV</button>
                                <button style={styles.btnSmallOutline}>Contactar</button>
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
    progressBar: {
        width: '100px',
        height: '8px',
        backgroundColor: '#e2e8f0',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    badgeSuccess: {
        backgroundColor: '#dcfce7',
        color: '#16a34a',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    badgeWarning: {
        backgroundColor: '#fef3c7',
        color: '#f59e0b',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    badgeInfo: {
        backgroundColor: '#e0f2fe',
        color: '#0284c7',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    btnIcon: {
        backgroundColor: '#f1f5f9',
        border: 'none',
        width: '35px',
        height: '35px',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#64748b'
    },
    gridCandidates: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
    },
    candidateCard: {
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
    },
    btnSmall: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem'
    },
    btnSmallOutline: {
        backgroundColor: 'transparent',
        color: '#3b82f6',
        border: '1px solid #3b82f6',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem'
    }
};

export default AdminDashboard;
