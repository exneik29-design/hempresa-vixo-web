import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { icon: 'fa-gauge-high', label: 'Dashboard', path: '/admin' },
        { icon: 'fa-diagram-project', label: 'Gestión de Proyectos', path: '/admin/proyectos' },
        { icon: 'fa-edit', label: 'Gestión de Contenido', path: '/admin/cms' },
        { icon: 'fa-file-invoice', label: 'Cotizaciones', path: '/admin/cotizaciones' },
        { icon: 'fa-cog', label: 'Configuración', path: '/admin/configuracion' },
    ];

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.brand}>
                    <i className="fa-solid fa-shield-halved" style={{ color: '#3b82f6', fontSize: '1.5rem' }}></i>
                    <span style={styles.brandText}>ADMIN PANEL</span>
                </div>

                <div style={styles.userInfo}>
                    <div style={styles.avatar}>{user?.name?.[0] || 'A'}</div>
                    <div style={styles.userDetails}>
                        <span style={styles.userName}>{user?.name || 'Admin'}</span>
                        <span style={styles.userRole}>Administrador</span>
                    </div>
                </div>

                <nav style={styles.nav}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            style={{
                                ...styles.navLink,
                                backgroundColor: location.pathname === item.path ? '#3b82f6' : 'transparent',
                                color: location.pathname === item.path ? '#fff' : '#64748b'
                            }}
                        >
                            <i className={`fa-solid ${item.icon}`} style={{ fontSize: '1.1rem', width: '25px' }}></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div style={styles.footer}>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <i className="fa-solid fa-power-off"></i>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', sans-serif"
    },
    sidebar: {
        width: '260px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)'
    },
    brand: {
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 20px'
    },
    brandText: {
        fontWeight: '700',
        fontSize: '1.1rem',
        letterSpacing: '0.5px',
        color: '#0f172a'
    },
    userInfo: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid #e2e8f0'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: '1.1rem'
    },
    userDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    userName: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#0f172a'
    },
    userRole: {
        fontSize: '0.75rem',
        color: '#64748b'
    },
    nav: {
        flex: 1,
        padding: '20px 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflowY: 'auto'
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.2s',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    footer: {
        padding: '15px',
        borderTop: '1px solid #e2e8f0'
    },
    logoutBtn: {
        width: '100%',
        background: '#fee2e2',
        color: '#dc2626',
        border: 'none',
        padding: '12px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontWeight: '600',
        transition: 'all 0.2s'
    },
    main: {
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#f8fafc'
    }
};

export default AdminLayout;
