import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Tooltip,
    IconButton,
    Button,
    Fade,
    Zoom,
    useTheme,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    Info as InfoIcon,
    AttachMoney as MoneyIcon,
    Timeline as TimelineIcon,
    Add as AddIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FinancialMetrics {
    operationalCosts: {
        labor: number;
        materials: number;
        equipment: number;
        utilities: number;
        maintenance: number;
        total: number;
    };
    revenue: {
        totalSales: number;
        averageUnitPrice: number;
        unitsProduced: number;
    };
    grossProfit: number;
    netProfit: number;
    profitMargin: number;
}

// Dados simulados
const mockFinancialData: FinancialMetrics = {
    operationalCosts: {
        labor: 45000,
        materials: 75000,
        equipment: 15000,
        utilities: 8000,
        maintenance: 12000,
        total: 155000
    },
    revenue: {
        totalSales: 250000,
        averageUnitPrice: 2500,
        unitsProduced: 100
    },
    grossProfit: 95000,
    netProfit: 70000,
    profitMargin: 28
};

export default function Financial() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
        setIsLoading(true);
        // Simular carregamento
        setTimeout(() => setIsLoading(false), 1000);
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const getPerformanceColor = (value: number, threshold: number) => {
        return value >= threshold ? '#1DB954' : '#ff4444';
    };

    return (
        <Fade in={true} timeout={800}>
            <Box sx={{ p: 3 }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 4,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            color: '#1DB954', 
                            fontWeight: 'bold',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -8,
                                left: 0,
                                width: '60%',
                                height: 4,
                                backgroundColor: '#1DB954',
                                borderRadius: 2
                            }
                        }}
                    >
                        Análise Financeira
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon className={isLoading ? 'rotating' : ''} />}
                            onClick={handleRefresh}
                            sx={{ 
                                borderColor: '#1DB954',
                                color: '#1DB954',
                                '&:hover': {
                                    borderColor: '#18a34b',
                                    backgroundColor: 'rgba(29, 185, 84, 0.1)'
                                }
                            }}
                        >
                            Atualizar
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/financial-input')}
                            sx={{ 
                                bgcolor: '#1DB954',
                                '&:hover': {
                                    bgcolor: '#18a34b'
                                },
                                boxShadow: '0 4px 6px rgba(29, 185, 84, 0.2)'
                            }}
                        >
                            Adicionar Dados
                        </Button>
                    </Box>
                </Box>

                {/* Métricas Principais */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
                    gap: 3, 
                    mb: 4 
                }}>
                    {[
                        {
                            title: 'Lucro Bruto',
                            value: mockFinancialData.grossProfit,
                            icon: <MoneyIcon />,
                            trend: '+15% em relação ao mês anterior',
                            trendIcon: <TrendingUpIcon />,
                            trendColor: '#1DB954'
                        },
                        {
                            title: 'Lucro Líquido',
                            value: mockFinancialData.netProfit,
                            icon: <MoneyIcon />,
                            trend: `Margem de ${mockFinancialData.profitMargin}%`,
                            trendIcon: <TrendingUpIcon />,
                            trendColor: '#1DB954'
                        },
                        {
                            title: 'Custos Operacionais',
                            value: mockFinancialData.operationalCosts.total,
                            icon: <TimelineIcon />,
                            trend: '62% da receita total',
                            trendIcon: <TrendingDownIcon />,
                            trendColor: '#ff4444'
                        }
                    ].map((metric, index) => (
                        <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={metric.title}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                                }
                            }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ 
                                            color: '#1DB954',
                                            mr: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            p: 1,
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(29, 185, 84, 0.1)'
                                        }}>
                                            {metric.icon}
                                        </Box>
                                        <Typography variant="h6">{metric.title}</Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ 
                                        color: getPerformanceColor(metric.value, 0),
                                        fontWeight: 'bold'
                                    }}>
                                        {formatCurrency(metric.value)}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <Box sx={{ 
                                            color: metric.trendColor,
                                            mr: 1,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {metric.trendIcon}
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {metric.trend}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Zoom>
                    ))}
                </Box>

                {/* Detalhamento dos Custos Operacionais */}
                <Paper sx={{ 
                    p: 3, 
                    mb: 4,
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
                        Detalhamento dos Custos Operacionais
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>% do Total</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(mockFinancialData.operationalCosts).map(([key, value]) => {
                                    if (key === 'total') return null;
                                    const percentage = (value / mockFinancialData.operationalCosts.total) * 100;
                                    return (
                                        <TableRow 
                                            key={key}
                                            hover
                                            sx={{
                                                transition: 'background-color 0.2s',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(29, 185, 84, 0.05)'
                                                }
                                            }}
                                        >
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    <Tooltip title="Detalhes sobre este custo" arrow>
                                                        <IconButton size="small">
                                                            <InfoIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{formatCurrency(value)}</TableCell>
                                            <TableCell align="right">{percentage.toFixed(1)}%</TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={percentage > 30 ? 'Alto' : percentage > 15 ? 'Médio' : 'Baixo'}
                                                    color={percentage > 30 ? 'error' : percentage > 15 ? 'warning' : 'success'}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {/* Indicadores de Produção */}
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
                        Indicadores de Produção
                    </Typography>
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
                        gap: 3 
                    }}>
                        {[
                            {
                                title: 'Unidades Produzidas',
                                value: mockFinancialData.revenue.unitsProduced,
                                format: (v: number) => v.toString()
                            },
                            {
                                title: 'Preço Médio por Unidade',
                                value: mockFinancialData.revenue.averageUnitPrice,
                                format: formatCurrency
                            },
                            {
                                title: 'Receita Total',
                                value: mockFinancialData.revenue.totalSales,
                                format: formatCurrency
                            }
                        ].map((indicator, index) => (
                            <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={indicator.title}>
                                <Card sx={{
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                                    }
                                }}>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {indicator.title}
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1DB954' }}>
                                            {indicator.format(indicator.value)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Zoom>
                        ))}
                    </Box>
                </Paper>

                <style>{`
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .rotating {
                        animation: rotate 1s linear infinite;
                    }
                `}</style>
            </Box>
        </Fade>
    );
} 