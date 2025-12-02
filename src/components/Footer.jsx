import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.grid}>
                <div>
                    <h4 style={styles.head}>DACARO</h4>
                    <p>Fusión de Potencia y Estructura.</p>
                </div>
                <div>
                    <h4 style={styles.head}>Contacto</h4>
                    <p>contacto@dacaro.cl</p>
                    <p>+56 2 2345 6789</p>
                </div>
                <div>
                    <h4 style={styles.head}>Legal</h4>
                    <p><a href="#" style={{ color: 'inherit' }}>Privacidad</a></p>
                    <p><a href="#" style={{ color: 'inherit' }}>Términos de Servicio</a></p>
                </div>
            </div>
            <div style={styles.copyright}>
                &copy; 2025 Dacaro Ingeniería y Construcción. Todos los derechos reservados.
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: '#050d1a',
        color: '#8892b0',
        padding: '4rem 5%',
        fontSize: '0.9rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem',
        maxWidth: 'var(--max-width)',
        margin: '0 auto 3rem'
    },
    head: {
        color: 'white',
        marginBottom: '1.5rem',
        fontSize: '1.1rem',
        fontFamily: 'Oswald, sans-serif'
    },
    copyright: {
        borderTop: '1px solid #1b2a41',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.8rem'
    }
};

export default Footer;
