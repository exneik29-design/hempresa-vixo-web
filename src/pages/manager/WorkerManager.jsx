import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';

const WorkerManager = () => {
    const { workers, addWorker, getWorkerProjects, transactions, addTransaction, updateWorkerPermissions } = useOperations();
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);

    const [newWorker, setNewWorker] = useState({ name: '', role: '', salary: '', phone: '' });
    const [paymentForm, setPaymentForm] = useState({ amount: '', description: '', date: '' });

    const handleAddWorker = (e) => {
        e.preventDefault();
        addWorker({ ...newWorker, status: 'Activo' });
        setShowAddModal(false);
        setNewWorker({ name: '', role: '', salary: '', phone: '' });
    };

    const handlePaySalary = (e) => {
        e.preventDefault();
        if (selectedWorker && paymentForm.amount) {
            // Buscar si el trabajador está en un proyecto activo
            const activeProjects = getWorkerProjects(selectedWorker.id);
            const currentProjectId = activeProjects.length > 0 ? activeProjects[0].id : null;

            addTransaction({
                type: 'salary',
                workerId: selectedWorker.id,
                projectId: currentProjectId, // Vincular al proyecto automáticamente
                category: 'Sueldo',
                amount: paymentForm.amount,
                description: paymentForm.description || `Sueldo ${new Date().toLocaleString('default', { month: 'long' })}`,
                date: paymentForm.date || new Date().toISOString().split('T')[0]
            });
            setPaymentForm({ amount: '', description: '', date: '' });
            alert(currentProjectId
                ? 'Pago registrado y cargado al proyecto activo.'
                : 'Pago registrado (sin proyecto asignado).');
        }
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h2 style={styles.title}>Recursos Humanos</h2>
                    <p style={styles.subtitle}>Gestión de personal, asignaciones y nómina.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} style={styles.btnAdd}>
                    <i className="fa-solid fa-user-plus"></i> Nuevo Trabajador
                </button>
            </header>

            <div style={styles.layout}>
                {/* LISTA DE TRABAJADORES */}
                <div style={styles.listContainer}>
                    {workers.map(worker => {
                        const activeProjects = getWorkerProjects(worker.id);
                        const currentProject = activeProjects.length > 0 ? activeProjects[0] : null;

                        return (
                            <div
                                key={worker.id}
                                style={{ ...styles.workerCard, borderColor: selectedWorker?.id === worker.id ? '#0f172a' : '#e2e8f0' }}
                                onClick={() => setSelectedWorker(worker)}
                            >
                                <div style={styles.avatar}>{worker.name.charAt(0)}</div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0 }}>{worker.name}</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{worker.role}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    {currentProject ? (
                                        <span style={styles.badgeActive}>En Faena: {currentProject.name}</span>
                                    ) : (
                                        <span style={styles.badgeIdle}>Disponible</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* DETALLE DEL TRABAJADOR */}
                <div style={styles.detailContainer}>
                    {selectedWorker ? (
                        <div>
                            <div style={styles.detailHeader}>
                                <h2>{selectedWorker.name}</h2>
                                <span style={styles.roleTag}>{selectedWorker.role}</span>
                            </div>

                            <div style={styles.infoGrid}>
                                <div>
                                    <label style={styles.label}>Teléfono</label>
                                    <div>{selectedWorker.phone}</div>
                                </div>
                                <div>
                                    <label style={styles.label}>Sueldo Base</label>
                                    <div>{formatCurrency(selectedWorker.salary)}</div>
                                </div>
                                <div>
                                    <label style={styles.label}>Usuario Sistema</label>
                                    <div>{selectedWorker.username}</div>
                                </div>
                                <div>
                                    <label style={styles.label}>Contraseña</label>
                                    <div>{selectedWorker.password}</div>
                                </div>
                            </div>

                            {/* PERMISOS */}
                            <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#334155' }}>Permisos de Acceso</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {[
                                        { id: 'view_tasks', label: 'Ver Tareas' },
                                        { id: 'view_chat', label: 'Usar Chat' },
                                        { id: 'view_finance', label: 'Ver Finanzas' },
                                        { id: 'view_inventory', label: 'Ver Inventario' },
                                        { id: 'edit_gantt', label: 'Editar Gantt' },
                                        { id: 'manage_workers', label: 'Gestionar RRHH' }
                                    ].map(perm => (
                                        <label key={perm.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', cursor: 'pointer', background: 'white', padding: '5px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedWorker.permissions?.includes(perm.id) || false}
                                                onChange={(e) => {
                                                    const currentPerms = selectedWorker.permissions || [];
                                                    let newPerms;
                                                    if (e.target.checked) {
                                                        newPerms = [...currentPerms, perm.id];
                                                    } else {
                                                        newPerms = currentPerms.filter(p => p !== perm.id);
                                                    }
                                                    updateWorkerPermissions(selectedWorker.id, newPerms);
                                                }}
                                            />
                                            {perm.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <hr style={styles.divider} />

                            <h3>Historial de Pagos</h3>
                            <div style={styles.paymentHistory}>
                                {transactions
                                    .filter(t => t.workerId === selectedWorker.id && t.type === 'salary')
                                    .map(t => (
                                        <div key={t.id} style={styles.paymentItem}>
                                            <span>{t.date}</span>
                                            <span>{t.description}</span>
                                            <strong>{formatCurrency(t.amount)}</strong>
                                        </div>
                                    ))
                                }
                                {transactions.filter(t => t.workerId === selectedWorker.id && t.type === 'salary').length === 0 && (
                                    <p style={{ color: '#999', fontSize: '0.9rem' }}>No hay pagos registrados.</p>
                                )}
                            </div>

                            <div style={styles.paymentForm}>
                                <h4>Registrar Nuevo Pago</h4>
                                <form onSubmit={handlePaySalary} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input
                                        type="date"
                                        style={styles.input}
                                        value={paymentForm.date}
                                        onChange={e => setPaymentForm({ ...paymentForm, date: e.target.value })}
                                        required
                                    />
                                    <input
                                        placeholder="Descripción (ej: Anticipo)"
                                        style={styles.input}
                                        value={paymentForm.description}
                                        onChange={e => setPaymentForm({ ...paymentForm, description: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Monto a Pagar"
                                        style={styles.input}
                                        value={paymentForm.amount}
                                        onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                                        required
                                    />
                                    <button type="submit" style={styles.btnPay}>Registrar Pago</button>
                                </form>
                            </div>

                        </div>
                    ) : (
                        <div style={styles.emptyState}>
                            <i className="fa-solid fa-users" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '20px' }}></i>
                            <p>Selecciona un trabajador para ver sus detalles y gestionar pagos.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL ADD WORKER */}
            {showAddModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3>Nuevo Trabajador</h3>
                        <form onSubmit={handleAddWorker} style={styles.form}>
                            <input placeholder="Nombre Completo" required style={styles.input} value={newWorker.name} onChange={e => setNewWorker({ ...newWorker, name: e.target.value })} />
                            <input placeholder="Cargo / Rol" required style={styles.input} value={newWorker.role} onChange={e => setNewWorker({ ...newWorker, role: e.target.value })} />
                            <input placeholder="Teléfono" style={styles.input} value={newWorker.phone} onChange={e => setNewWorker({ ...newWorker, phone: e.target.value })} />
                            <input type="number" placeholder="Sueldo Base" required style={styles.input} value={newWorker.salary} onChange={e => setNewWorker({ ...newWorker, salary: e.target.value })} />
                            <div style={styles.modalActions}>
                                <button type="button" onClick={() => setShowAddModal(false)} style={styles.btnCancel}>Cancelar</button>
                                <button type="submit" style={styles.btnSubmit}>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '1.8rem', color: '#0f172a', margin: 0 },
    subtitle: { color: '#64748b', margin: 0 },
    btnAdd: { background: '#0f172a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },

    layout: { display: 'flex', gap: '20px', flex: 1, overflow: 'hidden' },
    listContainer: { width: '40%', overflowY: 'auto', paddingRight: '10px' },
    detailContainer: { flex: 1, background: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #e2e8f0', overflowY: 'auto' },

    workerCard: { background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: 'all 0.2s' },
    avatar: { width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0f172a' },
    badgeActive: { background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem' },
    badgeIdle: { background: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem' },

    emptyState: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' },

    detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    roleTag: { background: '#e0f2fe', color: '#0369a1', padding: '5px 10px', borderRadius: '6px', fontWeight: 'bold' },
    infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
    label: { fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '5px' },
    divider: { border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' },

    paymentHistory: { marginBottom: '30px', maxHeight: '200px', overflowY: 'auto' },
    paymentItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #f1f5f9' },

    paymentForm: { background: '#f8fafc', padding: '20px', borderRadius: '8px' },
    btnPay: { background: '#22c55e', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },

    // Modal
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modal: { background: 'white', padding: '30px', borderRadius: '12px', width: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
    input: { padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' },
    modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
    btnCancel: { background: 'none', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
    btnSubmit: { background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }
};

export default WorkerManager;
