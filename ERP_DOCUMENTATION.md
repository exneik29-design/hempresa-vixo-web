# Documentación Técnica del Sistema ERP - Nexus Group

## 1. Visión General
Este sistema es una plataforma ERP (Enterprise Resource Planning) diseñada para la gestión integral de proyectos de construcción y servicios industriales. El sistema conecta tres actores principales: **Administradores**, **Trabajadores** y **Clientes**, facilitando el flujo de información, la gestión de presupuestos, el seguimiento de obras y la comunicación.

---

## 2. Arquitectura del Sistema
El sistema está construido como una **Single Page Application (SPA)** utilizando **React** y **Vite**.

### Tecnologías Clave:
- **Frontend:** React 18
- **Enrutamiento:** React Router Dom
- **Gestión de Estado:** Context API (`OperationsContext`, `AuthContext`, `ContentContext`)
- **Estilos:** CSS Modules / Inline Styles (Diseño Responsivo y Moderno)
- **Persistencia:** `localStorage` (Simulación de Base de Datos para MVP)
- **Iconos:** FontAwesome

---

## 3. Módulos Principales

### 3.1. Gestión de Operaciones (`OperationsContext`)
Este es el núcleo del sistema. Gestiona toda la lógica de negocio y los datos.
- **Proyectos:** Creación, edición y seguimiento de estados (Planificación, En Progreso, Completado).
- **Trabajadores:** Registro de personal, roles y credenciales de acceso.
- **Asignaciones:** Vinculación de trabajadores a proyectos específicos.
- **Tareas:** Desglose de actividades por proyecto, asignadas a trabajadores.
- **Presupuestos:** Creación dinámica de cotizaciones con ítems, especificaciones y procedimientos.
    - *Funcionalidad Clave:* Aprobación de presupuestos que genera automáticamente un Proyecto y sus Tareas.
- **Finanzas:** Registro de transacciones (Gastos y Sueldos) por proyecto.
- **Asistencia:** Registro de Check-in/Check-out con geolocalización.
- **Mensajería:** Chat en tiempo real por proyecto.
- **Galería:** Gestión de fotos y documentos del proyecto.

### 3.2. Portal del Administrador (`/admin`)
Panel de control completo para los gerentes.
- **Dashboard:** Resumen financiero y operativo.
- **Gestor de Proyectos:** Vista detallada de cada obra, asignación de personal y finanzas.
- **Gestor de Presupuestos:** Herramienta avanzada para crear cotizaciones profesionales (PDF).
- **Gestor de Trabajadores:** Administración de RRHH y sueldos.

### 3.3. Portal del Trabajador (`/portal`)
Interfaz móvil-first diseñada para el uso en terreno.
- **Login Simplificado:** Acceso con usuario y contraseña simple.
- **Mis Tareas:** Lista de tareas asignadas con opción de marcar como completadas.
- **Asistencia:** Botones grandes para marcar entrada/salida con captura de GPS.
- **Chat de Obra:** Comunicación directa con el equipo del proyecto.
- **Fotos:** Funcionalidad para tomar y subir fotos de avance directamente desde el celular.

### 3.4. Portal del Cliente (`/client`)
Interfaz de solo lectura para la transparencia con el cliente.
- **Dashboard:** Resumen del estado del proyecto (Avance, Presupuesto).
- **Carta Gantt:** Visualización gráfica del cronograma y hitos.
- **Galería:** Visualización de fotos de avance subidas por los trabajadores.
- **Documentos:** Descarga de planos, facturas y reportes.

---

## 4. Flujos de Trabajo (Workflows)

### 4.1. Flujo de Venta a Operación
1.  **Crear Presupuesto:** El admin crea un presupuesto detallado en `BudgetManager`.
2.  **Aprobar Presupuesto:** Al aprobarse, el sistema convierte el presupuesto en un **Proyecto**.
3.  **Generación de Tareas:** Los "Procedimientos" del presupuesto se convierten automáticamente en **Tareas** pendientes.
4.  **Asignación:** El admin asigna trabajadores al nuevo proyecto y distribuye las tareas.

### 4.2. Flujo de Ejecución en Terreno
1.  **Inicio de Jornada:** El trabajador ingresa al `/portal` y marca "Entrada" (se guarda GPS).
2.  **Revisión:** El trabajador revisa sus tareas y el chat del proyecto.
3.  **Ejecución:** A medida que avanza, marca tareas como "Completadas".
4.  **Evidencia:** El trabajador sube fotos del avance en la pestaña "Fotos".
5.  **Fin de Jornada:** El trabajador marca "Salida".

### 4.3. Flujo de Supervisión (Cliente)
1.  **Acceso:** El cliente ingresa a su portal.
2.  **Monitoreo:** Revisa la barra de progreso y la Carta Gantt.
3.  **Verificación:** Ve las fotos "en tiempo real" que subieron los trabajadores.
4.  **Documentación:** Descarga los estados de pago o planos actualizados.

---

## 5. Estructura de Datos (Persistencia Local)
El sistema utiliza las siguientes claves en `localStorage`:
- `nexus_projects`: Array de objetos Proyecto.
- `nexus_workers`: Array de objetos Trabajador.
- `nexus_assignments`: Relación Proyecto-Trabajador.
- `nexus_tasks`: Tareas individuales.
- `nexus_budgets`: Presupuestos (Borradores y Aprobados).
- `nexus_attendance`: Registros de tiempo y ubicación.
- `nexus_messages`: Mensajes del chat.
- `nexus_project_images`: URLs de imágenes y metadatos.

---

## 6. Consideraciones de Seguridad y Futuro
- **Autenticación:** Actualmente es básica. Se recomienda migrar a JWT/OAuth.
- **Base de Datos:** Migrar de `localStorage` a una base de datos real (PostgreSQL/Firebase) para producción.
- **Almacenamiento de Archivos:** Integrar con AWS S3 o similar para las imágenes y documentos (actualmente usa Base64/URLs simuladas).
