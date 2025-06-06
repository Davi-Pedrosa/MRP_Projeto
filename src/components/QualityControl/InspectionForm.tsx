import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Paper,
    Grid,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';

interface InspectionFormProps {
    onSubmit: (inspection: InspectionData) => void;
}

export interface InspectionData {
    date: Date;
    type: string;
    inspector: string;
    observations: string;
    result: 'approved' | 'rejected' | 'pending';
    measures: {
        dimension: string;
        value: number;
        tolerance: number;
    }[];
}

export default function InspectionForm({ onSubmit }: InspectionFormProps) {
    const [inspection, setInspection] = useState<InspectionData>({
        date: new Date(),
        type: '',
        inspector: '',
        observations: '',
        result: 'pending',
        measures: [{ dimension: '', value: 0, tolerance: 0 }],
    });

    const handleAddMeasure = () => {
        setInspection(prev => ({
            ...prev,
            measures: [...prev.measures, { dimension: '', value: 0, tolerance: 0 }],
        }));
    };

    const handleMeasureChange = (index: number, field: string, value: string | number) => {
        const newMeasures = [...inspection.measures];
        newMeasures[index] = {
            ...newMeasures[index],
            [field]: value,
        };
        setInspection(prev => ({
            ...prev,
            measures: newMeasures,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inspection);
        // Reset form
        setInspection({
            date: new Date(),
            type: '',
            inspector: '',
            observations: '',
            result: 'pending',
            measures: [{ dimension: '', value: 0, tolerance: 0 }],
        });
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1DB954' }}>
                Nova Inspeção de Qualidade
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                            <DateTimePicker
                                label="Data e Hora"
                                value={inspection.date}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setInspection(prev => ({ ...prev, date: newValue }));
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Inspeção</InputLabel>
                            <Select
                                value={inspection.type}
                                label="Tipo de Inspeção"
                                onChange={(e) => setInspection(prev => ({ ...prev, type: e.target.value }))}
                            >
                                <MenuItem value="dimensional">Dimensional</MenuItem>
                                <MenuItem value="visual">Visual</MenuItem>
                                <MenuItem value="functional">Funcional</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Inspetor"
                            value={inspection.inspector}
                            onChange={(e) => setInspection(prev => ({ ...prev, inspector: e.target.value }))}
                        />
                    </Grid>
                    
                    {inspection.measures.map((measure, index) => (
                        <Grid item xs={12} key={index} container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Dimensão"
                                    value={measure.dimension}
                                    onChange={(e) => handleMeasureChange(index, 'dimension', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Valor"
                                    value={measure.value}
                                    onChange={(e) => handleMeasureChange(index, 'value', Number(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Tolerância ±"
                                    value={measure.tolerance}
                                    onChange={(e) => handleMeasureChange(index, 'tolerance', Number(e.target.value))}
                                />
                            </Grid>
                        </Grid>
                    ))}
                    
                    <Grid item xs={12}>
                        <Button
                            type="button"
                            onClick={handleAddMeasure}
                            sx={{ mb: 2 }}
                        >
                            Adicionar Medição
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Observações"
                            value={inspection.observations}
                            onChange={(e) => setInspection(prev => ({ ...prev, observations: e.target.value }))}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Resultado</InputLabel>
                            <Select
                                value={inspection.result}
                                label="Resultado"
                                onChange={(e) => setInspection(prev => ({ 
                                    ...prev, 
                                    result: e.target.value as 'approved' | 'rejected' | 'pending'
                                }))}
                            >
                                <MenuItem value="approved">Aprovado</MenuItem>
                                <MenuItem value="rejected">Reprovado</MenuItem>
                                <MenuItem value="pending">Pendente</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#1DB954',
                                '&:hover': {
                                    backgroundColor: '#18a449',
                                },
                            }}
                        >
                            Registrar Inspeção
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
} 