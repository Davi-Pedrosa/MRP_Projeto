import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';
import AddIcon from '@mui/icons-material/Add';

interface NonConformity {
    id: number;
    date: Date;
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    status: 'open' | 'in_progress' | 'resolved';
    assignedTo: string;
    resolution?: string;
}

interface NonConformityLogProps {
    nonConformities: NonConformity[];
    onAddNonConformity: (nonConformity: Omit<NonConformity, 'id'>) => void;
    onUpdateStatus: (id: number, status: NonConformity['status']) => void;
}

export default function NonConformityLog({
    nonConformities,
    onAddNonConformity,
    onUpdateStatus,
}: NonConformityLogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newNonConformity, setNewNonConformity] = useState<Omit<NonConformity, 'id'>>({
        date: new Date(),
        type: '',
        description: '',
        severity: 'low',
        status: 'open',
        assignedTo: '',
    });

    const handleSubmit = () => {
        onAddNonConformity(newNonConformity);
        setIsDialogOpen(false);
        setNewNonConformity({
            date: new Date(),
            type: '',
            description: '',
            severity: 'low',
            status: 'open',
            assignedTo: '',
        });
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high':
                return '#ff3333';
            case 'medium':
                return '#ffa726';
            default:
                return '#1DB954';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'resolved':
                return '#1DB954';
            case 'in_progress':
                return '#ffa726';
            default:
                return '#ff3333';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'resolved':
                return 'Resolvido';
            case 'in_progress':
                return 'Em Andamento';
            default:
                return 'Aberto';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#1DB954' }}>
                    Registro de Não Conformidades
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsDialogOpen(true)}
                    sx={{
                        backgroundColor: '#1DB954',
                        '&:hover': {
                            backgroundColor: '#18a449',
                        },
                    }}
                >
                    Nova Não Conformidade
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Severidade</TableCell>
                            <TableCell>Responsável</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nonConformities.map((nc) => (
                            <TableRow key={nc.id}>
                                <TableCell>
                                    {nc.date.toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell>{nc.type}</TableCell>
                                <TableCell>{nc.description}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={nc.severity.charAt(0).toUpperCase() + nc.severity.slice(1)}
                                        sx={{
                                            backgroundColor: getSeverityColor(nc.severity),
                                            color: 'white',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{nc.assignedTo}</TableCell>
                                <TableCell>
                                    <FormControl size="small">
                                        <Select
                                            value={nc.status}
                                            onChange={(e) => onUpdateStatus(nc.id, e.target.value as NonConformity['status'])}
                                            sx={{
                                                backgroundColor: getStatusColor(nc.status),
                                                color: 'white',
                                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                                            }}
                                        >
                                            <MenuItem value="open">Aberto</MenuItem>
                                            <MenuItem value="in_progress">Em Andamento</MenuItem>
                                            <MenuItem value="resolved">Resolvido</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ backgroundColor: '#1DB954', color: 'white' }}>
                    Nova Não Conformidade
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DateTimePicker
                                    label="Data e Hora"
                                    value={newNonConformity.date}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setNewNonConformity(prev => ({ ...prev, date: newValue }));
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tipo"
                                value={newNonConformity.type}
                                onChange={(e) => setNewNonConformity(prev => ({ ...prev, type: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Descrição"
                                value={newNonConformity.description}
                                onChange={(e) => setNewNonConformity(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Severidade</InputLabel>
                                <Select
                                    value={newNonConformity.severity}
                                    label="Severidade"
                                    onChange={(e) => setNewNonConformity(prev => ({
                                        ...prev,
                                        severity: e.target.value as NonConformity['severity']
                                    }))}
                                >
                                    <MenuItem value="low">Baixa</MenuItem>
                                    <MenuItem value="medium">Média</MenuItem>
                                    <MenuItem value="high">Alta</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Responsável"
                                value={newNonConformity.assignedTo}
                                onChange={(e) => setNewNonConformity(prev => ({ ...prev, assignedTo: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#1DB954',
                            '&:hover': {
                                backgroundColor: '#18a449',
                            },
                        }}
                    >
                        Registrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 