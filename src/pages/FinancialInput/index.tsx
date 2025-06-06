import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { financialService } from '../../services/api';

interface FormData {
    operationalCosts: {
        labor: string;
        materials: string;
        equipment: string;
        utilities: string;
        maintenance: string;
    };
    revenue: {
        totalSales: string;
        averageUnitPrice: string;
        unitsProduced: string;
    };
}

export default function FinancialInput() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        operationalCosts: {
            labor: '',
            materials: '',
            equipment: '',
            utilities: '',
            maintenance: ''
        },
        revenue: {
            totalSales: '',
            averageUnitPrice: '',
            unitsProduced: ''
        }
    });

    const handleCostChange = (field: keyof typeof formData.operationalCosts) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            operationalCosts: {
                ...prev.operationalCosts,
                [field]: event.target.value
            }
        }));
    };

    const handleRevenueChange = (field: keyof typeof formData.revenue) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            revenue: {
                ...prev.revenue,
                [field]: event.target.value
            }
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Converter strings para números
            const numericalData = {
                operationalCosts: {
                    labor: Number(formData.operationalCosts.labor),
                    materials: Number(formData.operationalCosts.materials),
                    equipment: Number(formData.operationalCosts.equipment),
                    utilities: Number(formData.operationalCosts.utilities),
                    maintenance: Number(formData.operationalCosts.maintenance),
                    total: 0 // Será calculado no backend
                },
                revenue: {
                    totalSales: Number(formData.revenue.totalSales),
                    averageUnitPrice: Number(formData.revenue.averageUnitPrice),
                    unitsProduced: Number(formData.revenue.unitsProduced)
                }
            };

            await financialService.updateFinancialData(numericalData);
            setSuccess(true);
            
            // Limpar formulário após sucesso
            setFormData({
                operationalCosts: {
                    labor: '',
                    materials: '',
                    equipment: '',
                    utilities: '',
                    maintenance: ''
                },
                revenue: {
                    totalSales: '',
                    averageUnitPrice: '',
                    unitsProduced: ''
                }
            });
        } catch (err) {
            setError('Erro ao enviar dados. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 4, color: '#1DB954', fontWeight: 'bold' }}>
                Entrada de Dados Financeiros
            </Typography>

            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Dados enviados com sucesso!
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Custos Operacionais
                    </Typography>
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3
                    }}>
                        <TextField
                            fullWidth
                            label="Mão de obra"
                            type="number"
                            value={formData.operationalCosts.labor}
                            onChange={handleCostChange('labor')}
                            required
                            InputProps={{
                                startAdornment: 'R$'
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Materiais"
                            type="number"
                            value={formData.operationalCosts.materials}
                            onChange={handleCostChange('materials')}
                            required
                            InputProps={{
                                startAdornment: 'R$'
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Equipamentos"
                            type="number"
                            value={formData.operationalCosts.equipment}
                            onChange={handleCostChange('equipment')}
                            required
                            InputProps={{
                                startAdornment: 'R$'
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Utilidades"
                            type="number"
                            value={formData.operationalCosts.utilities}
                            onChange={handleCostChange('utilities')}
                            required
                            InputProps={{
                                startAdornment: 'R$'
                            }}
                        />
                        <TextField
                            sx={{ gridColumn: '1 / -1' }}
                            fullWidth
                            label="Manutenção"
                            type="number"
                            value={formData.operationalCosts.maintenance}
                            onChange={handleCostChange('maintenance')}
                            required
                            InputProps={{
                                startAdornment: 'R$'
                            }}
                        />
                    </Box>
                </Paper>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Dados de Receita
                    </Typography>
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3
                    }}>
                        <TextField
                            fullWidth
                            label="Vendas Totais"
                            type="number"
                            value={formData.revenue.totalSales}
                            onChange={handleRevenueChange('totalSales')}
                            required
                            InputProps={{
                                startAdornment: 'R$'
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Preço Médio por Unidade"
                            type="number"
                            value={formData.revenue.averageUnitPrice}
                            onChange={handleRevenueChange('averageUnitPrice')}
                            required
                            InputProps={{
                                startAdornment: 'R$'
                            }}
                        />
                        <TextField
                            sx={{ gridColumn: '1 / -1' }}
                            fullWidth
                            label="Unidades Produzidas"
                            type="number"
                            value={formData.revenue.unitsProduced}
                            onChange={handleRevenueChange('unitsProduced')}
                            required
                        />
                    </Box>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                        sx={{ 
                            bgcolor: '#1DB954',
                            '&:hover': {
                                bgcolor: '#18a34b'
                            }
                        }}
                    >
                        {loading ? 'Enviando...' : 'Enviar Dados'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
} 