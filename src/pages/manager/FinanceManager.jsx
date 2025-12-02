import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';

const FinanceManager = () => {
    const { transactions, suppliers, addSupplier, purchaseOrders, createPurchaseOrder, approvePurchaseOrder } = useOperations();
    const [activeTab, setActiveTab] = useState('overview'); // overview, suppliers, orders
    const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', category: '' });
    const [newOrder, setNewOrder] = useState({ supplierId: '', items: '', total: 0 });

    // Calculations
    const totalIncome = 0; // Placeholder for now, maybe from client payments
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
    const totalSalaries = transactions.filter(t => t.type === 'salary').reduce((sum, t) => sum + Number(t.amount), 0);

    const handleAddSupplier = (e) => {
        e.preventDefault();
        addSupplier(newSupplier);
        setNewSupplier({ name: '', contact: '', category: '' });
    };

    const handleCreateOrder = (e) => {
        e.preventDefault();
        createPurchaseOrder({
            ...newOrder,
            supplierId: Number(newOrder.supplierId),
            items: newOrder.items.split(',').map(i => i.trim()), // Simple CSV parsing
            total: Number(newOrder.total)
        });
        setNewOrder({ supplierId: '', items: '', total: 0 });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gestión Financiera y Adquisiciones</h2>

            {/* TABS */}
            <div style={styles.tabs}>
                <button onClick={() => setActiveTab('overview')} style={activeTab === 'overview' ? styles.tabActive : styles.tab}>Resumen Financiero</button>
                <button onClick={() => setActiveTab('suppliers')} style={activeTab === 'suppliers' ? styles.tabActive : styles.tab}>Proveedores</button>
                <button onClick={() => setActiveTab('orders')} style={activeTab === 'orders' ? styles.tabActive : styles.tab}>Órdenes de Compra</button>
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div style={styles.content}>
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <h3>Gastos Operativos</h3>
                            <div style={styles.amount}>${totalExpenses.toLocaleString()}</div>
                        </div>
                        <div style={styles.statCard}>
                            <h3>Nómina (Sueldos)</h3>
                            <div style={styles.amount}>${totalSalaries.toLocaleString()}</div>
                        </div>
                        <div style={styles.statCard}>
                            <h3>Total Egresos</h3>
                            <div style={{ ...styles.amount, color: '#ef4444' }}>${(totalExpenses + totalSalaries).toLocaleString()}</div>
                        </div>
                    </div>

                    <h3 style={{ marginTop: '30px', color: 'white' }}>Últimas Transacciones</h3>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Fecha</th>
                                    <th style={styles.th}>Tipo</th>
                                    <th style={styles.th}>Descripción</th>
                                    <th style={styles.th}>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.slice().reverse().slice(0, 10).map(t => (
                                    <tr key={t.id}>
                                        <td style={styles.td}>{new Date(t.date).toLocaleDateString()}</td>
                                        <td style={styles.td}>
                                            <span style={t.type === 'expense' ? styles.badgeExpense : styles.badgeSalary}>
                                                {t.type === 'expense' ? 'Gasto' : 'Sueldo'}
                                            </span>
                                        </td>
                                        <td style={styles.td}>{t.description}</td>
                                        <td style={styles.td}>${Number(t.amount).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* SUPPLIERS TAB */}
            {activeTab === 'suppliers' && (
                <div style={styles.content}>
                    <div style={styles.formCard}>
                        <h4>Nuevo Proveedor</h4>
                        <form onSubmit={handleAddSupplier} style={styles.form}>
                            <input
                                type="text" placeholder="Nombre Empresa" required
                                value={newSupplier.name} onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
                                style={styles.input}
                            />
                            <input
                                type="text" placeholder="Contacto (Email/Tel)" required
                                value={newSupplier.contact} onChange={e => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                                style={styles.input}
                            />
                            <input
                                type="text" placeholder="Categoría (ej. Eléctrico)" required
                                value={newSupplier.category} onChange={e => setNewSupplier({ ...newSupplier, category: e.target.value })}
                                style={styles.input}
                            />
                            <button type="submit" style={styles.btnPrimary}>Agregar</button>
                        </form>
                    </div>

                    <div style={styles.gridList}>
                        {suppliers.map(s => (
                            <div key={s.id} style={styles.card}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{s.name}</div>
                                <div style={{ color: '#94a3b8' }}>{s.category}</div>
                                <div style={{ marginTop: '10px', fontSize: '0.9rem' }}><i className="fa-solid fa-address-book"></i> {s.contact}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
                <div style={styles.content}>
                    <div style={styles.formCard}>
                        <h4>Nueva Orden de Compra</h4>
                        <form onSubmit={handleCreateOrder} style={styles.form}>
                            <select
                                required
                                value={newOrder.supplierId}
                                onChange={e => setNewOrder({ ...newOrder, supplierId: e.target.value })}
                                style={styles.input}
                            >
                                <option value="">Seleccionar Proveedor...</option>
                                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <input
                                type="text" placeholder="Items (separados por coma)" required
                                value={newOrder.items} onChange={e => setNewOrder({ ...newOrder, items: e.target.value })}
                                style={styles.input}
                            />
                            <input
                                type="number" placeholder="Monto Total Estimado" required
                                value={newOrder.total} onChange={e => setNewOrder({ ...newOrder, total: e.target.value })}
                                style={styles.input}
                            />
                            <button type="submit" style={styles.btnPrimary}>Generar Orden</button>
                        </form>
                    </div>

                    <div style={styles.listContainer}>
                        {purchaseOrders.map(order => {
                            const supplier = suppliers.find(s => s.id === order.supplierId);
                            return (
                                <div key={order.id} style={styles.orderCard}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontWeight: 'bold', color: 'white' }}>OC #{order.id}</span>
                                        <span style={order.status === 'Aprobado' ? styles.badgeSuccess : styles.badgePending}>{order.status}</span>
                                    </div>
                                    <div style={{ color: '#cbd5e1', marginBottom: '5px' }}>Proveedor: {supplier?.name || 'Desconocido'}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Items: {Array.isArray(order.items) ? order.items.join(', ') : order.items}</div>
                                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 'bold', color: '#34d399' }}>${order.total.toLocaleString()}</span>
                                        {order.status === 'Pendiente' && (
                                            <button onClick={() => approvePurchaseOrder(order.id)} style={styles.btnApprove}>Aprobar</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', color: '#cbd5e1' },
    title: { color: 'white', marginBottom: '2rem', fontSize: '1.8rem' },
    tabs: { display: 'flex', gap: '10px', marginBottom: '2rem' },
    tab: { background: 'transparent', border: '1px solid #334155', color: '#94a3b8', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    tabActive: { background: '#3b82f6', border: '1px solid #3b82f6', color: 'white', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    content: { animation: 'fadeIn 0.3s ease' },

    // Stats
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
    statCard: { background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' },
    amount: { fontSize: '2rem', fontWeight: 'bold', color: 'white', marginTop: '10px' },

    // Forms
    formCard: { background: '#1e293b', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #334155' },
    form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' },
    input: { background: '#0f172a', border: '1px solid #334155', color: 'white', padding: '10px', borderRadius: '4px' },
    btnPrimary: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },

    // Lists
    gridList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' },

    // Table
    tableContainer: { overflowX: 'auto', background: '#1e293b', borderRadius: '8px', padding: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #334155', color: '#94a3b8' },
    td: { padding: '1rem', borderBottom: '1px solid #334155' },

    // Badges
    badgeExpense: { background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' },
    badgeSalary: { background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' },
    badgeSuccess: { background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' },
    badgePending: { background: 'rgba(234, 179, 8, 0.2)', color: '#eab308', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' },

    // Orders
    listContainer: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    orderCard: { background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' },
    btnApprove: { background: '#22c55e', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }
};

export default FinanceManager;
