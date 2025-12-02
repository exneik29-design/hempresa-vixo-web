import React, { createContext, useContext, useState, useEffect } from 'react';

const OperationsContext = createContext();

export const useOperations = () => {
    return useContext(OperationsContext);
};

export const OperationsProvider = ({ children }) => {
    // --- ESTADO INICIAL (Base de Datos Local) ---
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('nexus_projects');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Remodelación Oficinas Centro', location: 'Santiago Centro', status: 'En Progreso', budget: 15000000, startDate: '2025-11-01' },
            { id: 2, name: 'Instalación Eléctrica Planta', location: 'Quilicura', status: 'Planificación', budget: 8500000, startDate: '2025-12-15' }
        ];
    });

    const [workers, setWorkers] = useState(() => {
        const saved = localStorage.getItem('nexus_workers');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Juan Pérez', role: 'Maestro Mayor', salary: 950000, phone: '+56911111111', status: 'Activo', username: 'juan.perez', password: '123', permissions: ['view_tasks', 'view_chat'] },
            { id: 2, name: 'Pedro González', role: 'Ayudante', salary: 550000, phone: '+56922222222', status: 'Activo', username: 'pedro.gonzalez', password: '123', permissions: ['view_tasks'] },
            { id: 3, name: 'María Rodríguez', role: 'Prevencionista', salary: 800000, phone: '+56933333333', status: 'Activo', username: 'maria.rodriguez', password: '123', permissions: ['view_tasks', 'view_chat', 'view_safety'] }
        ];
    });

    const [assignments, setAssignments] = useState(() => {
        const saved = localStorage.getItem('nexus_assignments');
        return saved ? JSON.parse(saved) : [
            { id: 1, projectId: 1, workerId: 1, role: 'Jefe de Obra', assignedDate: '2025-11-01' },
            { id: 2, projectId: 1, workerId: 2, role: 'Ayudante', assignedDate: '2025-11-01' }
        ];
    });

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('nexus_tasks');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                projectId: 1,
                workerId: 1,
                title: 'Supervisión de demolición',
                phase: 'Demolición',
                safetyRequirement: 'Uso obligatorio de casco, guantes y botas de seguridad. Señalización de área de trabajo',
                floor: 'Todos',
                description: 'Supervisar y coordinar el proceso de demolición de estructuras existentes, asegurando cumplimiento de normas de seguridad',
                status: 'Completado',
                startDate: '2025-10-29',
                endDate: '2025-11-05',
                workDays: 6,
                milestone: 'Inicio de obra'
            },
            {
                id: 2,
                projectId: 1,
                workerId: 2,
                title: 'Retiro de escombros',
                phase: 'Demolición',
                safetyRequirement: 'Mascarilla antipolvo, protección ocular. Vehículos con señalización',
                floor: 'Todos',
                description: 'Limpieza y retiro de escombros generados por la demolición, transporte a vertedero autorizado',
                status: 'Completado',
                startDate: '2025-11-06',
                endDate: '2025-11-15',
                workDays: 8,
                milestone: 'Terreno limpio'
            },
            {
                id: 3,
                projectId: 1,
                workerId: 1,
                title: 'Instalación de cimientos',
                phase: 'Obra Gruesa',
                safetyRequirement: 'Arnés de seguridad para excavaciones profundas. Entibación obligatoria',
                floor: 'Subterráneo',
                description: 'Excavación y construcción de cimientos según planos estructurales, incluye armado de fierros y hormigonado',
                status: 'En Progreso',
                startDate: '2025-11-16',
                endDate: '2025-11-30',
                workDays: 11,
                milestone: 'Base estructural'
            },
            {
                id: 4,
                projectId: 1,
                workerId: null,
                title: 'Levantamiento de muros',
                phase: 'Obra Gruesa',
                safetyRequirement: 'Andamios certificados. Líneas de vida en alturas superiores a 1.8m',
                floor: 'Piso 1',
                description: 'Construcción de muros perimetrales y divisorios según especificaciones del proyecto',
                status: 'Pendiente',
                startDate: '2025-12-01',
                endDate: '2025-12-20',
                workDays: 15,
                milestone: 'Estructura cerrada'
            },
            {
                id: 5,
                projectId: 1,
                workerId: null,
                title: 'Instalación eléctrica',
                phase: 'Instalaciones',
                safetyRequirement: 'Electricista certificado. Corte de energía durante instalación. Probador de voltaje',
                floor: 'Todos',
                description: 'Instalación completa del sistema eléctrico: cableado, enchufes, interruptores y tablero eléctrico',
                status: 'Pendiente',
                startDate: '2025-12-21',
                endDate: '2026-01-05',
                workDays: 11,
                milestone: 'Instalaciones operativas'
            },
            {
                id: 6,
                projectId: 1,
                workerId: null,
                title: 'Terminaciones',
                phase: 'Acabados',
                safetyRequirement: 'Ventilación adecuada para pinturas. Protección respiratoria',
                floor: 'Todos',
                description: 'Trabajos de terminación: pintura, instalación de puertas, ventanas y acabados finales',
                status: 'Pendiente',
                startDate: '2026-01-06',
                endDate: '2026-01-15',
                workDays: 8,
                milestone: 'Entrega de obra'
            }
        ];
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('nexus_transactions');
        return saved ? JSON.parse(saved) : [
            { id: 1, type: 'expense', category: 'Materiales', amount: 250000, date: '2025-11-10', description: 'Compra de cemento', projectId: 1 },
            { id: 2, type: 'salary', category: 'Sueldo', amount: 950000, date: '2025-10-30', description: 'Sueldo Octubre', workerId: 1 }
        ];
    });

    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem('nexus_budgets');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                projectName: 'CAJA PROTECTORA PARA CONDUIT ELÉCTRICO',
                clientName: 'Constructora del Sur S.A.',
                clientRut: '76.123.456-7',
                clientEmail: 'contacto@constructoradelsur.cl',
                status: 'Borrador',
                items: [
                    { qty: 1, unit: 'Glb', description: 'Fabricación caja protectora metálica', unitPrice: 150000, total: 150000 },
                    { qty: 1, unit: 'Glb', description: 'Instalación y fijación en terreno', unitPrice: 80000, total: 80000 },
                    { qty: 1, unit: 'Glb', description: 'Pintura anticorrosiva', unitPrice: 45000, total: 45000 }
                ]
            }
        ];
    });

    const [attendance, setAttendance] = useState(() => {
        const saved = localStorage.getItem('nexus_attendance');
        return saved ? JSON.parse(saved) : [];
    });

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('nexus_messages');
        return saved ? JSON.parse(saved) : [];
    });

    const [projectImages, setProjectImages] = useState(() => {
        const saved = localStorage.getItem('nexus_project_images');
        return saved ? JSON.parse(saved) : [];
    });

    // --- NUEVOS MÓDULOS ---
    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('nexus_inventory');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Taladro Percutor Bosch', category: 'Herramientas', quantity: 5, unit: 'un', location: 'Bodega Central', minStock: 2 },
            { id: 2, name: 'Cemento Melón 25kg', category: 'Materiales', quantity: 50, unit: 'sacos', location: 'Bodega Central', minStock: 20 },
            { id: 3, name: 'Cable THHN 12AWG', category: 'Eléctrico', quantity: 200, unit: 'mts', location: 'Bodega Central', minStock: 100 }
        ];
    });

    const [suppliers, setSuppliers] = useState(() => {
        const saved = localStorage.getItem('nexus_suppliers');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Sodimac Constructor', contact: 'ventas@sodimac.cl', category: 'General' },
            { id: 2, name: 'Rexel Electricidad', contact: 'contacto@rexel.cl', category: 'Eléctrico' }
        ];
    });

    const [purchaseOrders, setPurchaseOrders] = useState(() => {
        const saved = localStorage.getItem('nexus_purchase_orders');
        return saved ? JSON.parse(saved) : [];
    });

    const [assets, setAssets] = useState(() => { // Fleet/Machinery
        const saved = localStorage.getItem('nexus_assets');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Camioneta Toyota Hilux', plate: 'LSDD-99', status: 'Operativo', assignedTo: null },
            { id: 2, name: 'Generador Diesel 50kVA', plate: 'N/A', status: 'En Mantención', assignedTo: null }
        ];
    });

    // --- PERSISTENCIA ---
    useEffect(() => { localStorage.setItem('nexus_projects', JSON.stringify(projects)); }, [projects]);
    useEffect(() => { localStorage.setItem('nexus_workers', JSON.stringify(workers)); }, [workers]);
    useEffect(() => { localStorage.setItem('nexus_assignments', JSON.stringify(assignments)); }, [assignments]);
    useEffect(() => { localStorage.setItem('nexus_tasks', JSON.stringify(tasks)); }, [tasks]);
    useEffect(() => { localStorage.setItem('nexus_transactions', JSON.stringify(transactions)); }, [transactions]);
    useEffect(() => { localStorage.setItem('nexus_budgets', JSON.stringify(budgets)); }, [budgets]);
    useEffect(() => { localStorage.setItem('nexus_attendance', JSON.stringify(attendance)); }, [attendance]);
    useEffect(() => { localStorage.setItem('nexus_messages', JSON.stringify(messages)); }, [messages]);
    useEffect(() => { localStorage.setItem('nexus_project_images', JSON.stringify(projectImages)); }, [projectImages]);

    // Nuevas persistencias
    useEffect(() => { localStorage.setItem('nexus_inventory', JSON.stringify(inventory)); }, [inventory]);
    useEffect(() => { localStorage.setItem('nexus_suppliers', JSON.stringify(suppliers)); }, [suppliers]);
    useEffect(() => { localStorage.setItem('nexus_purchase_orders', JSON.stringify(purchaseOrders)); }, [purchaseOrders]);
    useEffect(() => { localStorage.setItem('nexus_assets', JSON.stringify(assets)); }, [assets]);

    // --- FUNCIONES DEL SISTEMA ---

    // GESTIÓN DE PERMISOS
    const checkPermission = (workerId, permission) => {
        const worker = workers.find(w => w.id === workerId);
        if (!worker) return false;
        if (worker.role === 'Admin' || worker.role === 'Gerente') return true; // Superusers
        return worker.permissions?.includes(permission);
    };

    const updateWorkerPermissions = (workerId, permissions) => {
        setWorkers(workers.map(w => w.id === workerId ? { ...w, permissions } : w));
    };

    // INVENTARIO Y LOGÍSTICA
    const addInventoryItem = (item) => {
        setInventory([...inventory, { ...item, id: Date.now() }]);
    };

    const updateStock = (itemId, quantity, operation = 'add') => { // operation: 'add' or 'subtract'
        setInventory(inventory.map(item => {
            if (item.id === itemId) {
                const newQty = operation === 'add' ? Number(item.quantity) + Number(quantity) : Number(item.quantity) - Number(quantity);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const addAsset = (asset) => {
        setAssets([...assets, { ...asset, id: Date.now() }]);
    };

    // ADQUISICIONES (Compras)
    const addSupplier = (supplier) => {
        setSuppliers([...suppliers, { ...supplier, id: Date.now() }]);
    };

    const createPurchaseOrder = (order) => {
        setPurchaseOrders([...purchaseOrders, { ...order, id: Date.now(), status: 'Pendiente', date: new Date().toISOString() }]);
    };

    const approvePurchaseOrder = (orderId) => {
        setPurchaseOrders(purchaseOrders.map(o => o.id === orderId ? { ...o, status: 'Aprobado' } : o));
    };

    // IMÁGENES Y DOCUMENTOS
    const addProjectImage = (image) => {
        setProjectImages([...projectImages, { ...image, id: Date.now(), date: new Date().toISOString() }]);
    };

    // MENSAJERÍA
    const sendMessage = (text, senderId, projectId = null) => {
        setMessages([...messages, {
            id: Date.now(),
            text,
            senderId,
            projectId,
            timestamp: new Date().toISOString(),
            read: false
        }]);
    };

    // PRESUPUESTOS
    const saveBudget = (budget) => {
        const existingIndex = budgets.findIndex(b => b.id === budget.id);
        if (existingIndex >= 0) {
            const newBudgets = [...budgets];
            newBudgets[existingIndex] = budget;
            setBudgets(newBudgets);
        } else {
            setBudgets([...budgets, { ...budget, id: Date.now(), status: 'Borrador' }]);
        }
    };

    const approveBudgetToProject = (budgetId) => {
        const budget = budgets.find(b => b.id === budgetId);
        if (!budget) return;

        // 1. Crear Proyecto
        const newProject = {
            id: Date.now(),
            name: budget.projectName,
            location: 'Por definir', // Se podría agregar al presupuesto
            status: 'Planificación',
            budget: budget.totalNeto || 0,
            startDate: new Date().toISOString().split('T')[0]
        };

        // 2. Convertir Procedimientos en Tareas
        const newTasks = budget.procedures.map((proc, index) => ({
            id: Date.now() + index,
            projectId: newProject.id,
            title: proc.step,
            description: proc.desc,
            status: 'Pendiente',
            dueDate: null,
            workerId: null // Se asignará después
        }));

        // Actualizar estados
        setProjects([...projects, newProject]);
        setTasks([...tasks, ...newTasks]);

        // Marcar presupuesto como aprobado
        const updatedBudgets = budgets.map(b => b.id === budgetId ? { ...b, status: 'Aprobado', linkedProjectId: newProject.id } : b);
        setBudgets(updatedBudgets);

        return newProject.id;
    };

    // ASISTENCIA
    const registerAttendance = (workerId, type, location) => {
        setAttendance([...attendance, {
            id: Date.now(),
            workerId,
            type, // 'check-in' | 'check-out'
            timestamp: new Date().toISOString(),
            location
        }]);
    };

    // PROYECTOS
    const addProject = (project) => {
        setProjects([...projects, { ...project, id: Date.now() }]);
    };
    const updateProjectStatus = (id, status) => {
        setProjects(projects.map(p => p.id === id ? { ...p, status } : p));
    };

    // TRABAJADORES
    const addWorker = (worker) => {
        // Generar credenciales simples (Usuario: Nombre, Pass: 1234) - En prod usar auth real
        const username = worker.name.toLowerCase().replace(/\s+/g, '.');
        // Default permissions for new workers
        const permissions = ['view_tasks', 'view_chat'];
        setWorkers([...workers, { ...worker, id: Date.now(), username, password: '1234', permissions }]);
    };

    // ASIGNACIONES (Quién está en qué faena)
    const assignWorkerToProject = (projectId, workerId, role) => {
        setAssignments([...assignments, { id: Date.now(), projectId, workerId, role, assignedDate: new Date().toISOString().split('T')[0] }]);
    };
    const removeWorkerFromProject = (assignmentId) => {
        setAssignments(assignments.filter(a => a.id !== assignmentId));
    };

    // TAREAS
    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), status: 'Pendiente' }]);
    };
    const updateTaskStatus = (taskId, status) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
    };

    // FINANZAS (Sueldos y Gastos)
    const addTransaction = (transaction) => {
        setTransactions([...transactions, { ...transaction, id: Date.now() }]);
    };

    // --- GETTERS AVANZADOS ---
    const getProjectWorkers = (projectId) => {
        // Retorna los trabajadores asignados a un proyecto específico con sus detalles
        return assignments
            .filter(a => a.projectId === Number(projectId))
            .map(a => {
                const worker = workers.find(w => w.id === Number(a.workerId));
                return { ...worker, assignmentId: a.id, projectRole: a.role };
            });
    };

    const getWorkerProjects = (workerId) => {
        return assignments
            .filter(a => a.workerId === Number(workerId))
            .map(a => {
                const project = projects.find(p => p.id === Number(a.projectId));
                return { ...project, projectRole: a.role };
            });
    };

    const getWorkerTasks = (workerId) => {
        return tasks.filter(t => t.workerId === Number(workerId) && t.status !== 'Completado');
    };

    const getProjectFinances = (projectId) => {
        const projectTrans = transactions.filter(t => t.projectId === Number(projectId));
        const expenses = projectTrans.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
        return { expenses, transactions: projectTrans };
    };

    const getProjectMessages = (projectId) => {
        return messages.filter(m => m.projectId === Number(projectId)).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    };

    const getProjectImages = (projectId) => {
        return projectImages.filter(img => img.projectId === Number(projectId)).sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    return (
        <OperationsContext.Provider value={{
            projects, addProject, updateProjectStatus,
            workers, addWorker, updateWorkerPermissions, checkPermission,
            assignments, assignWorkerToProject, removeWorkerFromProject,
            tasks, addTask, updateTaskStatus, getWorkerTasks,
            transactions, addTransaction,
            budgets, saveBudget, approveBudgetToProject,
            attendance, registerAttendance,
            messages, sendMessage, getProjectMessages,
            projectImages, addProjectImage, getProjectImages,
            inventory, addInventoryItem, updateStock,
            suppliers, addSupplier,
            purchaseOrders, createPurchaseOrder, approvePurchaseOrder,
            assets, addAsset,
            getProjectWorkers, getWorkerProjects, getProjectFinances
        }}>
            {children}
        </OperationsContext.Provider>
    );
};
