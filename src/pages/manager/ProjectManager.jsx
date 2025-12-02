import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';
import GanttChart from '../../components/GanttChart';

const ProjectManager = () => {
    const {
        projects, addProject, workers,
        getProjectWorkers, assignWorkerToProject, removeWorkerFromProject,
        tasks, addTask, updateTaskStatus,
        transactions, addTransaction, getProjectFinances
    } = useOperations();

    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // overview, team, tasks, finances
    const [showAddModal, setShowAddModal] = useState(false);

    // Formularios temporales
    const [newProject, setNewProject] = useState({ name: '', location: '', budget: '', startDate: '' });
    const [assignForm, setAssignForm] = useState({ workerId: '', role: '' });
    const [taskForm, setTaskForm] = useState({
        title: '',
        phase: '',
        safetyRequirement: '',
        floor: '',
        workerId: '',
        startDate: '',
        endDate: '',
        workDays: '',
        milestone: '',
        description: ''
    });
    const [expenseForm, setExpenseForm] = useState({ description: '', amount: '', category: 'Materiales', date: '' });

    const handleAddProject = (e) => {
        e.preventDefault();
        addProject({ ...newProject, status: 'Planificación' });
        setShowAddModal(false);
        setNewProject({ name: '', location: '', budget: '', startDate: '' });
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    // VISTA DETALLE DE PROYECTO
    if (selectedProject) {
        const projectWorkers = getProjectWorkers(selectedProject.id);
        const projectTasks = tasks.filter(t => t.projectId === selectedProject.id);
        const { expenses, transactions: projectTrans } = getProjectFinances(selectedProject.id);

        return (
            <div style={styles.container}>
                <button onClick={() => setSelectedProject(null)} style={styles.backBtn}>
                    <i className="fa-solid fa-arrow-left"></i> Volver a Proyectos
                </button>

                <header style={styles.header}>
                    <div>
                        <h1 style={styles.title}>{selectedProject.name}</h1>
                        <p style={styles.subtitle}><i className="fa-solid fa-location-dot"></i> {selectedProject.location} | <span style={styles.badge}>{selectedProject.status}</span></p>
                    </div>
                    <div style={styles.statsRow}>
                        <div style={styles.statCard}>
                            <span>Presupuesto</span>
                            <strong>{formatCurrency(selectedProject.budget)}</strong>
                        </div>
                        <div style={styles.statCard}>
                            <span>Gastos</span>
                            <strong style={{ color: '#ef4444' }}>{formatCurrency(expenses)}</strong>
                        </div>
                    </div>
                </header>

                <div style={styles.tabs}>
                    <button style={activeTab === 'overview' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('overview')}>Resumen</button>
                    <button style={activeTab === 'team' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('team')}>Equipo ({projectWorkers.length})</button>
                    <button style={activeTab === 'tasks' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('tasks')}>Tareas ({projectTasks.length})</button>
                    <button style={activeTab === 'gantt' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('gantt')}>Cronograma</button>
                    <button style={activeTab === 'finances' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('finances')}>Finanzas</button>
                </div>

                <div style={styles.contentArea}>
                    {/* TEAM TAB */}
                    {activeTab === 'team' && (
                        <div>
                            <div style={styles.sectionHeader}>
                                <h3>Trabajadores en Faena</h3>
                                <div style={styles.inlineForm}>
                                    <select
                                        style={styles.select}
                                        value={assignForm.workerId}
                                        onChange={e => setAssignForm({ ...assignForm, workerId: e.target.value })}
                                    >
                                        <option value="">Seleccionar Trabajador...</option>
                                        {workers.map(w => (
                                            <option key={w.id} value={w.id}>{w.name} - {w.role}</option>
                                        ))}
                                    </select>
                                    <input
                                        style={styles.inputSmall}
                                        placeholder="Cargo en Obra"
                                        value={assignForm.role}
                                        onChange={e => setAssignForm({ ...assignForm, role: e.target.value })}
                                    />
                                    <button
                                        style={styles.btnAddSmall}
                                        onClick={() => {
                                            if (assignForm.workerId && assignForm.role) {
                                                assignWorkerToProject(selectedProject.id, assignForm.workerId, assignForm.role);
                                                setAssignForm({ workerId: '', role: '' });
                                            }
                                        }}
                                    >Asignar</button>
                                </div>
                            </div>
                            <div style={styles.gridList}>
                                {projectWorkers.map(w => (
                                    <div key={w.assignmentId} style={styles.workerCard}>
                                        <div style={styles.workerAvatar}>{w.name.charAt(0)}</div>
                                        <div>
                                            <strong>{w.name}</strong>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{w.projectRole}</div>
                                        </div>
                                        <button onClick={() => removeWorkerFromProject(w.assignmentId)} style={styles.btnIcon}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TASKS TAB */}
                    {activeTab === 'tasks' && (
                        <div>
                            <div style={styles.sectionHeader}>
                                <h3>Tareas del Proyecto</h3>
                            </div>

                            {/* FORMULARIO DE NUEVA TAREA */}
                            <div style={styles.taskFormContainer}>
                                <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Nueva Tarea</h4>
                                <div style={styles.formGrid}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Tarea General *</label>
                                        <input
                                            style={styles.input}
                                            placeholder="Ej: Instalación de cimientos"
                                            value={taskForm.title}
                                            onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Fase del Proyecto *</label>
                                        <select
                                            style={styles.select}
                                            value={taskForm.phase || ''}
                                            onChange={e => setTaskForm({ ...taskForm, phase: e.target.value })}
                                        >
                                            <option value="">Seleccionar fase...</option>
                                            <option value="Demolición">Demolición</option>
                                            <option value="Obra Gruesa">Obra Gruesa</option>
                                            <option value="Instalaciones">Instalaciones</option>
                                            <option value="Acabados">Acabados</option>
                                            <option value="Inspección">Inspección</option>
                                        </select>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Piso *</label>
                                        <input
                                            style={styles.input}
                                            placeholder="Ej: Piso 1, Subterráneo, Todos"
                                            value={taskForm.floor || ''}
                                            onChange={e => setTaskForm({ ...taskForm, floor: e.target.value })}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Asignar a</label>
                                        <select
                                            style={styles.select}
                                            value={taskForm.workerId}
                                            onChange={e => setTaskForm({ ...taskForm, workerId: e.target.value })}
                                        >
                                            <option value="">Sin asignar</option>
                                            {projectWorkers.map(w => (
                                                <option key={w.id} value={w.id}>{w.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Fecha de Inicio *</label>
                                        <input
                                            type="date"
                                            style={styles.input}
                                            value={taskForm.startDate || ''}
                                            onChange={e => setTaskForm({ ...taskForm, startDate: e.target.value })}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Fecha de Término *</label>
                                        <input
                                            type="date"
                                            style={styles.input}
                                            value={taskForm.endDate || ''}
                                            onChange={e => setTaskForm({ ...taskForm, endDate: e.target.value })}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Duración (Días Hábiles) *</label>
                                        <input
                                            type="number"
                                            style={styles.input}
                                            placeholder="Ej: 10"
                                            min="1"
                                            value={taskForm.workDays || ''}
                                            onChange={e => setTaskForm({ ...taskForm, workDays: e.target.value })}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Hito / Observaciones</label>
                                        <input
                                            style={styles.input}
                                            placeholder="Ej: Inicio de obra, Entrega parcial"
                                            value={taskForm.milestone || ''}
                                            onChange={e => setTaskForm({ ...taskForm, milestone: e.target.value })}
                                        />
                                    </div>

                                    <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                                        <label style={styles.label}>Descripción del Trabajo *</label>
                                        <textarea
                                            style={{ ...styles.input, minHeight: '60px', resize: 'vertical' }}
                                            placeholder="Describe detalladamente qué se realizará en esta tarea..."
                                            value={taskForm.description || ''}
                                            onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                                        />
                                    </div>

                                    <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                                        <label style={styles.label}>Requisitos de Seguridad Clave *</label>
                                        <textarea
                                            style={{ ...styles.input, minHeight: '60px', resize: 'vertical' }}
                                            placeholder="Ej: Uso obligatorio de casco, guantes y botas de seguridad. Señalización de área de trabajo"
                                            value={taskForm.safetyRequirement || ''}
                                            onChange={e => setTaskForm({ ...taskForm, safetyRequirement: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    style={styles.btnPrimary}
                                    onClick={() => {
                                        if (taskForm.title && taskForm.phase && taskForm.floor && taskForm.startDate &&
                                            taskForm.endDate && taskForm.workDays && taskForm.description && taskForm.safetyRequirement) {
                                            addTask({
                                                projectId: selectedProject.id,
                                                title: taskForm.title,
                                                phase: taskForm.phase,
                                                safetyRequirement: taskForm.safetyRequirement,
                                                floor: taskForm.floor,
                                                description: taskForm.description,
                                                workerId: taskForm.workerId,
                                                startDate: taskForm.startDate,
                                                endDate: taskForm.endDate,
                                                workDays: parseInt(taskForm.workDays),
                                                milestone: taskForm.milestone || '',
                                                status: 'Pendiente'
                                            });
                                            setTaskForm({
                                                title: '',
                                                phase: '',
                                                safetyRequirement: '',
                                                floor: '',
                                                workerId: '',
                                                startDate: '',
                                                endDate: '',
                                                workDays: '',
                                                milestone: '',
                                                description: ''
                                            });
                                        } else {
                                            alert('Por favor completa todos los campos obligatorios (*)');
                                        }
                                    }}
                                >
                                    <i className="fa-solid fa-plus"></i> Crear Tarea
                                </button>
                            </div>

                            {/* LISTA DE TAREAS */}
                            <div style={{ marginTop: '2rem' }}>
                                <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Tareas Existentes ({projectTasks.length})</h4>
                                {projectTasks.length === 0 ? (
                                    <div style={styles.emptyState}>
                                        <i className="fa-solid fa-tasks" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                                        <p>No hay tareas creadas para este proyecto</p>
                                    </div>
                                ) : (
                                    <div style={styles.taskGrid}>
                                        {projectTasks.map(t => (
                                            <div key={t.id} style={styles.taskCard}>
                                                <div style={styles.taskCardHeader}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={t.status === 'Completado'}
                                                            onChange={(e) => updateTaskStatus(t.id, e.target.checked ? 'Completado' : 'Pendiente')}
                                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                        />
                                                        <h4 style={{
                                                            margin: 0,
                                                            textDecoration: t.status === 'Completado' ? 'line-through' : 'none',
                                                            color: t.status === 'Completado' ? '#94a3b8' : '#1e293b'
                                                        }}>
                                                            {t.title}
                                                        </h4>
                                                    </div>
                                                    <span style={{
                                                        ...styles.statusBadge,
                                                        backgroundColor:
                                                            t.status === 'Completado' ? '#22c55e20' :
                                                                t.status === 'En Progreso' ? '#3b82f620' : '#94a3b820',
                                                        color:
                                                            t.status === 'Completado' ? '#22c55e' :
                                                                t.status === 'En Progreso' ? '#3b82f6' : '#94a3b8'
                                                    }}>
                                                        {t.status}
                                                    </span>
                                                </div>

                                                {/* Fase y Piso */}
                                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                                                    {t.phase && (
                                                        <span style={styles.phaseBadge}>
                                                            <i className="fa-solid fa-layer-group" style={{ fontSize: '0.7rem' }}></i>
                                                            {' '}{t.phase}
                                                        </span>
                                                    )}
                                                    {t.floor && (
                                                        <span style={styles.floorBadge}>
                                                            <i className="fa-solid fa-building" style={{ fontSize: '0.7rem' }}></i>
                                                            {' '}{t.floor}
                                                        </span>
                                                    )}
                                                    {t.milestone && (
                                                        <span style={styles.milestoneBadge}>
                                                            <i className="fa-solid fa-flag" style={{ fontSize: '0.7rem' }}></i>
                                                            {' '}{t.milestone}
                                                        </span>
                                                    )}
                                                </div>

                                                {t.description && (
                                                    <p style={styles.taskDescription}>{t.description}</p>
                                                )}

                                                {/* Requisitos de Seguridad */}
                                                {t.safetyRequirement && (
                                                    <div style={styles.safetyBox}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                            <i className="fa-solid fa-shield-halved" style={{ color: '#f59e0b' }}></i>
                                                            <strong style={{ fontSize: '0.8rem', color: '#f59e0b' }}>Seguridad:</strong>
                                                        </div>
                                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4' }}>
                                                            {t.safetyRequirement}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Metadata */}
                                                <div style={styles.taskMeta}>
                                                    <div style={styles.taskMetaItem}>
                                                        <i className="fa-solid fa-calendar-day" style={{ color: '#64748b' }}></i>
                                                        <span>{new Date(t.startDate).toLocaleDateString('es-ES')}</span>
                                                    </div>
                                                    <div style={styles.taskMetaItem}>
                                                        <i className="fa-solid fa-calendar-check" style={{ color: '#64748b' }}></i>
                                                        <span>{new Date(t.endDate).toLocaleDateString('es-ES')}</span>
                                                    </div>
                                                    {t.workDays && (
                                                        <div style={styles.taskMetaItem}>
                                                            <i className="fa-solid fa-clock" style={{ color: '#64748b' }}></i>
                                                            <span>{t.workDays} días hábiles</span>
                                                        </div>
                                                    )}
                                                    <div style={styles.taskMetaItem}>
                                                        <i className="fa-solid fa-user" style={{ color: '#64748b' }}></i>
                                                        <span>{t.workerId ? workers.find(w => w.id === Number(t.workerId))?.name : 'Sin Asignar'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* GANTT CHART TAB */}
                    {activeTab === 'gantt' && (
                        <div>
                            <div style={styles.sectionHeader}>
                                <h3>Diagrama de Gantt - Cronograma del Proyecto</h3>
                            </div>
                            <GanttChart tasks={projectTasks} />
                        </div>
                    )}

                    {/* FINANCES TAB */}
                    {activeTab === 'finances' && (
                        <div>
                            <div style={styles.sectionHeader}>
                                <h3>Registro de Gastos</h3>
                                <div style={styles.inlineForm}>
                                    <input style={styles.inputSmall} placeholder="Descripción" value={expenseForm.description} onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })} />
                                    <input type="number" style={{ ...styles.inputSmall, width: '100px' }} placeholder="Monto" value={expenseForm.amount} onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })} />
                                    <button
                                        style={styles.btnAddSmall}
                                        onClick={() => {
                                            if (expenseForm.amount && expenseForm.description) {
                                                addTransaction({
                                                    type: 'expense',
                                                    projectId: selectedProject.id,
                                                    category: 'Materiales',
                                                    amount: expenseForm.amount,
                                                    description: expenseForm.description,
                                                    date: new Date().toISOString().split('T')[0]
                                                });
                                                setExpenseForm({ description: '', amount: '', category: 'Materiales', date: '' });
                                            }
                                        }}
                                    >Registrar</button>
                                </div>
                            </div>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Descripción</th>
                                        <th>Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectTrans.map(t => (
                                        <tr key={t.id}>
                                            <td>{t.date}</td>
                                            <td>{t.description}</td>
                                            <td style={{ color: t.type === 'expense' ? 'red' : 'green' }}>{t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div >
        );
    }

    // VISTA LISTA DE PROYECTOS
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h2 style={styles.title}>Gestión de Faenas</h2>
                    <p style={styles.subtitle}>Administra tus obras, asigna personal y controla gastos.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} style={styles.btnAdd}>
                    <i className="fa-solid fa-plus"></i> Nueva Faena
                </button>
            </header>

            <div style={styles.grid}>
                {projects.map(project => (
                    <div key={project.id} style={styles.card} onClick={() => setSelectedProject(project)}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>{project.name}</h3>
                            <span style={styles.statusBadge}>{project.status}</span>
                        </div>
                        <p style={styles.cardText}><i className="fa-solid fa-location-dot"></i> {project.location}</p>
                        <div style={styles.cardFooter}>
                            <span>Presupuesto: {formatCurrency(project.budget)}</span>
                            <button style={styles.btnLink}>Gestionar &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL ADD PROJECT */}
            {showAddModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3>Nueva Faena</h3>
                        <form onSubmit={handleAddProject} style={styles.form}>
                            <input placeholder="Nombre del Proyecto" required style={styles.input} value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} />
                            <input placeholder="Ubicación" required style={styles.input} value={newProject.location} onChange={e => setNewProject({ ...newProject, location: e.target.value })} />
                            <input type="number" placeholder="Presupuesto Inicial" required style={styles.input} value={newProject.budget} onChange={e => setNewProject({ ...newProject, budget: e.target.value })} />
                            <div style={styles.modalActions}>
                                <button type="button" onClick={() => setShowAddModal(false)} style={styles.btnCancel}>Cancelar</button>
                                <button type="submit" style={styles.btnSubmit}>Crear</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px', height: '100%', overflowY: 'auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    title: { fontSize: '1.8rem', color: '#0f172a', margin: 0 },
    subtitle: { color: '#64748b', margin: 0 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'transform 0.2s' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
    cardTitle: { margin: 0, fontSize: '1.1rem' },
    statusBadge: { background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' },
    cardText: { color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' },
    cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: '#0f172a' },
    btnAdd: { background: '#0f172a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },

    // Detail View Styles
    backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' },
    statsRow: { display: 'flex', gap: '20px' },
    statCard: { background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
    tabs: { display: 'flex', gap: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' },
    tab: { padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' },
    tabActive: { padding: '10px 20px', background: 'none', borderBottom: '2px solid #0f172a', cursor: 'pointer', color: '#0f172a', fontWeight: 'bold' },
    contentArea: { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    inlineForm: { display: 'flex', gap: '10px' },
    inputSmall: { padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' },
    select: { padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' },
    btnAddSmall: { background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },

    // Task Form Styles
    taskFormContainer: {
        background: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        marginBottom: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#475569'
    },
    input: {
        padding: '0.625rem',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        fontSize: '0.875rem'
    },
    btnPrimary: {
        background: '#0f172a',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: 'center'
    },

    // Task Grid and Cards
    taskGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1rem'
    },
    taskCard: {
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1rem',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer'
    },
    taskCardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem'
    },
    taskDescription: {
        fontSize: '0.875rem',
        color: '#64748b',
        lineHeight: '1.5',
        marginBottom: '0.75rem'
    },
    taskMeta: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        fontSize: '0.8rem',
        color: '#64748b'
    },
    taskMetaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem'
    },
    phaseBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.625rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: '#dbeafe',
        color: '#1e40af'
    },
    floorBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.625rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: '#e0e7ff',
        color: '#4338ca'
    },
    milestoneBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.625rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: '#fef3c7',
        color: '#92400e'
    },
    safetyBox: {
        backgroundColor: '#fef3c7',
        border: '1px solid #fcd34d',
        borderRadius: '6px',
        padding: '0.75rem',
        marginTop: '0.75rem',
        marginBottom: '0.75rem'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        color: '#94a3b8',
        textAlign: 'center'
    },

    // Lists
    gridList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' },
    workerCard: { border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' },
    workerAvatar: { width: '30px', height: '30px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
    btnIcon: { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: 'auto' },
    taskList: { listStyle: 'none', padding: 0 },
    taskItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #f1f5f9' },
    tag: { background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' },
    table: { width: '100%', borderCollapse: 'collapse' },

    // Modal
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modal: { background: 'white', padding: '30px', borderRadius: '12px', width: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
    modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
    btnCancel: { background: 'none', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
    btnSubmit: { background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }
};

export default ProjectManager;
