import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';

const InventoryManager = () => {
    const { inventory, addInventoryItem, updateStock, assets, addAsset } = useOperations();
    const [activeTab, setActiveTab] = useState('inventory'); // inventory, assets
    const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0, unit: '', location: '', minStock: 0 });
    const [newAsset, setNewAsset] = useState({ name: '', plate: '', status: 'Operativo' });

    const handleAddItem = (e) => {
        e.preventDefault();
        addInventoryItem(newItem);
        setNewItem({ name: '', category: '', quantity: 0, unit: '', location: '', minStock: 0 });
    };

    const handleAddAsset = (e) => {
        e.preventDefault();
        addAsset(newAsset);
        setNewAsset({ name: '', plate: '', status: 'Operativo' });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gestión de Inventario y Logística</h2>

            <div style={styles.tabs}>
                <button onClick={() => setActiveTab('inventory')} style={activeTab === 'inventory' ? styles.tabActive : styles.tab}>Bodega e Inventario</button>
                <button onClick={() => setActiveTab('assets')} style={activeTab === 'assets' ? styles.tabActive : styles.tab}>Flota y Maquinaria</button>
            </div>

            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
                <div style={styles.content}>
                    <div style={styles.formCard}>
                        <h4>Ingresar Nuevo Item</h4>
                        <form onSubmit={handleAddItem} style={styles.form}>
                            <input type="text" placeholder="Nombre Item" required value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} style={styles.input} />
                            <input type="text" placeholder="Categoría" required value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} style={styles.input} />
                            <input type="number" placeholder="Cantidad" required value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} style={styles.input} />
                            <input type="text" placeholder="Unidad (kg, un, mts)" required value={newItem.unit} onChange={e => setNewItem({ ...newItem, unit: e.target.value })} style={styles.input} />
                            <input type="text" placeholder="Ubicación (Bodega)" required value={newItem.location} onChange={e => setNewItem({ ...newItem, location: e.target.value })} style={styles.input} />
                            <input type="number" placeholder="Stock Mínimo" required value={newItem.minStock} onChange={e => setNewItem({ ...newItem, minStock: e.target.value })} style={styles.input} />
                            <button type="submit" style={styles.btnPrimary}>Guardar</button>
                        </form>
                    </div>

                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Item</th>
                                    <th style={styles.th}>Categoría</th>
                                    <th style={styles.th}>Ubicación</th>
                                    <th style={styles.th}>Stock Actual</th>
                                    <th style={styles.th}>Estado</th>
                                    <th style={styles.th}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id}>
                                        <td style={styles.td}>{item.name}</td>
                                        <td style={styles.td}>{item.category}</td>
                                        <td style={styles.td}>{item.location}</td>
                                        <td style={styles.td}><span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.quantity}</span> {item.unit}</td>
                                        <td style={styles.td}>
                                            {Number(item.quantity) <= Number(item.minStock) ? (
                                                <span style={styles.badgeCritical}>Bajo Stock</span>
                                            ) : (
                                                <span style={styles.badgeOk}>OK</span>
                                            )}
                                        </td>
                                        <td style={styles.td}>
                                            <button onClick={() => updateStock(item.id, 1, 'add')} style={styles.btnIcon} title="Agregar"><i className="fa-solid fa-plus"></i></button>
                                            <button onClick={() => updateStock(item.id, 1, 'subtract')} style={styles.btnIcon} title="Retirar"><i className="fa-solid fa-minus"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ASSETS TAB */}
            {activeTab === 'assets' && (
                <div style={styles.content}>
                    <div style={styles.formCard}>
                        <h4>Registrar Vehículo o Maquinaria</h4>
                        <form onSubmit={handleAddAsset} style={styles.form}>
                            <input type="text" placeholder="Nombre / Modelo" required value={newAsset.name} onChange={e => setNewAsset({ ...newAsset, name: e.target.value })} style={styles.input} />
                            <input type="text" placeholder="Patente / ID" required value={newAsset.plate} onChange={e => setNewAsset({ ...newAsset, plate: e.target.value })} style={styles.input} />
                            <select value={newAsset.status} onChange={e => setNewAsset({ ...newAsset, status: e.target.value })} style={styles.input}>
                                <option value="Operativo">Operativo</option>
                                <option value="En Mantención">En Mantención</option>
                                <option value="Fuera de Servicio">Fuera de Servicio</option>
                            </select>
                            <button type="submit" style={styles.btnPrimary}>Registrar</button>
                        </form>
                    </div>

                    <div style={styles.gridList}>
                        {assets.map(asset => (
                            <div key={asset.id} style={styles.card}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{asset.name}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ID: {asset.plate}</div>
                                    </div>
                                    <span style={
                                        asset.status === 'Operativo' ? styles.badgeOk :
                                            asset.status === 'En Mantención' ? styles.badgeWarning : styles.badgeCritical
                                    }>{asset.status}</span>
                                </div>
                                <div style={{ marginTop: '15px', borderTop: '1px solid #334155', paddingTop: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                                    <i className="fa-solid fa-location-dot"></i> Ubicación: {asset.assignedTo ? 'En Terreno' : 'Base Central'}
                                </div>
                            </div>
                        ))}
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

    formCard: { background: '#1e293b', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #334155' },
    form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' },
    input: { background: '#0f172a', border: '1px solid #334155', color: 'white', padding: '10px', borderRadius: '4px' },
    btnPrimary: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },

    tableContainer: { overflowX: 'auto', background: '#1e293b', borderRadius: '8px', padding: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '1px solid #334155', color: '#94a3b8' },
    td: { padding: '1rem', borderBottom: '1px solid #334155' },

    gridList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' },

    badgeOk: { background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' },
    badgeWarning: { background: 'rgba(234, 179, 8, 0.2)', color: '#eab308', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' },
    badgeCritical: { background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' },

    btnIcon: { background: '#334155', border: 'none', color: 'white', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }
};

export default InventoryManager;
