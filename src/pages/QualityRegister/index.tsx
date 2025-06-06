import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Snackbar,
    Card,
    CardContent,
    Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import ptBR from 'date-fns/locale/pt-BR';

interface QualityReport {
    id: number;
    productId: string;
    productName: string;
    batchNumber: string;
    defectType: string;
    description: string;
    reportedAt: Date;
    status: 'pending' | 'reviewing' | 'resolved';
}

export default function QualityRegister() {
    const [reports, setReports] = useState<QualityReport[]>([]);
    const [newReport, setNewReport] = useState({
        productId: '',
        productName: '',
        batchNumber: '',
        defectType: '',
        description: '',
        reportedAt: new Date(),
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const defectTypes = [
        'Defeito Visual',
        'Falha Funcional',
        'Dimensões Incorretas',
        'Componente Danificado',
        'Montagem Incorreta',
        'Problema de Software',
        'Outro'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const report: QualityReport = {
            id: Date.now(),
            ...newReport,
            status: 'pending'
        };
        setReports([report, ...reports]);
        setNewReport({
            productId: '',
            productName: '',
            batchNumber: '',
            defectType: '',
            description: '',
            reportedAt: new Date(),
        });
        setOpenSnackbar(true);
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

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Registro de Qualidade
            </Typography>

            <Grid container spacing={3}>
                {/* Formulário de Registro */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Novo Registro
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="ID do Produto"
                                        value={newReport.productId}
                                        onChange={(e) => setNewReport({...newReport, productId: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Nome do Produto"
                                        value={newReport.productName}
                                        onChange={(e) => setNewReport({...newReport, productName: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Número do Lote"
                                        value={newReport.batchNumber}
                                        onChange={(e) => setNewReport({...newReport, batchNumber: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Tipo de Defeito</InputLabel>
                                        <Select
                                            value={newReport.defectType}
                                            label="Tipo de Defeito"
                                            onChange={(e) => setNewReport({...newReport, defectType: e.target.value})}
                                        >
                                            {defectTypes.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Descrição do Problema"
                                        value={newReport.description}
                                        onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                        <DateTimePicker
                                            label="Data e Hora"
                                            value={newReport.reportedAt}
                                            onChange={(newValue) => {
                                                if (newValue) {
                                                    setNewReport({...newReport, reportedAt: newValue});
                                                }
                                            }}
                                            sx={{ width: '100%' }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{ 
                                            mt: 2,
                                            backgroundColor: '#1DB954',
                                            '&:hover': { backgroundColor: '#18a449' }
                                        }}
                                    >
                                        Registrar Problema
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* Lista de Registros */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Registros Recentes
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {reports.map((report) => (
                                <Box key={report.id} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" component="div">
                                                {report.productName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="div">
                                                ID: {report.productId} | Lote: {report.batchNumber}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" component="div">
                                                {report.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="caption" component="div">
                                                    {report.reportedAt.toLocaleString('pt-BR')}
                                                </Typography>
                                                <Chip
                                                    label={getStatusText(report.status)}
                                                    sx={{
                                                        backgroundColor: getStatusColor(report.status),
                                                        color: 'white'
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert 
                    onClose={() => setOpenSnackbar(false)} 
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Problema registrado com sucesso!
                </Alert>
            </Snackbar>
        </Container>
    );
} 