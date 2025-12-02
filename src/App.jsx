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
import WorkerPortal from './pages/worker/WorkerPortal';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CMSManager from './pages/admin/CMSManager';
import QuotationsManager from './pages/admin/QuotationsManager';
import SettingsManager from './pages/admin/SettingsManager';

// Manager Pages (ERP Software)
import ManagerLayout from './pages/manager/ManagerLayout';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import BudgetManager from './pages/manager/BudgetManager';
import ProjectManager from './pages/manager/ProjectManager';
import WorkerManager from './pages/manager/WorkerManager';
import FinanceManager from './pages/manager/FinanceManager';
import InventoryManager from './pages/manager/InventoryManager';

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
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/portal" element={<WorkerPortal />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/portafolio" element={<Portfolio />} />
                <Route path="/empleo" element={<Careers />} />
                <Route path="/contacto" element={<Contact />} />


                {/* Rutas Admin (CMS Web) */}
                <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="cms" element={<CMSManager />} />
                  <Route path="cotizaciones" element={<QuotationsManager />} />
                  <Route path="configuracion" element={<SettingsManager />} />
                </Route>

                {/* Rutas Manager (Software ERP Interno) */}
                <Route path="/manager" element={<ProtectedRoute requiredRole="admin"><ManagerLayout /></ProtectedRoute>}>
                  <Route index element={<ManagerDashboard />} />
                  <Route path="dashboard" element={<ManagerDashboard />} />
                  <Route path="budget" element={<BudgetManager />} />
                  <Route path="projects" element={<ProjectManager />} />
                  <Route path="workers" element={<WorkerManager />} />
                  <Route path="finance" element={<FinanceManager />} />
                  <Route path="inventory" element={<InventoryManager />} />
                </Route>

                {/* Rutas Cliente */}
                <Route path="/client/dashboard" element={<ProtectedRoute requiredRole="client"><ClientDashboard /></ProtectedRoute>} />
              </Routes>
            </Router>
          </CompanyProvider>
        </OperationsProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
