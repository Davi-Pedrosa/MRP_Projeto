import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Card,
    CardContent,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TimelineIcon from '@mui/icons-material/Timeline';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartTooltip,
    Legend
);

interface QualityReport {
    id: number;
    productId: string;
    productName: string;
    batchNumber: string;
    defectType: string;
    description: string;
    reportedAt: Date;
    status: 'pending' | 'reviewing' | 'resolved';
    resolution?: string;
}

export default function QualityAdmin() {
    // Dados simulados
    const [reports] = useState<QualityReport[]>([
        {
            id: 1,
            productId: 'CPU001',
            productName: 'Processador i7',
            batchNumber: 'L123',
            defectType: 'Falha Funcional',
            description: 'Frequência instável durante testes',
            reportedAt: new Date('2024-03-20T10:30:00'),
            status: 'pending'
        },
        {
            id: 2,
            productId: 'MB002',
            productName: 'Placa-mãe Gaming',
            batchNumber: 'L124',
            defectType: 'Defeito Visual',
            description: 'Arranhões na superfície',
            reportedAt: new Date('2024-03-20T09:15:00'),
            status: 'reviewing'
        },
        // Adicione mais exemplos conforme necessário
    ]);

    const [selectedReport, setSelectedReport] = useState<QualityReport | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [resolution, setResolution] = useState('');
    const [filter, setFilter] = useState('all');

    const handleOpenResolution = (report: QualityReport) => {
        setSelectedReport(report);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedReport(null);
        setOpenDialog(false);
        setResolution('');
    };

    const getStatusColor = (status: QualityReport['status']) => {
        switch (status) {
            case 'pending':
                return '#ff9800';
            case 'reviewing':
                return '#2196f3';
            case 'resolved':
                return '#4caf50';
            default:
                return '#666';
        }
    };

    const getStatusText = (status: QualityReport['status']) => {
        switch (status) {
            case 'pending':
                return 'Pendente';
            case 'reviewing':
                return 'Em Análise';
            case 'resolved':
                return 'Resolvido';
            default:
                return status;
        }
    };

    // Dados para o gráfico
    const chartData = {
        labels: ['Defeito Visual', 'Falha Funcional', 'Dimensões Incorretas', 'Outros'],
        datasets: [
            {
                label: 'Quantidade de Problemas',
                data: [4, 6, 2, 3],
                backgroundColor: '#1DB95480',
                borderColor: '#1DB954',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Distribuição de Problemas por Tipo',
            },
        },
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gestão de Qualidade
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Total de Problemas
                                </Typography>
                                <Typography variant="h4">
                                    15
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Pendentes
                                </Typography>
                                <Typography variant="h4" sx={{ color: '#ff9800' }}>
                                    7
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Taxa de Resolução
                                </Typography>
                                <Typography variant="h4" sx={{ color: '#4caf50' }}>
                                    53%
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                {/* Gráfico */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Bar options={chartOptions} data={chartData} />
                    </Paper>
                </Grid>

                {/* Lista de Problemas */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">
                                Problemas Reportados
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Filtrar</InputLabel>
                                    <Select
                                        value={filter}
                                        label="Filtrar"
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <MenuItem value="all">Todos</MenuItem>
                                        <MenuItem value="pending">Pendentes</MenuItem>
                                        <MenuItem value="reviewing">Em Análise</MenuItem>
                                        <MenuItem value="resolved">Resolvidos</MenuItem>
                                    </Select>
                                </FormControl>
                                <Tooltip title="Mais Filtros">
                                    <IconButton>
                                        <FilterListIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Grid container spacing={2}>
                            {reports.map((report) => (
                                <Grid item xs={12} key={report.id}>
                                    <Paper sx={{ p: 2 }}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item xs={12} sm={8}>
                                                <Box>
                                                    <Typography variant="h6">
                                                        {report.productName}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        ID: {report.productId} | Lote: {report.batchNumber}
                                                    </Typography>
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body1" component="div">
                                                            {report.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                                                <Box>
                                                    <Chip
                                                        label={getStatusText(report.status)}
                                                        sx={{
                                                            backgroundColor: getStatusColor(report.status),
                                                            color: 'white',
                                                            mb: 1
                                                        }}
                                                    />
                                                </Box>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => handleOpenResolution(report)}
                                                    startIcon={<AssignmentTurnedInIcon />}
                                                >
                                                    Resolver
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            {/* Dialog de Resolução */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Resolver Problema - {selectedReport?.productName}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Resolução"
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                            placeholder="Descreva a solução aplicada..."
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#1DB954',
                            '&:hover': { backgroundColor: '#18a449' }
                        }}
                    >
                        Confirmar Resolução
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
} 