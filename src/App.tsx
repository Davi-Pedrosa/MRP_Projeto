import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TimerProvider } from './contexts/TimerContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';

// Pages
import MaintenanceHome from './pages/MaintenanceHome';
import MaintenanceRequests from './pages/MaintenanceRequests';
import AdminHome from './pages/AdminHome';
import EmployeeHome from './pages/EmployeeHome';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import Planning from './pages/Planning';
import TeamsManagement from './pages/TeamsManagement';
import Inventory from './pages/Inventory';
import QualityAdmin from './pages/QualityAdmin';
import QualityRegister from './pages/QualityRegister';
import Financial from './pages/Financial';
import FinancialInput from './pages/FinancialInput';
import Maintenance from './pages/Maintenance';
import Settings from './pages/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = localStorage.getItem('user');
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

// Root Component
const Root = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />;
    }

    return <Navigate to={`/${user.papel.toLowerCase()}-home`} />;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <TimerProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            <Route path="/" element={<Root />} />
                            
                            {/* Admin Routes */}
                            <Route 
                                path="/admin-home" 
                                element={
                                    <ProtectedRoute>
                                        <AdminHome />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/admin" 
                                element={
                                    <ProtectedRoute>
                                        <Admin />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/planning" 
                                element={
                                    <ProtectedRoute>
                                        <Planning />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/teams-management" 
                                element={
                                    <ProtectedRoute>
                                        <TeamsManagement />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/inventory" 
                                element={
                                    <ProtectedRoute>
                                        <Inventory />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/quality-admin" 
                                element={
                                    <ProtectedRoute>
                                        <QualityAdmin />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/financial" 
                                element={
                                    <ProtectedRoute>
                                        <Financial />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/maintenance" 
                                element={
                                    <ProtectedRoute>
                                        <Maintenance />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/settings" 
                                element={
                                    <ProtectedRoute>
                                        <Settings />
                                    </ProtectedRoute>
                                } 
                            />

                            {/* Employee Routes */}
                            <Route 
                                path="/employee-home" 
                                element={
                                    <ProtectedRoute>
                                        <EmployeeHome />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/employee" 
                                element={
                                    <ProtectedRoute>
                                        <Employee />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/quality-register" 
                                element={
                                    <ProtectedRoute>
                                        <QualityRegister />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/financial-input" 
                                element={
                                    <ProtectedRoute>
                                        <FinancialInput />
                                    </ProtectedRoute>
                                } 
                            />

                            {/* Maintenance Routes */}
                            <Route 
                                path="/maintenance-home" 
                                element={
                                    <ProtectedRoute>
                                        <MaintenanceHome />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/maintenance-requests" 
                                element={
                                    <ProtectedRoute>
                                        <MaintenanceRequests />
                                    </ProtectedRoute>
                                } 
                            />

                            {/* Fallback route */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </BrowserRouter>
                </TimerProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App; 