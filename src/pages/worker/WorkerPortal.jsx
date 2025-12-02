import React, { useState, useEffect, useRef } from 'react';
import { useOperations } from '../../context/OperationsContext';

const WorkerPortal = () => {
    const { workers, getWorkerTasks, updateTaskStatus, registerAttendance, getWorkerProjects, sendMessage, getProjectMessages, addProjectImage, getProjectImages } = useOperations();

    const [user, setUser] = useState(null); // Logged in worker
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('tasks'); // tasks, chat, photos
    const [locationStatus, setLocationStatus] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const chatEndRef = useRef(null);

    // --- LOGIN LOGIC ---
    const handleLogin = (e) => {
        e.preventDefault();
        const worker = workers.find(w => w.username === username && w.password === password);
        if (worker) {
            setUser(worker);
            const projects = getWorkerProjects(worker.id);
            if (projects.length > 0) setSelectedProject(projects[0]);
        } else {
            alert('Credenciales incorrectas');
        }
    };

    const handleLogout = () => {
        setUser(null);
        setUsername('');
        setPassword('');
    };

    // --- ATTENDANCE LOGIC ---
    const handleAttendance = (type) => {
        if (!navigator.geolocation) {
            alert('Geolocalización no soportada por este navegador.');
            return;
        }

        setLocationStatus('Obteniendo ubicación...');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const loc = `${position.coords.latitude}, ${position.coords.longitude}`;
                registerAttendance(user.id, type, loc);
                setLocationStatus(`Marcaje exitoso: ${type === 'check-in' ? 'Entrada' : 'Salida'} a las ${new Date().toLocaleTimeString()}`);
                setTimeout(() => setLocationStatus(''), 3000);
            },
            (error) => {
                setLocationStatus('Error al obtener ubicación');
                alert('Error: Debe permitir la ubicación para marcar asistencia.');
            }
        );
    };

    // --- CHAT LOGIC ---
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatMessage.trim() || !selectedProject) return;

        sendMessage(chatMessage, user.id, selectedProject.id);
        setChatMessage('');
    };

    const projectMessages = selectedProject ? getProjectMessages(selectedProject.id) : [];

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [projectMessages, activeTab]);


    // --- RENDER: LOGIN SCREEN ---
    if (!user) {
        return (
            <div style={styles.loginContainer}>
                <div style={styles.loginCard}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#0f172a' }}>Portal del Trabajador</h2>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={styles.label}>Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={styles.input}
                                placeholder="ej. juan.perez"
                            />
                        </div>
                        <div>
                            <label style={styles.label}>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                placeholder="••••••"
                            />
                        </div>
                        <button type="submit" style={styles.btnLogin}>Ingresar</button>
                    </form>
                    <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                        Si no tienes cuenta, contacta a tu supervisor.
                    </p>
                </div>
            </div>
        );
    }

    // --- RENDER: WORKER DASHBOARD ---
    const myTasks = getWorkerTasks(user.id);
    const myProjects = getWorkerProjects(user.id);

    return (
        <div style={styles.appContainer}>
            {/* HEADER */}
            <header style={styles.header}>
                <div>
                    <h3 style={{ margin: 0 }}>Hola, {user.name.split(' ')[0]}</h3>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{user.role}</span>
                </div>
                <button onClick={handleLogout} style={styles.btnLogout}><i className="fa-solid fa-right-from-bracket"></i></button>
            </header>

            {/* ATTENDANCE BAR */}
            <div style={styles.attendanceBar}>
                <button onClick={() => handleAttendance('check-in')} style={{ ...styles.btnAttend, background: '#22c55e' }}>
                    <i className="fa-solid fa-stopwatch"></i> Marcar Entrada
                </button>
                <button onClick={() => handleAttendance('check-out')} style={{ ...styles.btnAttend, background: '#ef4444' }}>
                    <i className="fa-solid fa-person-walking-arrow-right"></i> Marcar Salida
                </button>
            </div>
            {locationStatus && <div style={styles.statusMsg}>{locationStatus}</div>}

            {/* PROJECT SELECTOR (If multiple) */}
            {myProjects.length > 1 && (
                <div style={{ padding: '10px 20px' }}>
                    <select
                        value={selectedProject?.id || ''}
                        onChange={(e) => setSelectedProject(myProjects.find(p => p.id === Number(e.target.value)))}
                        style={styles.select}
                    >
                        {myProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <div style={styles.content}>

                {/* TABS */}
                <div style={styles.tabs}>
                    <button onClick={() => setActiveTab('tasks')} style={activeTab === 'tasks' ? styles.tabActive : styles.tab}>
                        <i className="fa-solid fa-list-check"></i> Mis Tareas
                    </button>
                    <button onClick={() => setActiveTab('chat')} style={activeTab === 'chat' ? styles.tabActive : styles.tab}>
                        <i className="fa-solid fa-comments"></i> Chat Obra
                    </button>
                    <button onClick={() => setActiveTab('photos')} style={activeTab === 'photos' ? styles.tabActive : styles.tab}>
                        <i className="fa-solid fa-camera"></i> Fotos
                    </button>
                </div>

                {/* TASKS VIEW */}
                {activeTab === 'tasks' && (
                    <div style={styles.tabContent}>
                        <h4 style={{ marginBottom: '15px', color: '#334155' }}>Tareas Pendientes</h4>
                        {myTasks.length === 0 ? (
                            <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '30px' }}>¡Todo al día! No tienes tareas pendientes.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {myTasks.map(task => (
                                    <div key={task.id} style={styles.taskCard}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{task.title}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{task.description}</div>
                                            {task.dueDate && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '5px' }}>Vence: {task.dueDate}</div>}
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('¿Marcar tarea como completada?')) updateTaskStatus(task.id, 'Completado');
                                            }}
                                            style={styles.btnCheck}
                                        >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* PHOTOS VIEW */}
                {activeTab === 'photos' && (
                    <div style={styles.tabContent}>
                        <h4 style={{ marginBottom: '15px', color: '#334155' }}>Registro Fotográfico</h4>

                        <div style={{ marginBottom: '20px', background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                            <input
                                type="file"
                                id="photoUpload"
                                accept="image/*"
                                capture="environment"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && selectedProject) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) => {
                                            addProjectImage({
                                                projectId: selectedProject.id,
                                                url: ev.target.result,
                                                uploaderId: user.id,
                                                uploaderName: user.name,
                                                description: 'Foto de avance'
                                            });
                                            alert('Foto subida correctamente');
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <label htmlFor="photoUpload" style={styles.btnUpload}>
                                <i className="fa-solid fa-camera" style={{ fontSize: '1.5rem', marginBottom: '5px' }}></i>
                                <span style={{ display: 'block' }}>Tomar / Subir Foto</span>
                            </label>
                        </div>

                        <div style={styles.photoGrid}>
                            {selectedProject && getProjectImages(selectedProject.id).map(img => (
                                <div key={img.id} style={styles.photoCard}>
                                    <img src={img.url} alt="Avance" style={styles.photoImg} />
                                    <div style={styles.photoInfo}>
                                        <span>{new Date(img.date).toLocaleDateString()}</span>
                                        <span>{img.uploaderName.split(' ')[0]}</span>
                                    </div>
                                </div>
                            ))}
                            {selectedProject && getProjectImages(selectedProject.id).length === 0 && (
                                <p style={{ color: '#94a3b8', textAlign: 'center', width: '100%' }}>No hay fotos en este proyecto.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* CHAT VIEW */}
                {activeTab === 'chat' && (
                    <div style={styles.chatContainer}>
                        <div style={styles.chatHeader}>
                            Canal: {selectedProject ? selectedProject.name : 'General'}
                        </div>
                        <div style={styles.messagesArea}>
                            {projectMessages.length === 0 && <p style={{ textAlign: 'center', color: '#cbd5e1', marginTop: '20px' }}>No hay mensajes aún.</p>}
                            {projectMessages.map(msg => {
                                const isMe = msg.senderId === user.id;
                                const sender = workers.find(w => w.id === msg.senderId);
                                return (
                                    <div key={msg.id} style={{
                                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                        marginBottom: '10px'
                                    }}>
                                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '2px', textAlign: isMe ? 'right' : 'left' }}>
                                            {isMe ? 'Tú' : sender?.name || 'Desconocido'}
                                        </div>
                                        <div style={{
                                            padding: '10px',
                                            borderRadius: '12px',
                                            background: isMe ? '#3b82f6' : '#f1f5f9',
                                            color: isMe ? 'white' : '#0f172a',
                                            borderBottomRightRadius: isMe ? '2px' : '12px',
                                            borderBottomLeftRadius: isMe ? '12px' : '2px'
                                        }}>
                                            {msg.text}
                                        </div>
                                        <div style={{ fontSize: '0.65rem', color: '#94a3b8', textAlign: 'right', marginTop: '2px' }}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={chatEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} style={styles.chatInputArea}>
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                style={styles.chatInput}
                            />
                            <button type="submit" style={styles.btnSend} disabled={!selectedProject}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    // Login Styles
    loginContainer: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px' },
    loginCard: { background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' },
    label: { display: 'block', marginBottom: '5px', color: '#475569', fontWeight: '500' },
    input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' },
    btnLogin: { width: '100%', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },

    // App Styles
    appContainer: { height: '100vh', display: 'flex', flexDirection: 'column', background: '#f1f5f9' },
    header: { background: '#0f172a', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    btnLogout: { background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' },

    attendanceBar: { background: 'white', padding: '15px', display: 'flex', gap: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    btnAttend: { flex: 1, padding: '12px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    statusMsg: { textAlign: 'center', padding: '5px', fontSize: '0.8rem', color: '#059669', background: '#d1fae5' },

    select: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white' },

    content: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    tabs: { display: 'flex', background: 'white', borderBottom: '1px solid #e2e8f0' },
    tab: { flex: 1, padding: '15px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', borderBottom: '2px solid transparent' },
    tabActive: { flex: 1, padding: '15px', border: 'none', background: 'transparent', color: '#3b82f6', cursor: 'pointer', borderBottom: '2px solid #3b82f6', fontWeight: 'bold' },

    tabContent: { flex: 1, overflowY: 'auto', padding: '20px' },

    // Task Card
    taskCard: { background: 'white', padding: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    btnCheck: { width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #cbd5e1', background: 'transparent', color: '#cbd5e1', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' },

    // Photo Styles
    btnUpload: { display: 'block', padding: '20px', border: '2px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', color: '#64748b', fontWeight: 'bold' },
    photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' },
    photoCard: { position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '100px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    photoImg: { width: '100%', height: '100%', objectFit: 'cover' },
    photoInfo: { position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.6rem', padding: '2px 5px', display: 'flex', justifyContent: 'space-between' },

    // Chat
    chatContainer: { flex: 1, display: 'flex', flexDirection: 'column', height: '100%' },
    chatHeader: { padding: '10px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' },
    messagesArea: { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column' },
    chatInputArea: { padding: '10px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' },
    chatInput: { flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none' },
    btnSend: { width: '40px', height: '40px', borderRadius: '50%', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default WorkerPortal;
