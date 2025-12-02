import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ManagerLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { icon: 'fa-gauge-high', label: 'Dashboard', path: '/manager/dashboard' },
        { icon: 'fa-helmet-safety', label: 'Proyectos', path: '/manager/projects' },
        { icon: 'fa-file-invoice-dollar', label: 'Presupuestos', path: '/manager/budget' },
        { icon: 'fa-users', label: 'RRHH', path: '/manager/workers' },
        { icon: 'fa-money-bill-trend-up', label: 'Finanzas', path: '/manager/finance' },
        { icon: 'fa-warehouse', label: 'Inventario', path: '/manager/inventory' },
    ];

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <aside style={{ ...styles.sidebar, width: collapsed ? '80px' : '260px' }}>
                <div style={styles.brand}>
                    <i className="fa-solid fa-bolt" style={{ color: '#00f0ff', fontSize: '1.5rem' }}></i>
                    {!collapsed && <span style={styles.brandText}>NEXUS <small style={{ color: '#94a3b8', fontSize: '0.7rem' }}>MANAGER</small></span>}
                </div>

                <div style={styles.userInfo}>
                    <div style={styles.avatar}>{user?.name?.[0] || 'A'}</div>
                    {!collapsed && (
                        <div style={styles.userDetails}>
                            <span style={styles.userName}>{user?.name || 'Admin'}</span>
                            <span style={styles.userRole}>Gerencia</span>
                        </div>
                    )}
                </div>

                <nav style={styles.nav}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            style={{
                                ...styles.navLink,
                                justifyContent: collapsed ? 'center' : 'flex-start',
                                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: location.pathname === item.path ? '#fff' : '#94a3b8'
                            }}
                            title={collapsed ? item.label : ''}
                        >
                            <i className={`fa-solid ${item.icon}`} style={{ fontSize: '1.2rem', width: '25px', textAlign: 'center' }}></i>
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div style={styles.footer}>
                    <button onClick={() => setCollapsed(!collapsed)} style={styles.collapseBtn}>
                        <i className={`fa-solid ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                    </button>
                    <button onClick={handleLogout} style={{ ...styles.logoutBtn, justifyContent: collapsed ? 'center' : 'flex-start' }}>
                        <i className="fa-solid fa-power-off"></i>
                        {!collapsed && <span>Salir</span>}
                    </button>
                </div>
            </aside>

            {/* Main Workspace */}
            <main style={styles.main}>
                {/* Top Header for Status */}
                <header style={styles.topHeader}>
                    <div style={styles.statusIndicator}>
                        <span style={styles.onlineDot}></span>
                        <span style={styles.statusText}>Conectado (Sincronizado)</span>
                    </div>
                    <div style={styles.topActions}>
                        <button style={styles.iconBtn}><i className="fa-solid fa-bell"></i></button>
                        <button style={styles.iconBtn}><i className="fa-solid fa-gear"></i></button>
                    </div>
                </header>

                {/* Content Area */}
                <div style={styles.contentArea}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
    },
    sidebar: {
        backgroundColor: '#0a1120',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        zIndex: 20
    },
    brand: {
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        borderBottom: '1px solid #1e293b'
    },
    brandText: {
        fontWeight: '700',
        fontSize: '1.2rem',
        letterSpacing: '1px',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1'
    },
    userInfo: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        borderBottom: '1px solid #1e293b'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    userDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    userName: {
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    userRole: {
        fontSize: '0.75rem',
        color: '#64748b'
    },
    nav: {
        flex: 1,
        padding: '20px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        overflowY: 'auto'
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '12px 15px',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    footer: {
        padding: '15px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    collapseBtn: {
        background: 'transparent',
        border: 'none',
        color: '#64748b',
        cursor: 'pointer',
        padding: '5px'
    },
    logoutBtn: {
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        border: 'none',
        padding: '10px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background 0.2s'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f1f5f9'
    },
    topHeader: {
        height: '60px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
    },
    statusIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        backgroundColor: '#f0fdf4',
        borderRadius: '20px',
        border: '1px solid #bbf7d0'
    },
    onlineDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#22c55e',
        borderRadius: '50%',
        boxShadow: '0 0 5px #22c55e'
    },
    statusText: {
        fontSize: '0.8rem',
        color: '#15803d',
        fontWeight: '600'
    },
    topActions: {
        display: 'flex',
        gap: '10px'
    },
    iconBtn: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        border: '1px solid #e2e8f0',
        backgroundColor: 'white',
        color: '#64748b',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    },
    contentArea: {
        flex: 1,
        padding: '2rem',
        overflowY: 'auto',
        color: '#1e293b'
    }
};

export default ManagerLayout;
