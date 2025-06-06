import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Link,
    Divider,
} from '@mui/material';

export default function AppFooter() {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    if (isLoginPage) {
        return null;
    }

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {currentYear} MRP2 System. Todos os direitos reservados.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            mt: { xs: 2, sm: 0 },
                        }}
                    >
                        <Link
                            href="#"
                            color="inherit"
                            sx={{
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': {
                                    color: '#1DB954',
                                },
                            }}
                        >
                            Sobre
                        </Link>
                        <Link
                            href="#"
                            color="inherit"
                            sx={{
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': {
                                    color: '#1DB954',
                                },
                            }}
                        >
                            Ajuda
                        </Link>
                        <Link
                            href="#"
                            color="inherit"
                            sx={{
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': {
                                    color: '#1DB954',
                                },
                            }}
                        >
                            Contato
                        </Link>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                    display="block"
                >
                    Versão 1.0.0 | Desenvolvido com ❤️
                </Typography>
            </Container>
        </Box>
    );
} 