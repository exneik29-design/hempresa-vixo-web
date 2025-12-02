# Plan Maestro de Arquitectura: Nexus Enterprise System

## 1. Visión General
El objetivo es transformar el sitio web actual en una plataforma integral que incluya un **CRM (Gestión de Clientes)**, **ERP (Recursos Empresariales)** y **PM (Gestión de Proyectos)**.

## 2. Arquitectura Tecnológica Propuesta

### Frontend (Interfaz de Usuario)
- **Tecnología:** React (Vite) - Ya implementado.
- **Estructura:**
  - `/src/public`: Sitio web público (Landing, Servicios, Contacto).
  - `/src/manager`: Nueva aplicación interna (El Software).

### Backend & Base de Datos (Híbrido / Local-First)
**Requisito Crítico:** Funcionamiento Offline (Sin Internet).

- **Estrategia:** Arquitectura "Local-First".
- **Base de Datos Local (PC):** **RxDB** o **Dexie.js** (IndexedDB). Los datos viven en el PC del usuario.
- **Base de Datos Nube:** **Supabase** (PostgreSQL).
- **Sincronización:** El sistema detecta conexión y sincroniza cambios bidireccionalmente.

### Aplicación de Escritorio (Windows)
- **Tecnología:** **Electron**.
  - Permite empaquetar la aplicación web React como un archivo `.exe` instalable.
  - Acceso al sistema de archivos local para guardar PDFs y contratos directamente en el disco duro.
  - Funciona independientemente del navegador.

## 3. Módulos del Software (Nexus Manager)

### A. Módulo CRM (Clientes y Ventas)
- **Gestión de Leads:** Pipeline de ventas (Kanban).
- **Presupuestos:** Generador de cotizaciones PDF.
- **Historial:** Registro de llamadas, correos y reuniones.

### B. Módulo de Operaciones (Proyectos)
- **Carta Gantt Interactiva:** Asignación de tiempos y dependencias.
- **Gestión de Tareas:** Tablero tipo Trello para tareas diarias.
- **Reportes de Obra:** Bitácora digital diaria con fotos.

### C. Módulo de RRHH (Trabajadores)
- **Fichas de Personal:** Documentación, contratos, certificaciones.
- **Control de Asistencia:** (Futuro: Integración con huella/geo).
- **Liquidaciones:** Generación básica de documentos.

### D. Módulo Documental & Legal
- **Generador de Contratos:** Plantillas rellenables automáticamente.
- **Repositorio:** Almacenamiento seguro de planos y facturas.

### E. Comunicación
- **Chat Interno:** Comunicación entre oficina y terreno.
- **Notificaciones:** Alertas de vencimiento de plazos o facturas.

## 4. Hoja de Ruta de Implementación

### Fase 1: Cimientos (Actual)
- [x] Sitio Web Público Responsive.
- [x] Sistema de Cotización Básico.
- [ ] Definición de Modelos de Datos (Schemas).

### Fase 2: El Núcleo del Software
- [ ] Crear Layout del "Nexus Manager" (Sidebar, Header Pro).
- [ ] Implementar Base de Datos Real (Supabase/Firebase).
- [ ] Migrar AuthContext a Auth Real.

### Fase 3: Operaciones
- [ ] Desarrollar Carta Gantt.
- [ ] Desarrollar Generador de PDF (Presupuestos).

### Fase 4: Comunicación y RRHH
- [ ] Implementar Chat en tiempo real.
- [ ] Módulo de Trabajadores.

---
**Nota:** Este software vivirá en la ruta `/manager` o `/app` y estará estrictamente protegido.
