# NEXUS ERP - Inventario Completo de Funciones

**Versión:** 1.0.0  
**Fecha:** 24 de Noviembre 2025

## 📋 RESUMEN EJECUTIVO

Este documento lista **TODAS** las funciones implementadas en el sistema Nexus ERP, organizadas por módulo.

---

## 🏗️ MÓDULOS PRINCIPALES

### 1. GESTIÓN DE PROYECTOS
**Ubicación:** `/manager/projects`

#### Datos Almacenados:
- `projects`: Lista de todos los proyectos con id, nombre, ubicación, estado, presupuesto, fecha de inicio

#### Funciones Disponibles:
- ✅ `addProject(project)` - Crear nuevo proyecto
- ✅ `updateProjectStatus(id, status)` - Cambiar estado del proyecto
- ✅ `getProjectWorkers(projectId)` - Obtener trabajadores asignados a un proyecto
- ✅ `getProjectFinances(projectId)` - Obtener gastos del proyecto
- ✅ `getProjectMessages(projectId)` - Obtener mensajes del proyecto
- ✅ `getProjectImages(projectId)` - Obtener fotos del proyecto

---

### 2. RECURSOS HUMANOS (RRHH)
**Ubicación:** `/manager/workers`

#### Datos Almacenados:
- `workers`: Personal con id, nombre, rol, sueldo, teléfono, estado, username, password, permissions
- `assignments`: Asignaciones trabajador-proyecto
- `attendance`: Registro de asistencia

#### Funciones Disponibles:
##### Gestión de Personal:
- ✅ `addWorker(worker)` - Agregar nuevo trabajador (auto-genera username/password)
- ✅ `getWorkerProjects(workerId)` - Ver en qué proyectos está asignado
- ✅ `getWorkerTasks(workerId)` - Ver tareas pendientes del trabajador
- ✅ `assignWorkerToProject(projectId, workerId, role)` - Asignar a proyecto
- ✅ `removeWorkerFromProject(assignmentId)` - Quitar de proyecto

##### Sistema de Permisos:
- ✅ `checkPermission(workerId, permission)` - Verificar si tiene permiso
- ✅ `updateWorkerPermissions(workerId, permissions)` - Modificar permisos

**Permisos Disponibles:**
- `view_tasks` - Ver tareas asignadas
- `view_chat` - Usar chat de proyecto
- `view_finance` - Acceder a finanzas
- `view_inventory` - Acceder a inventario
- `edit_gantt` - Modificar cronograma
- `manage_workers` - Gestionar RRHH

##### Asistencia:
- ✅ `registerAttendance(workerId, type, location)` - Registrar check-in/out con geolocalización

---

### 3. TAREAS Y SEGUIMIENTO
**Ubicación:** Integrado en Projects

#### Datos Almacenados:
- `tasks`: Tareas con id, projectId, workerId, título, estado, fecha vencimiento

#### Funciones Disponibles:
- ✅ `addTask(task)` - Crear nueva tarea
- ✅ `updateTaskStatus(taskId, status)` - Marcar como completada/en progreso
- ✅ `getWorkerTasks(workerId)` - Ver tareas de un trabajador

**Estados de Tarea:**
- `Pendiente`
- `En Progreso`
- `Completado`

---

### 4. FINANZAS Y CONTABILIDAD
**Ubicación:** `/manager/finance`

#### Datos Almacenados:
- `transactions`: Transacciones con id, tipo, categoría, monto, fecha, descripción
- `suppliers`: Proveedores
- `purchaseOrders`: Órdenes de compra

#### Funciones Disponibles:
##### Transacciones:
- ✅ `addTransaction(transaction)` - Registrar gasto o pago de sueldo
- ✅ `getProjectFinances(projectId)` - Resumen financiero de proyecto

**Tipos de Transacción:**
- `expense` - Gasto operativo
- `salary` - Pago de sueldo

##### Proveedores:
- ✅ `addSupplier(supplier)` - Agregar proveedor (nombre, contacto, categoría)

##### Órdenes de Compra:
- ✅ `createPurchaseOrder(order)` - Crear OC (supplierId, items, total)
- ✅ `approvePurchaseOrder(orderId)` - Aprobar OC

**Estados de OC:**
- `Pendiente`
- `Aprobado`

---

### 5. INVENTARIO Y LOGÍSTICA
**Ubicación:** `/manager/inventory`

#### Datos Almacenados:
- `inventory`: Items con id, nombre, categoría, cantidad, unidad, ubicación, stock mínimo
- `assets`: Flota/maquinaria con id, nombre, patente, estado, asignado a

#### Funciones Disponibles:
##### Bodega:
- ✅ `addInventoryItem(item)` - Agregar herramienta/material
- ✅ `updateStock(itemId, quantity, operation)` - Sumar/restar stock
  - `operation`: `'add'` o `'subtract'`

##### Flota y Maquinaria:
- ✅ `addAsset(asset)` - Registrar vehículo/equipo

**Estados de Asset:**
- `Operativo`
- `En Mantención`
- `Fuera de Servicio`

---

### 6. PRESUPUESTOS Y COTIZACIONES
**Ubicación:** `/manager/budget` y `/admin/cotizaciones`

#### Datos Almacenados:
- `budgets`: Presupuestos con toda la estructura de cotización

#### Funciones Disponibles:
- ✅ `saveBudget(budget)` - Guardar/actualizar presupuesto
- ✅ `approveBudgetToProject(budgetId)` - Convertir presupuesto en proyecto real
  - Crea automáticamente el proyecto
  - Convierte procedimientos en tareas
  - Vincula el presupuesto al proyecto

**Estados de Presupuesto:**
- `Borrador`
- `Aprobado`

---

### 7. COMUNICACIONES
**Ubicación:** Integrado en múltiples módulos

#### Datos Almacenados:
- `messages`: Mensajes con id, texto, senderId, projectId, timestamp, leído

#### Funciones Disponibles:
- ✅ `sendMessage(text, senderId, projectId)` - Enviar mensaje al chat del proyecto
- ✅ `getProjectMessages(projectId)` - Obtener mensajes ordenados por fecha

---

### 8. DOCUMENTACIÓN VISUAL
**Ubicación:** Worker Portal y Client Dashboard

#### Datos Almacenados:
- `projectImages`: Fotos con id, projectId, dataUrl, description, date

#### Funciones Disponibles:
- ✅ `addProjectImage(image)` - Subir foto del proyecto
- ✅ `getProjectImages(projectId)` - Ver galería del proyecto

---

## 🔐 SISTEMA DE AUTENTICACIÓN

### Usuarios Predefinidos:

#### Administrador (Acceso Total):
- **Email:** `admin@nexus.com`
- **Password:** `admin`
- **Acceso:** Admin Panel + Manager ERP

#### Cliente:
- **Email:** `cliente@empresa.com`
- **Password:** `cliente`
- **Acceso:** Dashboard de Cliente

#### Trabajadores:
- **Username:** `juan.perez`, `pedro.gonzalez`, `maria.rodriguez`
- **Password:** `1234` (todos)
- **Acceso:** Worker Portal móvil

### Funciones de Auth:
- ✅ `login(email, password)` - Iniciar sesión
- ✅ `logout()` - Cerrar sesión
- ✅ Persistencia automática en localStorage

---

## 📊 PERSISTENCIA DE DATOS

**Método Actual:** localStorage (desarrollo/MVP)  
**Llaves utilizadas:**
- `nexus_user` - Sesión actual
- `nexus_projects`
- `nexus_workers`
- `nexus_assignments`
- `nexus_tasks`
- `nexus_transactions`
- `nexus_budgets`
- `nexus_attendance`
- `nexus_messages`
- `nexus_project_images`
- `nexus_inventory`
- `nexus_suppliers`
- `nexus_purchase_orders`
- `nexus_assets`

**Auto-save:** Todos los cambios se guardan automáticamente mediante `useEffect`

---

## 🎯 RUTAS DISPONIBLES

### Públicas:
- `/` - Página de inicio
- `/login` - Login
- `/portal` - Portal de trabajadores
- `/servicios` - Servicios de la empresa
- `/portafolio` - Portafolio de proyectos
- `/contacto` - Formulario de contacto

### Admin (requiere rol 'admin'):
- `/admin` - Dashboard principal
- `/admin/cms` - Gestión de contenido web
- `/admin/cotizaciones` - Sistema de cotizaciones
- `/admin/configuracion` - Configuración del sistema

### Manager ERP (requiere rol 'admin'):
- `/manager/dashboard` - Dashboard operativo
- `/manager/projects` - Gestión de proyectos
- `/manager/budget` - Presupuestos
- `/manager/workers` - RRHH y nómina
- `/manager/finance` - Finanzas y adquisiciones
- `/manager/inventory` - Inventario y logística

### Cliente (requiere rol 'client'):
- `/client/dashboard` - Ver estado del proyecto, fotos, cronograma

---

## ✅ CHECKLIST DE FUNCIONALIDADES

### Core Business:
- [x] Gestión de Proyectos
- [x] Gestión de Trabajadores
- [x] Asignación de Personal a Proyectos
- [x] Sistema de Tareas
- [x] Registro de Asistencia con GPS
- [x] Chat por Proyecto
- [x] Galería de Fotos

### Finanzas:
- [x] Registro de Gastos
- [x] Pago de Sueldos
- [x] Gestión de Proveedores
- [x] Órdenes de Compra
- [x] Resumen Financiero por Proyecto

### Logística:
- [x] Control de Inventario (Bodega)
- [x] Alertas de Stock Mínimo
- [x] Gestión de Flota/Maquinaria
- [x] Entrada/Salida de Stock

### Comercial:
- [x] Sistema de Cotizaciones/Presupuestos
- [x] Conversión de Presupuesto a Proyecto
- [x] Generación de PDF

### Permisos:
- [x] Sistema de Permisos Granular
- [x] Asignación de Permisos por Trabajador
- [x] Verificación de Permisos en Contexto

### Interfaz:
- [x] Admin Panel con Sidebar
- [x] Manager ERP con Sidebar
- [x] Worker Portal (móvil)
- [x] Client Dashboard
- [x] Navegación con React Router (HashRouter)

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

### Corto Plazo:
1. Aplicar permisos en las rutas (RequirePermission component)
2. Hacer iconos offline (descargar FontAwesome)
3. Añadir validación de formularios

### Mediano Plazo:
1. Integrar Gantt Chart dinámico
2. Reportería en PDF/Excel
3. Notificaciones push

### Largo Plazo (Producción):
1. Migrar a base de datos real (PostgreSQL/Firebase)
2. Autenticación robusta (JWT/OAuth)
3. Cloud storage para imágenes (AWS S3)
4. API REST backend

---

## 📝 NOTAS TÉCNICAS

**Framework:** React 19 + Vite  
**Routing:** React Router DOM (HashRouter para Electron)  
**State Management:** Context API  
**Styling:** Inline styles (CSS-in-JS)  
**Desktop:** Electron 28  
**Persistencia:** localStorage (temporal)

**Compatibilidad:**
- ✅ Navegador web (desarrollo: localhost:5173)
- ✅ Aplicación de escritorio Windows (.exe)
- ✅ Funciona SIN internet (excepto iconos CDN)

---

**Última actualización:** 24 de Noviembre 2025  
**Desarrollado por:** Nexus Team
