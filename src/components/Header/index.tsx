import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, userType } = useAuth();

    const getMenuItems = () => {
        switch (userType) {
            case 'admin':
                return [
                    { text: 'Home', path: '/admin-home' },
                    { text: 'Planejamento', path: '/planning' },
                    { text: 'Equipes', path: '/teams-management' },
                    { text: 'Inventário', path: '/inventory' },
                    { text: 'Qualidade', path: '/quality-admin' },
                    { text: 'Financeiro', path: '/financial' },
                    { text: 'Manutenção', path: '/maintenance' },
                    { text: 'Configurações', path: '/settings' }
                ];
            case 'maintenance':
                return [
                    { text: 'Home', path: '/maintenance-home' },
                    { text: 'Pedidos de Manutenção', path: '/maintenance-requests' }
                ];
            case 'employee':
                return [
                    { text: 'Home', path: '/employee-home' },
                    { text: 'Produção', path: '/employee' },
                    { text: 'Qualidade', path: '/quality-register' }
                ];
            default:
                return [];
        }
    };

    const getHeaderTitle = () => {
        switch (userType) {
            case 'admin':
                return 'MRP2 - Administração';
            case 'maintenance':
                return 'MRP2 - Manutenção';
            case 'employee':
                return 'MRP2 - Funcionário';
            default:
                return 'MRP2';
        }
    };

    const getHomePath = () => {
        switch (userType) {
            case 'admin':
                return '/admin-home';
            case 'maintenance':
                return '/maintenance-home';
            case 'employee':
                return '/employee-home';
            default:
                return '/';
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (location.pathname === '/login') {
        return null;
    }

    return (
        <>
            <AppBar 
                position="fixed" 
                sx={{ 
                    backgroundColor: '#1DB954',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: '0.5rem 0' }}>
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ 
                                cursor: 'pointer',
                                flexGrow: 0,
                                mr: 4,
                                fontWeight: 'bold',
                                letterSpacing: '0.5px',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}
                            onClick={() => navigate(getHomePath())}
                        >
                            {getHeaderTitle()}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                            {getMenuItems().map((item) => (
                                <Button
                                    key={item.path}
                                    color="inherit"
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        borderRadius: '8px',
                                        padding: '6px 16px',
                                        backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        textTransform: 'none',
                                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton 
                                color="inherit" 
                                size="small" 
                                sx={{ 
                                    '&:hover': { 
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                                    } 
                                }}
                            >
                                <PersonIcon />
                            </IconButton>
                            <IconButton 
                                color="inherit" 
                                size="small" 
                                onClick={handleLogout}
                                sx={{ 
                                    '&:hover': { 
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                                    } 
                                }}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default Header; 