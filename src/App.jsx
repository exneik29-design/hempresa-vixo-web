import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { OperationsProvider } from './context/OperationsContext';
import { CompanyProvider } from './context/CompanyContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// Admin Pages (Gestión Web)
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CMSManager from './pages/admin/CMSManager';
import QuotationsManager from './pages/admin/QuotationsManager';
import SettingsManager from './pages/admin/SettingsManager';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <OperationsProvider>
          <CompanyProvider>
            <Router>
              <Routes>
                {/* ==================================================================
                    SITIO WEB PÚBLICO (Marketing, Información, Contacto)
                    Acceso: Libre para todo el mundo
                   ================================================================== */}
                <Route path="/" element={<Home />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/portafolio" element={<Portfolio />} />
                <Route path="/empleo" element={<Careers />} />
                <Route path="/contacto" element={<Contact />} />

                {/* Login: Puerta de entrada al sistema */}
                <Route path="/login" element={<Login />} />

                {/* ==================================================================
                    PANEL WEB DE ADMINISTRACIÓN Y CLIENTES
                    Acceso: Requiere Login y Rol específico
                   ================================================================== */}

                {/* 1. Portal de Clientes - Ver cronogramas y proyectos */}
                <Route path="/client/dashboard" element={
                  <ProtectedRoute requiredRole="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                } />

                {/* 2. Panel de Administración Web - Gestión de cotizaciones y cronogramas */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="cms" element={<CMSManager />} />
                  <Route path="cotizaciones" element={<QuotationsManager />} />
                  <Route path="configuracion" element={<SettingsManager />} />
                </Route>
              </Routes>
            </Router>
          </CompanyProvider>
        </OperationsProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
