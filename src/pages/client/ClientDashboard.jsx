import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOperations } from '../../context/OperationsContext';

const ClientDashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { getProjectImages } = useOperations();
    const [activeTab, setActiveTab] = useState('resumen');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Datos del proyecto (Simulando datos reales del backend)
    const project = {
        id: 1,
        code: '#4092',
        name: 'Planta Industrial Sur',
        client: 'Industrias XYZ',
        startDate: '2024-11-01',
        endDate: '2025-04-30',
        progress: 35,
        status: 'EN EJECUCIÓN',
        tasks: [
            { id: 1, name: 'Excavación y fundaciones', start: '2024-11-01', end: '2024-12-15', progress: 100, assignedTo: 'Cuadrilla A' },
            { id: 2, name: 'Estructura metálica', start: '2024-12-10', end: '2025-02-28', progress: 60, assignedTo: 'Cuadrilla B' },
            { id: 3, name: 'Instalaciones eléctricas', start: '2025-02-01', end: '2025-04-15', progress: 15, assignedTo: 'Electricistas SEC' },
            { id: 4, name: 'Terminaciones', start: '2025-03-15', end: '2025-04-30', progress: 0, assignedTo: 'Cuadrilla C' }
        ]
    };

    const projectImages = getProjectImages ? getProjectImages(project.id) : [];

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.brand}>
                    <div style={styles.logo}>D</div> DACARO
                </div>
                <nav style={styles.nav}>
                    <button
                        onClick={() => setActiveTab('resumen')}
                        style={activeTab === 'resumen' ? styles.navLinkActive : styles.navLink}
                    >
                        <i className="fa-solid fa-chart-pie"></i> Resumen
                    </button>
                    <button
                        onClick={() => setActiveTab('galeria')}
                        style={activeTab === 'galeria' ? styles.navLinkActive : styles.navLink}
                    >
                        <i className="fa-solid fa-images"></i> Galería
                    </button>
                    <button
                        onClick={() => setActiveTab('cronograma')}
                        style={activeTab === 'cronograma' ? styles.navLinkActive : styles.navLink}
                    >
                        <i className="fa-solid fa-calendar-days"></i> Cronograma
                    </button>
                </nav>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    <i className="fa-solid fa-right-from-bracket"></i> Salir
                </button>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                <header style={styles.topbar}>
                    <h2>Panel de Cliente</h2>
                    <div style={styles.userInfo}>
                        <span>{user?.name || 'Cliente Demo'}</span>
                        <div style={styles.avatar}>{user?.name?.[0] || 'C'}</div>
                    </div>
                </header>

                <div style={styles.content}>
                    {activeTab === 'resumen' && (
                        <>
                            {/* Project Header */}
                            <div style={styles.projectHeader}>
                                <div>
                                    <h4 style={styles.projectCode}>PROYECTO {project.code}</h4>
                                    <h1 style={styles.projectTitle}>{project.name}</h1>
                                </div>
                                <div style={styles.statusBadge}>
                                    <span style={styles.dot}></span> {project.status}
                                </div>
                            </div>

                            {/* KPI Cards */}
                            <div style={styles.kpiGrid}>
                                <div style={styles.kpiCard}>
                                    <div style={styles.kpiIcon}>
                                        <i className="fa-solid fa-hard-hat"></i>
                                    </div>
                                    <div>
                                        <div style={styles.kpiLabel}>Estado General</div>
                                        <div style={styles.kpiValue}>En Obra</div>
                                    </div>
                                </div>
                                <div style={styles.kpiCard}>
                                    <div style={{ ...styles.kpiIcon, background: '#dcfce7', color: '#16a34a' }}>
                                        <i className="fa-solid fa-chart-line"></i>
                                    </div>
                                    <div>
                                        <div style={styles.kpiLabel}>Avance</div>
                                        <div style={styles.kpiValue}>{project.progress}%</div>
                                    </div>
                                </div>
                                <div style={styles.kpiCard}>
                                    <div style={{ ...styles.kpiIcon, background: '#e0f2fe', color: '#0284c7' }}>
                                        <i className="fa-solid fa-calendar-check"></i>
                                    </div>
                                    <div>
                                        <div style={styles.kpiLabel}>Entrega Estimada</div>
                                        <div style={styles.kpiValue}>Abr 2025</div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Section */}
                            <div style={styles.section}>
                                <h3>Progreso del Proyecto</h3>
                                <div style={styles.progressContainer}>
                                    <div style={styles.progressBar}>
                                        <div style={{ ...styles.progressFill, width: `${project.progress}%` }}></div>
                                    </div>
                                    <span style={styles.progressText}>{project.progress}% Completado</span>
                                </div>

                                <div style={styles.milestones}>
                                    <div style={styles.milestone}>
                                        <div style={{ ...styles.milestoneIcon, background: '#22c55e' }}>✓</div>
                                        <div>
                                            <div style={styles.milestoneTitle}>Excavación y fundaciones</div>
                                            <div style={styles.milestoneDate}>Completado - Dic 2024</div>
                                        </div>
                                    </div>
                                    <div style={styles.milestone}>
                                        <div style={{ ...styles.milestoneIcon, background: '#3b82f6' }}>
                                            <i className="fa-solid fa-hammer"></i>
                                        </div>
                                        <div>
                                            <div style={styles.milestoneTitle}>Estructura metálica</div>
                                            <div style={styles.milestoneDate}>En Progreso - Feb 2025</div>
                                        </div>
                                    </div>
                                    <div style={styles.milestone}>
                                        <div style={styles.milestoneIcon}>
                                            <i className="fa-solid fa-bolt"></i>
                                        </div>
                                        <div>
                                            <div style={styles.milestoneTitle}>Instalaciones Eléctricas</div>
                                            <div style={styles.milestoneDate}>Planificado - Abr 2025</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'galeria' && (
                        <div style={styles.section}>
                            <h3>Galería de Imágenes</h3>
                            <div style={styles.imageGrid}>
                                {projectImages.length > 0 ? (
                                    projectImages.map(img => (
                                        <div key={img.id} style={styles.imageCard}>
                                            <img src={img.dataUrl} alt={img.description} style={styles.image} />
                                            <div style={styles.imageInfo}>
                                                <p>{img.description || 'Foto del proyecto'}</p>
                                                <small>{new Date(img.date).toLocaleDateString()}</small>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ color: '#94a3b8' }}>No hay imágenes disponibles aún. Las fotos aparecerán aquí cuando el equipo las suba.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'cronograma' && (
                        <div style={styles.section}>
                            <h3 style={{ marginBottom: '2rem' }}>Cronograma de Obra (Gantt)</h3>

                            <div style={styles.ganttContainer}>
                                {/* Header del Gantt */}
                                <div style={styles.ganttTaskList}>
                                    <div style={styles.ganttTaskHeader}>Tarea</div>
                                    {project.tasks.map(task => (
                                        <div key={task.id} style={styles.ganttTaskRow}>
                                            <div>
                                                <div style={styles.taskName}>{task.name}</div>
                                                <div style={styles.taskAssigned}>
                                                    <i className="fa-solid fa-user-helmet-safety"></i> {task.assignedTo}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Timeline del Gantt */}
                                <div style={styles.ganttTimeline}>
                                    <div style={styles.ganttTimelineHeader}>
                                        <div style={styles.ganttMonth}>Nov 24</div>
                                        <div style={styles.ganttMonth}>Dic 24</div>
                                        <div style={styles.ganttMonth}>Ene 25</div>
                                        <div style={styles.ganttMonth}>Feb 25</div>
                                        <div style={styles.ganttMonth}>Mar 25</div>
                                        <div style={styles.ganttMonth}>Abr 25</div>
                                    </div>
                                    {project.tasks.map(task => (
                                        <div key={task.id} style={styles.ganttTimelineRow}>
                                            {/* Barra de progreso visual */}
                                            <div style={{
                                                ...styles.ganttBar,
                                                width: '70%', // Simulado para demo
                                                marginLeft: task.id === 1 ? '0%' : task.id === 2 ? '20%' : task.id === 3 ? '50%' : '70%',
                                                background: task.progress === 100 ? '#22c55e' : task.progress > 0 ? '#3b82f6' : '#64748b'
                                            }}>
                                                <span style={styles.ganttBarLabel}>{task.progress}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.legend}>
                                <div style={styles.legendItem}>
                                    <div style={{ ...styles.legendColor, background: '#22c55e' }}></div>
                                    <span>Completado</span>
                                </div>
                                <div style={styles.legendItem}>
                                    <div style={{ ...styles.legendColor, background: '#3b82f6' }}></div>
                                    <span>En Progreso</span>
                                </div>
                                <div style={styles.legendItem}>
                                    <div style={{ ...styles.legendColor, background: '#64748b' }}></div>
                                    <span>Pendiente</span>
                                </div>
                            </div>
                        </div>
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
        backgroundColor: '#0f172a',
        fontFamily: "'Inter', sans-serif"
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#1e293b',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #334155'
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '3rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    logo: {
        width: '32px',
        height: '32px',
        background: '#3b82f6',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        color: 'white'
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1
    },
    navLink: {
        color: '#94a3b8',
        background: 'transparent',
        border: 'none',
        textAlign: 'left',
        padding: '12px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontSize: '0.95rem'
    },
    navLinkActive: {
        color: 'white',
        backgroundColor: '#334155',
        border: 'none',
        textAlign: 'left',
        padding: '12px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500'
    },
    logoutBtn: {
        marginTop: 'auto',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
        border: 'none',
        padding: '12px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontWeight: '600'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    topbar: {
        backgroundColor: '#1e293b',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #334155',
        color: 'white'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        color: 'white'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        padding: '2rem',
        overflowY: 'auto'
    },
    projectHeader: {
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        border: '1px solid #334155'
    },
    projectCode: {
        color: '#3b82f6',
        marginBottom: '5px',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    projectTitle: {
        color: 'white',
        fontSize: '2rem',
        margin: 0
    },
    statusBadge: {
        backgroundColor: '#22c55e',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '20px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    dot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'white'
    },
    kpiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    },
    kpiCard: {
        backgroundColor: '#1e293b',
        padding: '1.5rem',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid #334155'
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
        color: '#94a3b8',
        marginBottom: '5px'
    },
    kpiValue: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white'
    },
    section: {
        backgroundColor: '#1e293b',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #334155',
        color: 'white'
    },
    progressContainer: {
        marginTop: '1.5rem'
    },
    progressBar: {
        width: '100%',
        height: '20px',
        backgroundColor: '#334155',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '10px'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#22c55e',
        transition: 'width 0.3s ease'
    },
    progressText: {
        color: '#94a3b8',
        fontSize: '0.9rem'
    },
    milestones: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '2rem'
    },
    milestone: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#0f172a',
        borderRadius: '8px'
    },
    milestoneIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#334155',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    milestoneTitle: {
        fontWeight: '600',
        color: 'white'
    },
    milestoneDate: {
        fontSize: '0.85rem',
        color: '#94a3b8'
    },
    imageGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '1.5rem'
    },
    imageCard: {
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #334155'
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },
    imageInfo: {
        padding: '1rem'
    },
    ganttContainer: {
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        marginBottom: '2rem'
    },
    ganttTaskList: {
        minWidth: '250px'
    },
    ganttTaskHeader: {
        padding: '1rem',
        backgroundColor: '#334155',
        fontWeight: '600',
        color: 'white',
        borderRadius: '8px 8px 0 0'
    },
    ganttTaskRow: {
        padding: '1rem',
        borderBottom: '1px solid #334155',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center'
    },
    taskName: {
        fontWeight: '600',
        color: 'white',
        marginBottom: '4px'
    },
    taskAssigned: {
        fontSize: '0.8rem',
        color: '#94a3b8'
    },
    ganttTimeline: {
        flex: 1,
        minWidth: '600px'
    },
    ganttTimelineHeader: {
        display: 'flex',
        backgroundColor: '#334155',
        borderRadius: '8px 8px 0 0'
    },
    ganttMonth: {
        flex: 1,
        padding: '1rem',
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
        fontSize: '0.85rem'
    },
    ganttTimelineRow: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #334155',
        minHeight: '60px',
        padding: '1rem 0.5rem'
    },
    ganttBar: {
        height: '24px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '80px'
    },
    ganttBarLabel: {
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '600'
    },
    legend: {
        display: 'flex',
        gap: '2rem',
        marginTop: '1rem',
        justifyContent: 'center'
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#94a3b8',
        fontSize: '0.9rem'
    },
    legendColor: {
        width: '16px',
        height: '16px',
        borderRadius: '4px'
    }
};

export default ClientDashboard;
