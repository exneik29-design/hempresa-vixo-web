# 🏢 Nexus ERP - Sistema de Gestión Empresarial Integral

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

Sistema web moderno y completo para la gestión integral de empresas de construcción y contabilidad. Desarrollado con React, Vite y diseño responsive premium.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos Principales](#-módulos-principales)
- [Arquitectura](#-arquitectura)
- [Contribución](#-contribución)

## ✨ Características

### 🎯 Funcionalidades Principales

- **Gestión de Proyectos**: Control completo de proyectos de construcción con seguimiento en tiempo real
- **Gestión Financiera**: Administración de presupuestos, transacciones y flujo de caja
- **Gestión de Trabajadores**: Control de personal, asignaciones y rendimiento
- **Sistema de Inventario**: Seguimiento de materiales y recursos
- **Generación de Presupuestos**: Creación y gestión de cotizaciones profesionales
- **Panel de Administración (CMS)**: Gestión de contenido del sitio web
- **Sistema Multi-Rol**: Acceso diferenciado para Admin, Manager, Cliente y Trabajador
- **Diseño Responsive**: Interfaz adaptable a todos los dispositivos

### 🎨 Características de Diseño

- ✅ Diseño moderno y premium con glassmorphism
- ✅ Animaciones suaves y micro-interacciones
- ✅ Paleta de colores profesional y armoniosa
- ✅ Tipografía moderna (Google Fonts)
- ✅ Modo oscuro integrado
- ✅ Componentes reutilizables y modulares

## 🛠️ Tecnologías

### Frontend
- **React 19.2.0** - Biblioteca de interfaz de usuario
- **React Router DOM 7.9.6** - Enrutamiento y navegación
- **Vite 7.2.4** - Build tool y dev server ultrarrápido
- **Lucide React** - Iconos modernos y escalables
- **React-to-Print** - Generación de documentos imprimibles

### Desktop (Opcional)
- **Electron 28.1.0** - Aplicación de escritorio multiplataforma
- **Electron Builder** - Empaquetado de aplicaciones

### Herramientas de Desarrollo
- **ESLint** - Linting y calidad de código
- **Concurrently** - Ejecución de scripts paralelos
- **Wait-on** - Sincronización de procesos

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.x o superior)
- **npm** (versión 9.x o superior) o **yarn**
- **Git** para control de versiones

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/exneik29-design/hempresa-vixo-web.git
cd hempresa-vixo-web
```

### 2. Instalar dependencias

```bash
npm install
```

o si prefieres yarn:

```bash
yarn install
```

### 3. Configurar variables de entorno (opcional)

Crea un archivo `.env` en la raíz del proyecto si necesitas configuraciones personalizadas:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Nexus ERP
```

## 💻 Uso

### Modo Desarrollo (Web)

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Modo Desarrollo (Electron)

Para ejecutar como aplicación de escritorio:

```bash
npm run electron:dev
```

### Build de Producción

#### Build Web

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

#### Build Electron

```bash
npm run electron:build
```

El ejecutable estará en la carpeta `dist-electron/`

### Vista Previa de Producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
hempresa-vixo-web/
├── public/                 # Archivos estáticos
│   ├── images/            # Imágenes y assets
│   └── favicon.ico        # Icono de la aplicación
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── GanttChart.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/          # Context API de React
│   │   ├── AuthContext.jsx
│   │   ├── CompanyContext.jsx
│   │   ├── ContentContext.jsx
│   │   └── OperationsContext.jsx
│   ├── pages/            # Páginas de la aplicación
│   │   ├── admin/        # Módulo de administración
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CMSManager.jsx
│   │   │   ├── QuotationsManager.jsx
│   │   │   └── SettingsManager.jsx
│   │   ├── manager/      # Módulo de gerencia
│   │   │   ├── ManagerDashboard.jsx
│   │   │   ├── ProjectManager.jsx
│   │   │   ├── FinanceManager.jsx
│   │   │   ├── WorkerManager.jsx
│   │   │   ├── BudgetManager.jsx
│   │   │   └── InventoryManager.jsx
│   │   ├── client/       # Portal de clientes
│   │   │   └── ClientDashboard.jsx
│   │   ├── worker/       # Portal de trabajadores
│   │   │   └── WorkerPortal.jsx
│   │   ├── Home.jsx      # Página principal
│   │   ├── Services.jsx  # Servicios
│   │   ├── Portfolio.jsx # Portafolio
│   │   ├── Contact.jsx   # Contacto
│   │   ├── Careers.jsx   # Carreras
│   │   └── Login.jsx     # Autenticación
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos globales
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos base
├── electron/             # Configuración de Electron
│   └── main.cjs          # Proceso principal de Electron
├── .gitignore            # Archivos ignorados por Git
├── package.json          # Dependencias y scripts
├── vite.config.js        # Configuración de Vite
├── eslint.config.js      # Configuración de ESLint
├── ARCHITECTURE_PLAN.md  # Plan de arquitectura
├── ERP_DOCUMENTATION.md  # Documentación del ERP
└── README.md             # Este archivo
```

## 🎯 Módulos Principales

### 1. **Módulo de Administración** (`/admin`)
- **Dashboard**: Vista general del sistema
- **CMS Manager**: Gestión de contenido del sitio web
- **Quotations Manager**: Administración de cotizaciones
- **Settings Manager**: Configuración del sistema

### 2. **Módulo de Gerencia** (`/manager`)
- **Project Manager**: Gestión de proyectos y tareas
- **Finance Manager**: Control financiero y transacciones
- **Worker Manager**: Administración de personal
- **Budget Manager**: Creación y seguimiento de presupuestos
- **Inventory Manager**: Control de inventario y materiales

### 3. **Portal de Clientes** (`/client`)
- Visualización de proyectos asignados
- Seguimiento de presupuestos
- Comunicación con la empresa

### 4. **Portal de Trabajadores** (`/worker`)
- Visualización de tareas asignadas
- Registro de avances
- Comunicación con gerencia

### 5. **Sitio Web Público**
- **Home**: Página principal con información de la empresa
- **Services**: Servicios ofrecidos
- **Portfolio**: Proyectos realizados
- **Contact**: Formulario de contacto
- **Careers**: Oportunidades laborales

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura hexagonal** (Ports and Adapters) con separación clara de responsabilidades:

- **Presentación**: Componentes React y páginas
- **Lógica de Negocio**: Context API para gestión de estado
- **Datos**: Preparado para integración con API REST o GraphQL

### Patrones de Diseño Utilizados

- **Context API**: Gestión de estado global
- **Protected Routes**: Control de acceso basado en roles
- **Component Composition**: Reutilización de componentes
- **Responsive Design**: Mobile-first approach

## 🔐 Sistema de Autenticación

El sistema incluye autenticación con diferentes niveles de acceso:

- **Admin**: Acceso completo al sistema
- **Manager**: Gestión operativa
- **Client**: Vista de proyectos propios
- **Worker**: Vista de tareas asignadas

## 🎨 Guía de Estilos

### Colores Principales

```css
--primary: #2563eb      /* Azul principal */
--secondary: #7c3aed    /* Púrpura */
--accent: #f59e0b       /* Ámbar */
--dark: #1e293b         /* Oscuro */
--light: #f8fafc        /* Claro */
```

### Tipografía

- **Fuente Principal**: Inter, system-ui, sans-serif
- **Fuente Secundaria**: Outfit (para títulos)

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px)

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px)

/* Desktop */
@media (min-width: 1025px)
```

## 🤝 Contribución

Este es un proyecto privado. Si eres parte del equipo de desarrollo:

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Realiza tus cambios y haz commit: `git commit -m 'Añadir nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

### Convenciones de Commits

```
feat: Nueva característica
fix: Corrección de bug
docs: Cambios en documentación
style: Cambios de formato (no afectan el código)
refactor: Refactorización de código
test: Añadir o modificar tests
chore: Tareas de mantenimiento
```

## 📄 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados.

## 👥 Equipo

- **Desarrollador Principal**: Daniel Olivares
- **Email**: exneik29@gmail.com

## 📞 Soporte

Para soporte técnico o consultas, contactar a:
- **Email**: exneik29@gmail.com
- **GitHub**: [@exneik29-design](https://github.com/exneik29-design)

---

**Desarrollado con ❤️ por el equipo de Nexus**

*Última actualización: Diciembre 2025*
