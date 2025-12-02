import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';
import { useCompany } from '../../context/CompanyContext';

const BudgetManager = () => {
    const { budgets, saveBudget, approveBudgetToProject } = useOperations();
    const { companyData } = useCompany();
    const [view, setView] = useState('list');
    const [currentBudget, setCurrentBudget] = useState(null);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    const calculateTotal = (items, includeIVA) => {
        const subtotal = items.reduce((sum, item) => sum + Number(item.total || 0), 0);
        const iva = includeIVA ? subtotal * 0.19 : 0;
        return subtotal + iva;
    };

    const handleNewBudget = () => {
        setCurrentBudget({
            id: null,
            projectName: '',
            clientName: '',
            clientRut: '',
            clientEmail: '',
            status: 'Borrador',
            includeIVA: true,
            description: '',
            specifications: [{ title: '', text: '', image: null }],
            procedures: [{ step: '1', text: '', image: null }],
            items: [{ qty: 1, unit: 'Glb', description: '', unitPrice: 0, total: 0 }],
            paymentTerms: '50% al inicio, 50% contra entrega',
            deliveryTime: '15 días hábiles',
            validity: '30 días',
            notes: ''
        });
        setView('edit');
    };

    const handleEditBudget = (budget) => {
        setCurrentBudget({
            ...budget,
            specifications: budget.specifications || [{ title: '', text: '', image: null }],
            procedures: budget.procedures || [{ step: '1', text: '', image: null }]
        });
        setView('edit');
    };

    const handleCreateAdditional = (budget) => {
        setCurrentBudget({
            id: null,
            projectName: budget.projectName + ' - ADICIONAL',
            clientName: budget.clientName,
            clientRut: budget.clientRut,
            clientEmail: budget.clientEmail,
            status: 'Borrador',
            includeIVA: budget.includeIVA,
            relatedTo: budget.id,
            description: '',
            specifications: [{ title: '', text: '', image: null }],
            procedures: [{ step: '1', text: '', image: null }],
            items: [{ qty: 1, unit: 'Glb', description: '', unitPrice: 0, total: 0 }],
            paymentTerms: budget.paymentTerms,
            deliveryTime: budget.deliveryTime,
            validity: budget.validity,
            notes: ''
        });
        setView('edit');
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...currentBudget.items];
        newItems[index][field] = value;

        if (field === 'qty' || field === 'unitPrice') {
            const qty = Number(newItems[index].qty || 0);
            const price = Number(newItems[index].unitPrice || 0);
            newItems[index].total = qty * price;
        }

        setCurrentBudget({ ...currentBudget, items: newItems });
    };

    const addItem = () => {
        setCurrentBudget({
            ...currentBudget,
            items: [...currentBudget.items, { qty: 1, unit: 'Glb', description: '', unitPrice: 0, total: 0 }]
        });
    };

    const removeItem = (index) => {
        if (currentBudget.items.length > 1) {
            setCurrentBudget({
                ...currentBudget,
                items: currentBudget.items.filter((_, i) => i !== index)
            });
        }
    };

    const addSpecification = () => {
        setCurrentBudget({
            ...currentBudget,
            specifications: [...currentBudget.specifications, { title: '', text: '', image: null }]
        });
    };

    const removeSpecification = (index) => {
        setCurrentBudget({
            ...currentBudget,
            specifications: currentBudget.specifications.filter((_, i) => i !== index)
        });
    };

    const handleSpecificationChange = (index, field, value) => {
        const newSpecs = [...currentBudget.specifications];
        newSpecs[index][field] = value;
        setCurrentBudget({ ...currentBudget, specifications: newSpecs });
    };

    const addProcedure = () => {
        const nextStep = (currentBudget.procedures.length + 1).toString();
        setCurrentBudget({
            ...currentBudget,
            procedures: [...currentBudget.procedures, { step: nextStep, text: '', image: null }]
        });
    };

    const removeProcedure = (index) => {
        setCurrentBudget({
            ...currentBudget,
            procedures: currentBudget.procedures.filter((_, i) => i !== index)
        });
    };

    const handleProcedureChange = (index, field, value) => {
        const newProcs = [...currentBudget.procedures];
        newProcs[index][field] = value;
        setCurrentBudget({ ...currentBudget, procedures: newProcs });
    };

    const handleImageUpload = (type, index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'specification') {
                    const newSpecs = [...currentBudget.specifications];
                    newSpecs[index].image = reader.result;
                    setCurrentBudget({ ...currentBudget, specifications: newSpecs });
                } else if (type === 'procedure') {
                    const newProcs = [...currentBudget.procedures];
                    newProcs[index].image = reader.result;
                    setCurrentBudget({ ...currentBudget, procedures: newProcs });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        saveBudget(currentBudget);
        setView('list');
        setCurrentBudget(null);
    };

    // VISTA DE EDICIÓN
    if (view === 'edit' && currentBudget) {
        return (
            <div style={styles.container}>
                <div style={styles.editorHeader}>
                    <button onClick={() => setView('list')} style={styles.backBtn}>
                        ← Volver
                    </button>
                    <h2>{currentBudget.id ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setView('preview')} style={styles.previewBtn}>
                            👁️ Vista Previa
                        </button>
                        <button onClick={handleSave} style={styles.saveBtn}>
                            💾 Guardar
                        </button>
                    </div>
                </div>

                <div style={styles.editorContent}>
                    {/* INFORMACIÓN DEL CLIENTE */}
                    <div style={styles.section}>
                        <h3>📋 Información del Cliente</h3>
                        <input
                            style={styles.input}
                            placeholder="Nombre del Proyecto"
                            value={currentBudget.projectName}
                            onChange={e => setCurrentBudget({ ...currentBudget, projectName: e.target.value })}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <input
                                style={styles.input}
                                placeholder="Nombre del Cliente"
                                value={currentBudget.clientName}
                                onChange={e => setCurrentBudget({ ...currentBudget, clientName: e.target.value })}
                            />
                            <input
                                style={styles.input}
                                placeholder="RUT Cliente"
                                value={currentBudget.clientRut}
                                onChange={e => setCurrentBudget({ ...currentBudget, clientRut: e.target.value })}
                            />
                            <input
                                style={styles.input}
                                placeholder="Email Cliente"
                                type="email"
                                value={currentBudget.clientEmail}
                                onChange={e => setCurrentBudget({ ...currentBudget, clientEmail: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* DESCRIPCIÓN DEL PROYECTO */}
                    <div style={styles.section}>
                        <h3>📝 Descripción del Proyecto</h3>
                        <textarea
                            style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }}
                            placeholder="Descripción general del proyecto..."
                            value={currentBudget.description}
                            onChange={e => setCurrentBudget({ ...currentBudget, description: e.target.value })}
                        />
                    </div>

                    {/* ESPECIFICACIONES TÉCNICAS */}
                    <div style={styles.section}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>🔧 Especificaciones Técnicas</h3>
                            <button onClick={addSpecification} style={styles.addBtn}>
                                + Añadir Especificación
                            </button>
                        </div>
                        {currentBudget.specifications.map((spec, idx) => (
                            <div key={idx} style={styles.itemBox}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        style={{ ...styles.input, flex: 1 }}
                                        placeholder="Título (ej: Material, Dimensiones)"
                                        value={spec.title}
                                        onChange={e => handleSpecificationChange(idx, 'title', e.target.value)}
                                    />
                                    <button onClick={() => removeSpecification(idx)} style={styles.deleteBtn}>
                                        🗑️
                                    </button>
                                </div>
                                <textarea
                                    style={{ ...styles.input, minHeight: '60px' }}
                                    placeholder="Descripción detallada..."
                                    value={spec.text}
                                    onChange={e => handleSpecificationChange(idx, 'text', e.target.value)}
                                />
                                <div style={{ marginTop: '0.5rem' }}>
                                    <label style={styles.fileLabel}>
                                        📷 Cargar Imagen
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={e => handleImageUpload('specification', idx, e)}
                                        />
                                    </label>
                                    {spec.image && (
                                        <img src={spec.image} alt="Preview" style={styles.imagePreview} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PROCEDIMIENTO DE TRABAJO */}
                    <div style={styles.section}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>📋 Procedimiento de Trabajo</h3>
                            <button onClick={addProcedure} style={styles.addBtn}>
                                + Añadir Paso
                            </button>
                        </div>
                        {currentBudget.procedures.map((proc, idx) => (
                            <div key={idx} style={styles.itemBox}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        style={{ ...styles.input, width: '80px' }}
                                        placeholder="Paso"
                                        value={proc.step}
                                        onChange={e => handleProcedureChange(idx, 'step', e.target.value)}
                                    />
                                    <textarea
                                        style={{ ...styles.input, flex: 1, minHeight: '60px' }}
                                        placeholder="Descripción del paso..."
                                        value={proc.text}
                                        onChange={e => handleProcedureChange(idx, 'text', e.target.value)}
                                    />
                                    <button onClick={() => removeProcedure(idx)} style={styles.deleteBtn}>
                                        🗑️
                                    </button>
                                </div>
                                <div>
                                    <label style={styles.fileLabel}>
                                        📷 Cargar Imagen
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={e => handleImageUpload('procedure', idx, e)}
                                        />
                                    </label>
                                    {proc.image && (
                                        <img src={proc.image} alt="Preview" style={styles.imagePreview} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ÍTEMS DEL PRESUPUESTO */}
                    <div style={styles.section}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>💰 Ítems del Presupuesto</h3>
                            <button onClick={addItem} style={styles.addBtn}>
                                + Añadir Ítem
                            </button>
                        </div>
                        {currentBudget.items.map((item, idx) => (
                            <div key={idx} style={styles.itemRow}>
                                <input
                                    type="number"
                                    style={{ ...styles.inputSmall, width: '60px' }}
                                    placeholder="Cant"
                                    value={item.qty}
                                    onChange={e => handleItemChange(idx, 'qty', e.target.value)}
                                />
                                <input
                                    style={{ ...styles.inputSmall, width: '60px' }}
                                    placeholder="Un"
                                    value={item.unit}
                                    onChange={e => handleItemChange(idx, 'unit', e.target.value)}
                                />
                                <input
                                    style={{ ...styles.inputSmall, flex: 1 }}
                                    placeholder="Descripción del ítem"
                                    value={item.description}
                                    onChange={e => handleItemChange(idx, 'description', e.target.value)}
                                />
                                <input
                                    type="number"
                                    style={{ ...styles.inputSmall, width: '120px' }}
                                    placeholder="Precio Unit."
                                    value={item.unitPrice}
                                    onChange={e => handleItemChange(idx, 'unitPrice', e.target.value)}
                                />
                                <div style={{ width: '120px', fontWeight: 'bold', textAlign: 'right' }}>
                                    {formatCurrency(item.total)}
                                </div>
                                <button
                                    onClick={() => removeItem(idx)}
                                    style={styles.deleteBtn}
                                    disabled={currentBudget.items.length === 1}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}

                        <div style={styles.totalsBox}>
                            <div style={styles.totalLine}>
                                Subtotal: <strong>{formatCurrency(currentBudget.items.reduce((sum, i) => sum + Number(i.total || 0), 0))}</strong>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="checkbox"
                                        checked={currentBudget.includeIVA}
                                        onChange={e => setCurrentBudget({ ...currentBudget, includeIVA: e.target.checked })}
                                    />
                                    IVA (19%):
                                </label>
                                <strong>{currentBudget.includeIVA ? formatCurrency(currentBudget.items.reduce((sum, i) => sum + Number(i.total || 0), 0) * 0.19) : '$0'}</strong>
                            </div>
                            <div style={{ ...styles.totalLine, fontSize: '1.2rem', color: '#0f172a', borderTop: '2px solid #e2e8f0', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                TOTAL: <strong>{formatCurrency(calculateTotal(currentBudget.items, currentBudget.includeIVA))}</strong>
                            </div>
                        </div>
                    </div>

                    {/* CONDICIONES COMERCIALES */}
                    <div style={styles.section}>
                        <h3>📄 Condiciones Comerciales</h3>
                        <label style={styles.label}>Forma de Pago</label>
                        <input
                            style={styles.input}
                            value={currentBudget.paymentTerms}
                            onChange={e => setCurrentBudget({ ...currentBudget, paymentTerms: e.target.value })}
                        />
                        <label style={styles.label}>Plazo de Entrega</label>
                        <input
                            style={styles.input}
                            value={currentBudget.deliveryTime}
                            onChange={e => setCurrentBudget({ ...currentBudget, deliveryTime: e.target.value })}
                        />
                        <label style={styles.label}>Validez de la Oferta</label>
                        <input
                            style={styles.input}
                            value={currentBudget.validity}
                            onChange={e => setCurrentBudget({ ...currentBudget, validity: e.target.value })}
                        />
                        <label style={styles.label}>Observaciones</label>
                        <textarea
                            style={{ ...styles.input, minHeight: '80px' }}
                            value={currentBudget.notes}
                            onChange={e => setCurrentBudget({ ...currentBudget, notes: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // VISTA PREVIA
    if (view === 'preview' && currentBudget) {
        return (
            <div style={styles.previewContainer}>
                <div style={styles.previewActions}>
                    <button onClick={() => setView('edit')} style={styles.backBtn}>
                        ← Volver a Editar
                    </button>
                    <button onClick={() => window.print()} style={styles.printBtn}>
                        🖨️ Imprimir / PDF
                    </button>
                </div>

                <div style={styles.document}>
                    {/* HEADER */}
                    <div style={styles.header}>
                        <div style={styles.logo}>{companyData.nombre}</div>
                        <h1 style={styles.docTitle}>PRESUPUESTO</h1>
                        <h2 style={styles.projectName}>{currentBudget.projectName}</h2>
                    </div>

                    {/* INFO SECTION */}
                    <div style={styles.infoSection}>
                        <div style={styles.infoBlock}>
                            <h3 style={styles.infoTitle}>Empresa Emisora</h3>
                            <div style={{ padding: '1rem' }}>
                                <p><strong>Empresa:</strong> {companyData.nombre}</p>
                                <p><strong>RUT:</strong> {companyData.rut}</p>
                                <p><strong>Dirección:</strong> {companyData.domicilio}</p>
                                <p><strong>Teléfono:</strong> {companyData.telefono}</p>
                                <p><strong>Email:</strong> {companyData.email}</p>
                            </div>
                        </div>

                        <div style={styles.infoBlock}>
                            <h3 style={styles.infoTitle}>Cliente</h3>
                            <div style={{ padding: '1rem' }}>
                                <p><strong>Nombre:</strong> {currentBudget.clientName}</p>
                                <p><strong>RUT:</strong> {currentBudget.clientRut}</p>
                                <p><strong>Email:</strong> {currentBudget.clientEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* DESCRIPCIÓN */}
                    {currentBudget.description && (
                        <div style={styles.docSection}>
                            <h3 style={styles.sectionTitle}>1. DESCRIPCIÓN DEL PROYECTO</h3>
                            <p>{currentBudget.description}</p>
                        </div>
                    )}

                    {/* ESPECIFICACIONES */}
                    {currentBudget.specifications && currentBudget.specifications.length > 0 && currentBudget.specifications[0].title && (
                        <div style={styles.docSection}>
                            <h3 style={styles.sectionTitle}>2. ESPECIFICACIONES TÉCNICAS</h3>
                            {currentBudget.specifications.map((spec, idx) => (
                                <div key={idx} style={{ marginBottom: '1rem' }}>
                                    {spec.title && <p><strong>{spec.title}:</strong> {spec.text}</p>}
                                    {spec.image && <img src={spec.image} alt={spec.title} style={{ maxWidth: '100%', marginTop: '0.5rem' }} />}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PROCEDIMIENTOS */}
                    {currentBudget.procedures && currentBudget.procedures.length > 0 && currentBudget.procedures[0].text && (
                        <div style={styles.docSection}>
                            <h3 style={styles.sectionTitle}>3. PROCEDIMIENTO DE TRABAJO</h3>
                            {currentBudget.procedures.map((proc, idx) => (
                                <div key={idx} style={{ marginBottom: '1rem' }}>
                                    <p><strong>Paso {proc.step}:</strong> {proc.text}</p>
                                    {proc.image && <img src={proc.image} alt={`Paso ${proc.step}`} style={{ maxWidth: '100%', marginTop: '0.5rem' }} />}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TABLA DE COSTOS */}
                    <div style={styles.docSection}>
                        <h3 style={styles.sectionTitle}>4. DETALLE DE COSTOS</h3>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Cant.</th>
                                    <th>Unidad</th>
                                    <th>Descripción</th>
                                    <th>Precio Unit.</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBudget.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.qty}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.description}</td>
                                        <td style={{ textAlign: 'right' }}>{formatCurrency(item.unitPrice)}</td>
                                        <td style={{ textAlign: 'right' }}>{formatCurrency(item.total)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'right' }}><strong>Subtotal:</strong></td>
                                    <td style={{ textAlign: 'right' }}>
                                        {formatCurrency(currentBudget.items.reduce((sum, i) => sum + Number(i.total || 0), 0))}
                                    </td>
                                </tr>
                                {currentBudget.includeIVA && (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'right' }}><strong>IVA (19%):</strong></td>
                                        <td style={{ textAlign: 'right' }}>
                                            {formatCurrency(currentBudget.items.reduce((sum, i) => sum + Number(i.total || 0), 0) * 0.19)}
                                        </td>
                                    </tr>
                                )}
                                <tr style={styles.totalRow}>
                                    <td colSpan="4" style={{ textAlign: 'right' }}><strong>TOTAL:</strong></td>
                                    <td style={{ textAlign: 'right' }}>
                                        <strong>{formatCurrency(calculateTotal(currentBudget.items, currentBudget.includeIVA))}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* CONDICIONES COMERCIALES */}
                    <div style={styles.docSection}>
                        <h3 style={styles.sectionTitle}>5. CONDICIONES COMERCIALES</h3>
                        <p><strong>Forma de Pago:</strong> {currentBudget.paymentTerms}</p>
                        <p><strong>Plazo de Entrega:</strong> {currentBudget.deliveryTime}</p>
                        <p><strong>Validez de la Oferta:</strong> {currentBudget.validity}</p>
                        {currentBudget.notes && <p><strong>Observaciones:</strong> {currentBudget.notes}</p>}
                    </div>

                    {/* FIRMA */}
                    <div style={styles.signature}>
                        <div style={styles.signatureLine}></div>
                        <p><strong>{companyData.representanteLegal}</strong></p>
                        <p>{companyData.nombre}</p>
                        <p>RUT: {companyData.rut}</p>
                    </div>
                </div>
            </div>
        );
    }

    // VISTA LISTA
    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <div>
                    <h2>Gestión de Presupuestos</h2>
                    <p style={{ color: '#64748b' }}>Administra cotizaciones y presupuestos</p>
                </div>
                <button onClick={handleNewBudget} style={styles.newBtn}>
                    + Nuevo Presupuesto
                </button>
            </div>

            <div style={styles.grid}>
                {budgets.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p>No hay presupuestos creados aún</p>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                            Crea un presupuesto desde el botón "Nuevo Presupuesto"
                        </p>
                    </div>
                ) : (
                    budgets.map(budget => (
                        <div key={budget.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h3>{budget.projectName}</h3>
                                <span style={budget.status === 'Aprobado' ? styles.badgeApproved : styles.badgeDraft}>
                                    {budget.status}
                                </span>
                            </div>
                            <p style={styles.cardText}>Cliente: {budget.clientName}</p>
                            <p style={styles.cardTotal}>
                                Total: {formatCurrency(calculateTotal(budget.items || [], budget.includeIVA))}
                            </p>
                            <div style={styles.cardActions}>
                                <button
                                    onClick={() => { setCurrentBudget(budget); setView('preview'); }}
                                    style={styles.viewBtn}
                                >
                                    👁️ Ver
                                </button>

                                {budget.status !== 'Aprobado' ? (
                                    <button
                                        onClick={() => handleEditBudget(budget)}
                                        style={styles.editBtn}
                                    >
                                        ✏️ Editar
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleCreateAdditional(budget)}
                                        style={styles.additionalBtn}
                                    >
                                        + Adicional
                                    </button>
                                )}

                                {budget.status !== 'Aprobado' && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm('¿Aprobar y convertir en proyecto?')) {
                                                approveBudgetToProject(budget.id);
                                            }
                                        }}
                                        style={styles.approveBtn}
                                    >
                                        ✓ Aprobar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' },
    topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    newBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
    emptyState: { gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '12px' },
    card: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' },
    cardText: { color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0' },
    cardTotal: { fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a', margin: '1rem 0' },
    cardActions: { display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' },
    viewBtn: { flex: 1, minWidth: '80px', backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' },
    editBtn: { flex: 1, minWidth: '80px', backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' },
    additionalBtn: { flex: 1, minWidth: '80px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' },
    approveBtn: { flex: 1, minWidth: '80px', backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' },
    badgeDraft: { backgroundColor: '#fef3c7', color: '#f59e0b', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' },
    badgeApproved: { backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' },

    // EDITOR
    editorHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: 'white', padding: '1rem 1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    backBtn: { backgroundColor: '#64748b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' },
    previewBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' },
    saveBtn: { backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    editorContent: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    section: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    input: { width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '0.75rem', fontSize: '0.95rem' },
    inputSmall: { padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' },
    label: { display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem', marginTop: '0.75rem' },
    addBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
    itemBox: { backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #e2e8f0' },
    itemRow: { display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' },
    deleteBtn: { backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' },
    fileLabel: { display: 'inline-block', backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
    imagePreview: { maxWidth: '200px', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' },
    totalsBox: { backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', marginTop: '1rem' },
    totalLine: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' },

    // PREVIEW
    previewContainer: { padding: '2rem', backgroundColor: '#f4f4f4', minHeight: '100vh' },
    previewActions: { display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', maxWidth: '8.5in', margin: '0 auto 2rem' },
    printBtn: { backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer' },
    document: { width: '8.5in', minHeight: '11in', padding: '0.75in', backgroundColor: 'white', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' },
    header: { textAlign: 'center', borderBottom: '2px solid #3b82f6', paddingBottom: '1rem', marginBottom: '2rem' },
    logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' },
    docTitle: { margin: '0.5rem 0', fontSize: '1.5rem', color: '#1e293b' },
    projectName: { margin: '0.5rem 0', fontSize: '1.2rem', color: '#64748b' },
    infoSection: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' },
    infoBlock: { border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' },
    infoTitle: { backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', margin: 0, fontSize: '0.9rem', fontWeight: 'bold' },
    docSection: { marginBottom: '1.5rem' },
    sectionTitle: { backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.9rem' },
    totalRow: { backgroundColor: '#f8fafc', fontWeight: 'bold' },
    signature: { marginTop: '3rem', textAlign: 'center' },
    signatureLine: { width: '300px', height: '60px', borderBottom: '2px solid #1e293b', margin: '0 auto 1rem' }
};

export default BudgetManager;
