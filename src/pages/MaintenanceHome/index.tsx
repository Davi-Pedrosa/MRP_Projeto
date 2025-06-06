import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Chip,
    LinearProgress
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAuth } from '../../contexts/AuthContext';

const MaintenanceHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const navigationButtons = [
        {
            title: 'Pedidos de Manutenção',
            description: 'Visualize e gerencie todos os pedidos de manutenção',
            icon: <AssignmentIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
            path: '/maintenance-requests'
        }
    ];

    const stats = [
        {
            title: 'Pedidos Pendentes',
            value: 5,
            icon: <PendingIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
            color: '#ff9800'
        },
        {
            title: 'Em Andamento',
            value: 3,
            icon: <BuildIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
            color: '#2196f3'
        },
        {
            title: 'Concluídos Hoje',
            value: 8,
            icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
            color: '#4caf50'
        },
        {
            title: 'Tempo Médio',
            value: '2h 30min',
            icon: <ScheduleIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
            color: '#9c27b0'
        }
    ];

    const recentRequests = [
        {
            id: 'REQ001',
            equipment: 'Torno CNC',
            priority: 'Alta',
            status: 'Pendente',
            requestedAt: '2024-03-20 09:30'
        },
        {
            id: 'REQ002',
            equipment: 'Fresadora',
            priority: 'Média',
            status: 'Em Andamento',
            requestedAt: '2024-03-20 10:15'
        },
        {
            id: 'REQ003',
            equipment: 'Prensa Hidráulica',
            priority: 'Baixa',
            status: 'Pendente',
            requestedAt: '2024-03-20 11:00'
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'alta':
                return '#f44336';
            case 'média':
                return '#ff9800';
            case 'baixa':
                return '#4caf50';
            default:
                return '#757575';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pendente':
                return '#ff9800';
            case 'em andamento':
                return '#2196f3';
            case 'concluído':
                return '#4caf50';
            default:
                return '#757575';
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 4 }}>
                <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{ 
                        color: '#1DB954',
                        fontWeight: 'bold',
                        mb: 4,
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: 0,
                            width: '60px',
                            height: '4px',
                            backgroundColor: '#1DB954',
                            borderRadius: '2px'
                        }
                    }}
                >
                    Bem-vindo, {user?.name}
                </Typography>

                {/* Botões de Navegação */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {navigationButtons.map((button) => (
                        <Grid item xs={12} md={4} key={button.title}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'translateY(-5px)'
                                    }
                                }}
                                onClick={() => navigate(button.path)}
                            >
                                <CardContent sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    p: 3
                                }}>
                                    {button.icon}
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            color: '#1DB954',
                                            mt: 2,
                                            mb: 1,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {button.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {button.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Estatísticas */}
                <Typography 
                    variant="h5" 
                    sx={{ 
                        mb: 3,
                        color: '#1DB954',
                        fontWeight: 'bold'
                    }}
                >
                    Visão Geral
                </Typography>

                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {stats.map((stat) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.title}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)'
                                    }
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        {stat.icon}
                                        <Typography 
                                            variant="h4" 
                                            sx={{ 
                                                ml: 2,
                                                color: stat.color,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Typography 
                                        variant="body1"
                                        sx={{ 
                                            color: 'text.secondary',
                                            fontWeight: 500
                                        }}
                                    >
                                        {stat.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Pedidos Recentes */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#1DB954',
                            fontWeight: 'bold'
                        }}
                    >
                        Pedidos Recentes
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {recentRequests.map((request) => (
                        <Grid item xs={12} md={4} key={request.id}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'translateY(-5px)'
                                    }
                                }}
                                onClick={() => navigate('/maintenance-requests')}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" sx={{ color: '#1DB954' }}>
                                            {request.equipment}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {request.id}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                        <Chip 
                                            label={request.priority}
                                            size="small"
                                            sx={{ 
                                                backgroundColor: getPriorityColor(request.priority),
                                                color: 'white'
                                            }}
                                        />
                                        <Chip 
                                            label={request.status}
                                            size="small"
                                            sx={{ 
                                                backgroundColor: getStatusColor(request.status),
                                                color: 'white'
                                            }}
                                        />
                                    </Box>

                                    <Typography variant="body2" color="text.secondary">
                                        Solicitado em: {request.requestedAt}
                                    </Typography>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Progresso
                                        </Typography>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={request.status === 'Em Andamento' ? 50 : 0}
                                            sx={{ 
                                                mt: 1,
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#1DB954'
                                                }
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default MaintenanceHome; 