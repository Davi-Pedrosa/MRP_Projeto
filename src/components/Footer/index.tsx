import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Footer = () => {
    const location = useLocation();
    const { userType } = useAuth();

    const getFooterTitle = () => {
        switch (userType) {
            case 'admin':
                return 'MRP2 - Área Administrativa';
            case 'maintenance':
                return 'MRP2 - Área de Manutenção';
            case 'employee':
                return 'MRP2 - Área do Funcionário';
            default:
                return 'MRP2';
        }
    };

    if (location.pathname === '/login') {
        return null;
    }

    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                backgroundColor: '#1DB954',
                color: 'white',
                mt: 'auto'
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ 
                    py: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} {getFooterTitle()}
                    </Typography>
                    <Typography variant="body2">
                        Versão 1.0.0
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 