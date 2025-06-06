import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

interface OrderEntryFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (dadosOrdem: {
        dataInicio: Date;
        dataFim: Date;
        observacoes: string;
    }) => void;
}

export default function FormularioOrdemProducao({ open, onClose, onSubmit }: OrderEntryFormProps) {
    const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
    const [dataFim, setDataFim] = useState<Date | null>(new Date());
    const [observacoes, setObservacoes] = useState('');

    const handleSubmit = () => {
        if (dataInicio && dataFim) {
            onSubmit({
                dataInicio,
                dataFim,
                observacoes
            });
            setObservacoes('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Nova Ordem de Produção</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                        <DateTimePicker
                            label="Data e Hora de Início"
                            value={dataInicio}
                            onChange={(novoValor) => setDataInicio(novoValor)}
                            sx={{ width: '100%' }}
                        />
                        <DateTimePicker
                            label="Data e Hora de Finalização"
                            value={dataFim}
                            onChange={(novoValor) => setDataFim(novoValor)}
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Observações"
                        multiline
                        rows={4}
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        fullWidth
                        placeholder="Digite aqui as observações sobre a ordem de produção..."
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ bgcolor: '#1DB954', '&:hover': { bgcolor: '#1ed760' } }}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
} 