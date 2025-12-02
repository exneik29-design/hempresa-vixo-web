import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COMPANY_INFO } from '../config/company';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const result = login(email, password);

            if (result.success) {
                switch (result.role) {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'client':
                        navigate('/client/dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError(result.message || 'Error al iniciar sesión');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div style={styles.container}>
            {/* Lado Izquierdo - Imagen y Branding */}
            <div style={styles.leftPanel}>
                <div style={styles.imageOverlay}></div>
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Corporate Building"
                    style={styles.backgroundImage}
                />

                <div style={styles.brandingSection}>
                    <div style={styles.logoSection}>
                        <div style={styles.logo}>
                            <span style={styles.logoText}>D</span>
                        </div>
                        <span style={styles.companyName}>{COMPANY_INFO.name}</span>
                    </div>
                    <h2 style={styles.heroTitle}>
                        Gestión Empresarial <br />
                        <span style={styles.heroSubtitle}>Inteligente y Segura</span>
                    </h2>
                    <p style={styles.heroDescription}>
                        Accede a tu portal exclusivo para gestionar proyectos, finanzas y operaciones en tiempo real.
                    </p>
                </div>
            </div>

            {/* Lado Derecho - Formulario */}
            <div style={styles.rightPanel}>
                <Link to="/" style={styles.backButton}>
                    <span>Volver al inicio</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>

                <div style={styles.formContainer}>
                    <div style={styles.header}>
                        <div style={{ ...styles.logoMobile, display: window.innerWidth <= 768 ? 'flex' : 'none' }}>
                            <div style={styles.logo}>
                                <span style={styles.logoText}>D</span>
                            </div>
                        </div>
                        <h2 style={styles.title}>Bienvenido de nuevo</h2>
                        <p style={styles.subtitle}>Ingresa tus credenciales para acceder al sistema.</p>
                    </div>

                    {/* Credenciales de Demo */}
                    <div style={styles.demoBox}>
                        <p style={styles.demoTitle}>
                            <i className="fa-solid fa-check-circle" style={{ color: '#10b981', marginRight: '8px' }}></i>
                            Credenciales de Prueba (Demo):
                        </p>
                        <div style={styles.demoGrid}>
                            <div><span style={styles.demoLabel}>Admin:</span> admin@dacaro.cl</div>
                            <div><span style={styles.demoPass}>Pass:</span> admin</div>
                            <div><span style={styles.demoLabel}>Cliente:</span> cliente@dacaro.cl</div>
                            <div><span style={styles.demoPass}>Pass:</span> cliente</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <div style={styles.inputWrapper}>
                                <i className="fa-solid fa-envelope" style={styles.inputIcon}></i>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={styles.input}
                                    placeholder="Correo electrónico"
                                />
                            </div>

                            <div style={styles.inputWrapper}>
                                <i className="fa-solid fa-lock" style={styles.inputIcon}></i>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={styles.input}
                                    placeholder="Contraseña"
                                />
                            </div>
                        </div>

                        {error && (
                            <div style={styles.errorBox}>
                                <i className="fa-solid fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <div style={styles.options}>
                            <label style={styles.checkbox}>
                                <input type="checkbox" style={{ marginRight: '8px' }} />
                                Recordarme
                            </label>
                            <a href="#" style={styles.forgotLink}>¿Olvidaste tu contraseña?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{ ...styles.submitButton, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                        >
                            {isLoading ? (
                                <div style={styles.spinner}></div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    <p style={styles.footer}>
                        ¿No tienes acceso?{' '}
                        <a href={`mailto:${COMPANY_INFO.emails.support}`} style={styles.footerLink}>
                            Contactar a Soporte
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        background: '#0f172a',
        fontFamily: 'Inter, sans-serif'
    },
    leftPanel: {
        position: 'relative',
        width: '50%',
        overflow: 'hidden',
        display: window.innerWidth <= 1024 ? 'none' : 'block'
    },
    imageOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.8))',
        zIndex: 1
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    brandingSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: '4rem',
        zIndex: 2,
        color: 'white'
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '2rem'
    },
    logo: {
        width: '48px',
        height: '48px',
        background: '#2563eb',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'white'
    },
    companyName: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        fontFamily: 'Oswald, sans-serif'
    },
    heroTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        lineHeight: '1.2'
    },
    heroSubtitle: {
        color: '#60a5fa'
    },
    heroDescription: {
        color: '#cbd5e1',
        fontSize: '1.125rem',
        maxWidth: '28rem',
        lineHeight: '1.75'
    },
    rightPanel: {
        width: window.innerWidth <= 1024 ? '100%' : '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative'
    },
    backButton: {
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        color: '#94a3b8',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'color 0.3s'
    },
    formContainer: {
        maxWidth: '28rem',
        width: '100%'
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    logoMobile: {
        justifyContent: 'center',
        marginBottom: '1.5rem'
    },
    title: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '0.5rem'
    },
    subtitle: {
        color: '#94a3b8'
    },
    demoBox: {
        background: 'rgba(30, 41, 59, 0.5)',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '1rem',
        fontSize: '0.75rem',
        color: '#94a3b8',
        marginBottom: '2rem'
    },
    demoTitle: {
        fontWeight: '600',
        color: '#cbd5e1',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center'
    },
    demoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem'
    },
    demoLabel: {
        color: '#60a5fa'
    },
    demoPass: {
        color: '#64748b'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    inputWrapper: {
        position: 'relative'
    },
    inputIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#64748b',
        fontSize: '1.125rem'
    },
    input: {
        width: '100%',
        paddingLeft: '3rem',
        paddingRight: '1rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        border: '1px solid #334155',
        borderRadius: '8px',
        background: 'rgba(30, 41, 59, 0.5)',
        color: '#f1f5f9',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'all 0.2s',
        fontFamily: 'inherit'
    },
    errorBox: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        fontSize: '0.875rem',
        color: '#fca5a5',
        background: 'rgba(127, 29, 29, 0.2)',
        border: '1px solid rgba(127, 29, 29, 0.5)',
        borderRadius: '8px'
    },
    options: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        color: '#94a3b8'
    },
    forgotLink: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#3b82f6',
        textDecoration: 'none',
        transition: 'color 0.3s'
    },
    submitButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 10px 15px rgba(37, 99, 235, 0.2)',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: 'white',
        background: '#2563eb',
        transition: 'all 0.2s',
        fontFamily: 'inherit'
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    footer: {
        marginTop: '0.5rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: '#64748b'
    },
    footerLink: {
        fontWeight: '500',
        color: '#3b82f6',
        textDecoration: 'none',
        transition: 'color 0.3s'
    }
};

export default Login;
