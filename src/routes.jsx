import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminProductsPage from './pages/AdminProductsPage';

import PublicRoute from './components/routes/PublicRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));
const MyCartPage = lazy(() => import('./pages/MyCartPage'));
const InventoryPage = lazy(() => import('./pages/InventoryPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const SuppliersPage = lazy(() => import('./pages/SuppliersPage'));
const PurchasesPage = lazy(() => import('./pages/PurchasesPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }
      />
      <Route
        path="/about-us"
        element={
          <PublicRoute>
            <AboutUsPage />   
          </PublicRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PublicRoute>
            <ProductsPage />
          </PublicRoute>
        }
      />

      {/* Admin products route - single page for admin dashboard */}
      <Route
        path="/admin-products"
        element={
          <AppLayout>
            {/* Single admin products page with table */}
            <AdminProductsPage />
          </AppLayout>
        }
      />
      <Route
        path="/contact-us"
        element={
          <PublicRoute>
            <ContactUsPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* User Dashboard Route */}
      <Route
        path="/user-dashboard"
        element={
          // Render the user dashboard inside the admin AppLayout so it shows the sidebar/topbar
          <AppLayout>
            <UserDashboardPage />
          </AppLayout>
        }
      />
      {/* My Cart Route */}
      <Route
        path="/my-cart"
        element={
          <PublicRoute>
            <MyCartPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes with Layout */}
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          // <ProtectedRoute>
            <AppLayout>
              <InventoryPage />
            </AppLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          // <ProtectedRoute>
            <AppLayout>
              <OrdersPage />
            </AppLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          // <ProtectedRoute>
            <AppLayout>
              <OrderDetailsPage />
            </AppLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          // <ProtectedRoute requiredRoles={['admin']}>
            <AppLayout>
              <SuppliersPage />
            </AppLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/purchases"
        element={
          // <ProtectedRoute requiredRoles={['admin', 'staff']}>
            <AppLayout>
              <PurchasesPage />
            </AppLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          // <ProtectedRoute requiredRoles={['admin']}>
            <AppLayout>
              <ReportsPage />
            </AppLayout>
          // </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
