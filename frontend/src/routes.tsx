import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard, AdminGuard } from './components/auth/AuthGuard';
import HomePage from './pages/HomePage';
import DesignerPage from './pages/DesignerPage';
import CatalogPage from './pages/CatalogPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/designer" element={<DesignerPage />} />
      <Route path="/designer/:modelId" element={<DesignerPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      
      {/* Rotas protegidas */}
      <Route path="/checkout" element={
        <AuthGuard>
          <CheckoutPage />
        </AuthGuard>
      } />
      
      <Route path="/dashboard" element={
        <AuthGuard>
          <DashboardPage />
        </AuthGuard>
      } />
      
      <Route path="/admin/*" element={
        <AdminGuard>
          <AdminPage />
        </AdminGuard>
      } />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage initialTab="register" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;