import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'Planta Industrial Sur',
            client: 'Industrias XYZ',
            startDate: '2024-11-01',
            endDate: '2025-04-30',
            progress: 35,
            status: 'En ejecución',
            tasks: [
                { id: 1, name: 'Excavación y fundaciones', start: '2024-11-01', end: '2024-12-15', progress: 100, assignedTo: 'Cuadrilla A' },
                { id: 2, name: 'Estructura metálica', start: '2024-12-10', end: '2025-02-28', progress: 60, assignedTo: 'Cuadrilla B' },
                { id: 3, name: 'Instalaciones eléctricas', start: '2025-02-01', end: '2025-04-15', progress: 15, assignedTo: 'Electricistas SEC' },
                { id: 4, name: 'Terminaciones', start: '2025-03-15', end: '2025-04-30', progress: 0, assignedTo: 'Cuadrilla C' }
            ]
        },
        {
            id: 2,
            name: 'Remodelación Oficinas Centro',
            client: 'TechCorp SpA',
            startDate: '2024-12-01',
            endDate: '2025-02-28',
            progress: 20,
            status: 'En ejecución',
            tasks: [
                { id: 1, name: 'Demolición parcial', start: '2024-12-01', end: '2024-12-20', progress: 100, assignedTo: 'Demolición' },
                { id: 2, name: 'Tabiquería y cielos', start: '2024-12-15', end: '2025-01-31', progress: 40, assignedTo: 'Carpinteros' },
                { id: 3, name: 'Instalaciones eléctricas', start: '2025-01-10', end: '2025-02-15', progress: 10, assignedTo: 'Electricistas' },
                { id: 4, name: 'Pintura y terminaciones', start: '2025-02-01', end: '2025-02-28', progress: 0, assignedTo: 'Pintores' }
            ]
        }
    ]);

    const [selectedProject, setSelectedProject] = useState(null);
    const [showNewProjectForm, setShowNewProjectForm] = useState(false);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>Gestión de Proyectos</h1>
                    <p style={styles.subtitle}>Administra cronogramas y asignaciones de obra</p>
                </div>
                <button style={styles.btnPrimary} onClick={() => setShowNewProjectForm(true)}>
                    <i className="fa-solid fa-plus"></i> Nuevo Proyecto
                </button>
            </header>

            {/* Lista de Proyectos */}
            <div style={styles.projectsList}>
                {projects.map(project => (
                    <div
                        key={project.id}
                        style={styles.projectCard}
                        onClick={() => setSelectedProject(project)}
                    >
                        <div style={styles.projectHeader}>
                            <div>
                                <h3 style={styles.projectName}>{project.name}</h3>
                                <p style={styles.projectClient}>{project.client}</p>
                            </div>
                            <span style={styles.badgeSuccess}>{project.status}</span>
                        </div>
                        <div style={styles.projectMeta}>
                            <span><i className="fa-solid fa-calendar"></i> {project.startDate} - {project.endDate}</span>
                            <span><i className="fa-solid fa-tasks"></i> {project.tasks.length} tareas</span>
                        </div>
                        <div style={styles.progressSection}>
                            <span style={styles.progressLabel}>Avance: {project.progress}%</span>
                            <div style={styles.progressBar}>
                                <div style={{ ...styles.progressFill, width: `${project.progress}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Vista Detallada del Proyecto con Gantt */}
            {selectedProject && (
                <div style={styles.modal} onClick={() => setSelectedProject(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <div>
                                <h2>{selectedProject.name}</h2>
                                <p style={{ color: '#64748b', margin: '5px 0' }}>{selectedProject.client}</p>
                            </div>
                            <button style={styles.btnClose} onClick={() => setSelectedProject(null)}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>

                        {/* Gantt Chart Simple */}
                        <div style={styles.ganttSection}>
                            <h3 style={{ marginBottom: '1rem' }}>Cronograma de Tareas</h3>
                            <div style={styles.ganttContainer}>
                                {/* Header del Gantt */}
                                <div style={styles.ganttTaskList}>
                                    <div style={styles.ganttTaskHeader}>Tarea</div>
                                    {selectedProject.tasks.map(task => (
                                        <div key={task.id} style={styles.ganttTaskRow}>
                                            <div>
                                                <div style={styles.taskName}>{task.name}</div>
                                                <div style={styles.taskAssigned}>
                                                    <i className="fa-solid fa-user"></i> {task.assignedTo}
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
                                    {selectedProject.tasks.map(task => (
                                        <div key={task.id} style={styles.ganttTimelineRow}>
                                            {/* Barra de progreso visual - simplificada */}
                                            <div style={{
                                                ...styles.ganttBar,
                                                width: '70%',
                                                background: task.progress === 100 ? '#22c55e' : task.progress > 0 ? '#3b82f6' : '#94a3b8'
                                            }}>
                                                <span style={styles.ganttBarLabel}>{task.progress}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Información adicional */}
                            <div style={styles.projectInfo}>
                                <div style={styles.infoCard}>
                                    <i className="fa-solid fa-calendar-check" style={{ color: '#3b82f6', fontSize: '1.5rem' }}></i>
                                    <div>
                                        <div style={styles.infoLabel}>Fecha Inicio</div>
                                        <div style={styles.infoValue}>{selectedProject.startDate}</div>
                                    </div>
                                </div>
                                <div style={styles.infoCard}>
                                    <i className="fa-solid fa-calendar-days" style={{ color: '#f59e0b', fontSize: '1.5rem' }}></i>
                                    <div>
                                        <div style={styles.infoLabel}>Fecha Fin</div>
                                        <div style={styles.infoValue}>{selectedProject.endDate}</div>
                                    </div>
                                </div>
                                <div style={styles.infoCard}>
                                    <i className="fa-solid fa-chart-line" style={{ color: '#22c55e', fontSize: '1.5rem' }}></i>
                                    <div>
                                        <div style={styles.infoLabel}>Avance Total</div>
                                        <div style={styles.infoValue}>{selectedProject.progress}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    title: {
        fontSize: '2rem',
        color: '#1e293b',
        margin: 0
    },
    subtitle: {
        color: '#64748b',
        marginTop: '0.5rem'
    },
    btnPrimary: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    projectsList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
    },
    projectCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    projectHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    },
    projectName: {
        margin: 0,
        fontSize: '1.2rem',
        color: '#1e293b'
    },
    projectClient: {
        margin: '5px 0 0 0',
        color: '#64748b',
        fontSize: '0.9rem'
    },
    badgeSuccess: {
        backgroundColor: '#dcfce7',
        color: '#16a34a',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    projectMeta: {
        display: 'flex',
        gap: '1rem',
        fontSize: '0.85rem',
        color: '#64748b',
        marginBottom: '1rem'
    },
    progressSection: {
        marginTop: '1rem'
    },
    progressLabel: {
        fontSize: '0.9rem',
        color: '#475569',
        fontWeight: '600',
        display: 'block',
        marginBottom: '8px'
    },
    progressBar: {
        width: '100%',
        height: '10px',
        backgroundColor: '#e2e8f0',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3b82f6',
        transition: 'width 0.3s'
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '2rem'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e2e8f0'
    },
    btnClose: {
        backgroundColor: '#f1f5f9',
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: '#64748b'
    },
    ganttSection: {
        marginTop: '2rem'
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
        backgroundColor: '#f1f5f9',
        fontWeight: '600',
        color: '#475569',
        borderRadius: '8px 8px 0 0'
    },
    ganttTaskRow: {
        padding: '1rem',
        borderBottom: '1px solid #e2e8f0',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center'
    },
    taskName: {
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '4px'
    },
    taskAssigned: {
        fontSize: '0.8rem',
        color: '#64748b'
    },
    ganttTimeline: {
        flex: 1,
        minWidth: '600px'
    },
    ganttTimelineHeader: {
        display: 'flex',
        backgroundColor: '#f1f5f9',
        borderRadius: '8px 8px 0 0'
    },
    ganttMonth: {
        flex: 1,
        padding: '1rem',
        textAlign: 'center',
        fontWeight: '600',
        color: '#475569',
        fontSize: '0.85rem'
    },
    ganttTimelineRow: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
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
    projectInfo: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
    },
    infoCard: {
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    infoLabel: {
        fontSize: '0.8rem',
        color: '#64748b',
        marginBottom: '4px'
    },
    infoValue: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#1e293b'
    }
};

export default ProjectsManager;
