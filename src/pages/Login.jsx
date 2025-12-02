import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const result = login(email, password);

            if (result.success) {
                if (result.role === 'admin') {
                    navigate('/admin');
                } else if (result.role === 'client') {
                    navigate('/client');
                }
            } else {
                setError(result.message || 'Credenciales inválidas.');
            }

            setLoading(false);
        }, 800);
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>

            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.brand}>
                        <i className="fa-solid fa-bolt" style={{ color: '#00f0ff' }}></i>
                        NEXUS <span style={{ color: '#ff4d00' }}>GROUP</span>
                    </h1>
                    <p style={styles.subtitle}>Acceso Corporativo Seguro</p>
                </div>

                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>ID Corporativo / Email</label>
                        <div style={styles.inputWrapper}>
                            <i className="fa-solid fa-user" style={styles.icon}></i>
                            <input
                                type="email"
                                placeholder="usuario@empresa.com"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Contraseña</label>
                        <div style={styles.inputWrapper}>
                            <i className="fa-solid fa-lock" style={styles.icon}></i>
                            <input
                                type="password"
                                placeholder="••••••••"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={styles.error}>
                            <i className="fa-solid fa-circle-exclamation"></i> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                            padding: '15px',
                            background: loading ? '#ccc' : '#ff4d00',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '600'
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i> VERIFICANDO...
                            </>
                        ) : (
                            'INGRESAR AL SISTEMA'
                        )}
                    </button>
                </form>

                <div style={styles.footer}>
                    <Link to="/" style={styles.link}>← Volver al sitio público</Link>
                    <a href="#" style={styles.link}>Recuperar acceso</a>
                </div>

                <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <p style={{ color: '#cbd5e1', marginBottom: '10px', fontSize: '0.9rem' }}>¿Eres parte del equipo?</p>
                    <Link to="/portal" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-solid fa-helmet-safety"></i> Ir al Portal del Trabajador
                    </Link>
                </div>

                <div style={styles.demoCredentials}>
                    <p style={{ fontSize: '0.75rem', color: '#8892b0', marginBottom: '5px' }}>Credenciales de prueba:</p>
                    <p style={{ fontSize: '0.75rem', color: '#64ffda' }}>Admin: admin@nexus.com / admin</p>
                    <p style={{ fontSize: '0.75rem', color: '#64ffda' }}>Cliente: cliente@empresa.com / cliente</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#0a192f',
        overflow: 'hidden',
        padding: '1rem'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(10,25,47,0.8), rgba(10,25,47,0.9)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
    },
    card: {
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '2.5rem'
    },
    brand: {
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '0.5rem',
        fontFamily: 'Oswald, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    subtitle: {
        color: '#8892b0',
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
        letterSpacing: '1px',
        textTransform: 'uppercase'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        fontWeight: '600',
        color: '#ccd6f6',
        textTransform: 'uppercase'
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        left: '15px',
        color: '#8892b0',
        zIndex: 2
    },
    input: {
        width: '100%',
        padding: '12px 12px 12px 40px',
        backgroundColor: 'rgba(10, 25, 47, 0.5)',
        border: '1px solid #233554',
        borderRadius: '4px',
        color: 'white',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        outline: 'none',
        transition: 'border-color 0.3s'
    },
    error: {
        color: '#ff6b6b',
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        padding: '0.8rem',
        borderRadius: '4px',
        border: '1px solid rgba(255, 107, 107, 0.2)'
    },
    footer: {
        marginTop: '2rem',
        display: 'flex',
        flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
        justifyContent: 'space-between',
        gap: '1rem',
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1.5rem',
        textAlign: 'center'
    },
    link: {
        color: '#8892b0',
        textDecoration: 'none',
        transition: 'color 0.3s'
    },
    demoCredentials: {
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: 'rgba(100, 255, 218, 0.05)',
        borderRadius: '6px',
        border: '1px solid rgba(100, 255, 218, 0.1)',
        textAlign: 'center'
    }
};

export default Login;
