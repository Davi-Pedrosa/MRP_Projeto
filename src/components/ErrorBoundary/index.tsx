import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate, useRouteError } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorBoundary = () => {
    const error = useRouteError() as Error;
    const navigate = useNavigate();

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    gap: 2
                }}
            >
                <ErrorIcon sx={{ fontSize: 60, color: '#d32f2f' }} />
                <Typography variant="h4" gutterBottom>
                    Ops! Algo deu errado
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {error?.message || 'Ocorreu um erro inesperado.'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate(-1)}
                        sx={{ backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#18a34b' } }}
                    >
                        Voltar
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{ 
                            borderColor: '#1DB954', 
                            color: '#1DB954',
                            '&:hover': { 
                                borderColor: '#18a34b',
                                backgroundColor: 'rgba(29, 185, 84, 0.04)'
                            } 
                        }}
                    >
                        Ir para Home
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ErrorBoundary; 