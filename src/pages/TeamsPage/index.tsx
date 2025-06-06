import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
} from '@mui/material';
import TeamStatusTable from '../../components/TeamStatusTable';

export default function TeamsPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Cabeçalho */}
            <Paper sx={{ p: 2, backgroundColor: '#1DB954', color: 'white', mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Relatório de Equipes
                </Typography>
                <Typography variant="subtitle1">
                    Acompanhamento em tempo real do desempenho das equipes
                </Typography>
            </Paper>

            {/* Tabela de Status das Equipes */}
            <Paper sx={{ 
                p: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}>
                <Typography variant="h6" sx={{ 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&::before': {
                        content: '""',
                        width: 4,
                        height: 24,
                        backgroundColor: '#1DB954',
                        borderRadius: 2
                    }
                }}>
                    Status das Equipes
                </Typography>
                <TeamStatusTable />
            </Paper>
        </Container>
    );
} 