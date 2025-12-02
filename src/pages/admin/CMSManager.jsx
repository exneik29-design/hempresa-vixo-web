import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

const CMSManager = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { content, updateHero, updateAbout, updateValues, updateServices, addPost, deletePost } = useContent();

    const [activeTab, setActiveTab] = useState('hero');
    const [showNewPostForm, setShowNewPostForm] = useState(false);

    const [heroForm, setHeroForm] = useState(content.hero);
    const [aboutForm, setAboutForm] = useState(content.about);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: 'Noticias',
        image: ''
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSaveHero = (e) => {
        e.preventDefault();
        updateHero(heroForm);
        alert('Sección Hero actualizada correctamente');
    };

    const handleSaveAbout = (e) => {
        e.preventDefault();
        updateAbout(aboutForm);
        alert('Sección Nosotros actualizada correctamente');
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        const post = {
            ...newPost,
            date: new Date().toISOString().split('T')[0],
            status: 'Publicado'
        };
        addPost(post);
        setNewPost({ title: '', content: '', category: 'Noticias', image: '' });
        setShowNewPostForm(false);
        alert('Publicación creada correctamente');
    };

    const handleDeletePost = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta publicación?')) {
            deletePost(id);
        }
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.brand}>
                    <i className="fa-solid fa-bolt" style={{ color: '#00f0ff' }}></i> NEXUS
                </div>
                <nav style={styles.nav}>
                    <Link to="/admin" style={styles.navLink}><i className="fa-solid fa-gauge-high"></i> Dashboard</Link>
                    <a href="#" style={styles.navLink}><i className="fa-solid fa-helmet-safety"></i> Proyectos</a>
                    <a href="#" style={styles.navLink}><i className="fa-solid fa-users"></i> RRHH</a>
                    <a href="#" style={styles.navLinkActive}><i className="fa-solid fa-newspaper"></i> CMS</a>
                </nav>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    <i className="fa-solid fa-right-from-bracket"></i> Salir
                </button>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                <header style={styles.topbar}>
                    <h2 style={{ color: '#1e293b' }}>Gestión de Contenido Web</h2>
                    <a href="/" target="_blank" style={styles.btnPreview}>
                        <i className="fa-solid fa-eye"></i> Ver Sitio Web
                    </a>
                </header>

                <div style={styles.content}>

                    {/* Tabs */}
                    <div style={styles.tabs}>
                        <button
                            onClick={() => setActiveTab('hero')}
                            style={activeTab === 'hero' ? styles.tabActive : styles.tab}
                        >
                            <i className="fa-solid fa-house"></i> Hero / Portada
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            style={activeTab === 'about' ? styles.tabActive : styles.tab}
                        >
                            <i className="fa-solid fa-building"></i> Nosotros
                        </button>
                        <button
                            onClick={() => setActiveTab('services')}
                            style={activeTab === 'services' ? styles.tabActive : styles.tab}
                        >
                            <i className="fa-solid fa-briefcase"></i> Servicios
                        </button>
                        <button
                            onClick={() => setActiveTab('values')}
                            style={activeTab === 'values' ? styles.tabActive : styles.tab}
                        >
                            <i className="fa-solid fa-star"></i> Valores
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            style={activeTab === 'posts' ? styles.tabActive : styles.tab}
                        >
                            <i className="fa-solid fa-newspaper"></i> Blog / Noticias
                        </button>
                    </div>

                    {/* Hero Section Editor */}
                    {activeTab === 'hero' && (
                        <div style={styles.formCard}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Editar Sección Hero (Portada)</h3>
                            <form onSubmit={handleSaveHero} style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Título Principal</label>
                                    <input
                                        type="text"
                                        style={styles.input}
                                        value={heroForm.title}
                                        onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                                        placeholder="NEXUS GROUP"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Subtítulo</label>
                                    <input
                                        type="text"
                                        style={styles.input}
                                        value={heroForm.subtitle}
                                        onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                                        placeholder="Ingeniería Civil y Eléctrica"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Descripción</label>
                                    <textarea
                                        style={styles.textarea}
                                        rows="4"
                                        value={heroForm.description}
                                        onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                                        placeholder="Descripción de servicios..."
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Texto del Botón</label>
                                    <input
                                        type="text"
                                        style={styles.input}
                                        value={heroForm.ctaText}
                                        onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                                        placeholder="Solicitar Cotización"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>URL de Imagen de Fondo</label>
                                    <input
                                        type="text"
                                        style={styles.input}
                                        value={heroForm.backgroundImage}
                                        onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <button type="submit" style={styles.btnSuccess}>
                                    <i className="fa-solid fa-check"></i> Guardar Cambios
                                </button>
                            </form>
                        </div>
                    )}

                    {/* About Section Editor */}
                    {activeTab === 'about' && (
                        <div style={styles.formCard}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Editar Sección "Nosotros"</h3>
                            <form onSubmit={handleSaveAbout} style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Título</label>
                                    <input
                                        type="text"
                                        style={styles.input}
                                        value={aboutForm.title}
                                        onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                                        placeholder="Nosotros"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Descripción</label>
                                    <textarea
                                        style={styles.textarea}
                                        rows="6"
                                        value={aboutForm.description}
                                        onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                                        placeholder="Historia de la empresa..."
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>URL de Imagen</label>
                                    <input
                                        type="text"
                                        style={styles.input}
                                        value={aboutForm.image}
                                        onChange={(e) => setAboutForm({ ...aboutForm, image: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <button type="submit" style={styles.btnSuccess}>
                                    <i className="fa-solid fa-check"></i> Guardar Cambios
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Services Section */}
                    {activeTab === 'services' && (
                        <div style={styles.formCard}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Servicios</h3>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                                Gestión de servicios disponible próximamente. Actualmente mostrando {content.services.length} servicios.
                            </p>
                            <div style={styles.servicesGrid}>
                                {content.services.map(service => (
                                    <div key={service.id} style={styles.serviceCard}>
                                        <i className={`fa-solid ${service.icon}`} style={{ fontSize: '2rem', color: '#ff4d00', marginBottom: '1rem' }}></i>
                                        <h4>{service.title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{service.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Values Section */}
                    {activeTab === 'values' && (
                        <div style={styles.formCard}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Valores de la Empresa</h3>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                                Gestión de valores disponible próximamente. Actualmente mostrando {content.values.length} valores.
                            </p>
                            <div style={styles.valuesGrid}>
                                {content.values.map(value => (
                                    <div key={value.id} style={styles.valueCard}>
                                        <i className={`fa-solid ${value.icon}`} style={{ fontSize: '1.5rem', color: '#ff4d00' }}></i>
                                        <h4>{value.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Posts Section */}
                    {activeTab === 'posts' && (
                        <>
                            {showNewPostForm && (
                                <div style={styles.formCard}>
                                    <h3 style={{ marginBottom: '1.5rem' }}>Nueva Publicación</h3>
                                    <form onSubmit={handleCreatePost} style={styles.form}>
                                        <div style={styles.formRow}>
                                            <div style={styles.formGroup}>
                                                <label style={styles.label}>Título</label>
                                                <input
                                                    type="text"
                                                    style={styles.input}
                                                    value={newPost.title}
                                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                                    required
                                                    placeholder="Ej: Nuevo proyecto en construcción"
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <label style={styles.label}>Categoría</label>
                                                <select
                                                    style={styles.select}
                                                    value={newPost.category}
                                                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                                >
                                                    <option value="Noticias">Noticias</option>
                                                    <option value="Proyectos">Proyectos</option>
                                                    <option value="Blog">Blog</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>URL de Imagen</label>
                                            <input
                                                type="text"
                                                style={styles.input}
                                                value={newPost.image}
                                                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Contenido</label>
                                            <textarea
                                                style={styles.textarea}
                                                rows="6"
                                                value={newPost.content}
                                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                                required
                                                placeholder="Escribe el contenido de la publicación..."
                                            />
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button type="submit" style={styles.btnSuccess}>
                                                <i className="fa-solid fa-check"></i> Publicar
                                            </button>
                                            <button type="button" onClick={() => setShowNewPostForm(false)} style={styles.btnCancel}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div style={styles.section}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={styles.sectionTitle}>Publicaciones ({content.posts.length})</h3>
                                    <button onClick={() => setShowNewPostForm(!showNewPostForm)} style={styles.btnPrimary}>
                                        <i className="fa-solid fa-plus"></i> Nueva Publicación
                                    </button>
                                </div>

                                <div style={styles.postsGrid}>
                                    {content.posts.map(post => (
                                        <div key={post.id} style={styles.postCard}>
                                            {post.image && (
                                                <div style={styles.postImage}>
                                                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                            <div style={styles.postContent}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                                    <span style={styles.postCategory}>{post.category}</span>
                                                    <span style={styles.postDate}>{post.date}</span>
                                                </div>
                                                <h4 style={styles.postTitle}>{post.title}</h4>
                                                <p style={styles.postExcerpt}>{post.content.substring(0, 120)}...</p>
                                                <div style={styles.postActions}>
                                                    <button style={styles.btnEdit}>
                                                        <i className="fa-solid fa-pen"></i> Editar
                                                    </button>
                                                    <button style={styles.btnDelete} onClick={() => handleDeletePost(post.id)}>
                                                        <i className="fa-solid fa-trash"></i> Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </main>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f1f5f9'
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#0f172a',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        color: 'white'
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '3rem',
        fontFamily: 'Oswald, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    navLink: {
        color: '#94a3b8',
        textDecoration: 'none',
        padding: '12px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.3s'
    },
    navLinkActive: {
        color: 'white',
        backgroundColor: '#1e293b',
        textDecoration: 'none',
        padding: '12px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '500'
    },
    logoutBtn: {
        marginTop: 'auto',
        background: 'transparent',
        border: '1px solid #334155',
        color: '#ef4444',
        padding: '10px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    main: {
        flex: 1,
        overflowY: 'auto'
    },
    topbar: {
        padding: '1.5rem 3rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnPreview: {
        backgroundColor: '#0f172a',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    content: {
        padding: '3rem'
    },
    tabs: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
    },
    tab: {
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        color: '#64748b',
        padding: '12px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    tabActive: {
        backgroundColor: '#0f172a',
        border: '1px solid #0f172a',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    btnPrimary: {
        backgroundColor: '#0f172a',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    formCard: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '3rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#475569'
    },
    input: {
        padding: '10px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '1rem'
    },
    select: {
        padding: '10px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '1rem',
        backgroundColor: 'white'
    },
    textarea: {
        padding: '10px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '1rem',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    btnSuccess: {
        backgroundColor: '#16a34a',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    btnCancel: {
        backgroundColor: '#e2e8f0',
        color: '#475569',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    section: {
        marginBottom: '3rem'
    },
    sectionTitle: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '1.5rem'
    },
    postsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem'
    },
    postCard: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s'
    },
    postImage: {
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        backgroundColor: '#f1f5f9'
    },
    postContent: {
        padding: '1.5rem'
    },
    postCategory: {
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#ff4d00',
        textTransform: 'uppercase',
        backgroundColor: '#fee2e2',
        padding: '4px 8px',
        borderRadius: '4px'
    },
    postDate: {
        fontSize: '0.85rem',
        color: '#64748b'
    },
    postTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '0.5rem'
    },
    postExcerpt: {
        fontSize: '0.9rem',
        color: '#64748b',
        marginBottom: '1rem',
        lineHeight: '1.5'
    },
    postActions: {
        display: 'flex',
        gap: '0.5rem'
    },
    btnEdit: {
        backgroundColor: '#e0f2fe',
        color: '#0284c7',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '0.85rem',
        cursor: 'pointer',
        fontWeight: '500'
    },
    btnDelete: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '0.85rem',
        cursor: 'pointer',
        fontWeight: '500'
    },
    servicesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem'
    },
    serviceCard: {
        backgroundColor: '#f8fafc',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
    },
    valuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem'
    },
    valueCard: {
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
    }
};

export default CMSManager;
