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
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Divider,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CorrectiveAction {
    id: number;
    issue: string;
    action: string;
    responsible: string;
    deadline: Date;
    status: 'pending' | 'in_progress' | 'completed';
    effectiveness: number;
    comments: string;
}

interface CorrectiveActionsProps {
    actions: CorrectiveAction[];
    onAddAction: (action: Omit<CorrectiveAction, 'id'>) => void;
    onUpdateAction: (id: number, action: Partial<CorrectiveAction>) => void;
    onDeleteAction: (id: number) => void;
}

export default function CorrectiveActions({
    actions,
    onAddAction,
    onUpdateAction,
    onDeleteAction,
}: CorrectiveActionsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAction, setEditingAction] = useState<CorrectiveAction | null>(null);
    const [newAction, setNewAction] = useState<Omit<CorrectiveAction, 'id'>>({
        issue: '',
        action: '',
        responsible: '',
        deadline: new Date(),
        status: 'pending',
        effectiveness: 0,
        comments: '',
    });

    const handleSubmit = () => {
        if (editingAction) {
            onUpdateAction(editingAction.id, newAction);
        } else {
            onAddAction(newAction);
        }
        setIsDialogOpen(false);
        setEditingAction(null);
        setNewAction({
            issue: '',
            action: '',
            responsible: '',
            deadline: new Date(),
            status: 'pending',
            effectiveness: 0,
            comments: '',
        });
    };

    const handleEdit = (action: CorrectiveAction) => {
        setEditingAction(action);
        setNewAction(action);
        setIsDialogOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return '#1DB954';
            case 'in_progress':
                return '#ffa726';
            default:
                return '#ff3333';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Concluído';
            case 'in_progress':
                return 'Em Andamento';
            default:
                return 'Pendente';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#1DB954' }}>
                    Ações Corretivas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setEditingAction(null);
                        setIsDialogOpen(true);
                    }}
                    sx={{
                        backgroundColor: '#1DB954',
                        '&:hover': {
                            backgroundColor: '#18a449',
                        },
                    }}
                >
                    Nova Ação Corretiva
                </Button>
            </Box>

            <List>
                {actions.map((action) => (
                    <React.Fragment key={action.id}>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {action.issue}
                                        </Typography>
                                        <Chip
                                            label={getStatusLabel(action.status)}
                                            size="small"
                                            sx={{
                                                backgroundColor: getStatusColor(action.status),
                                                color: 'white',
                                            }}
                                        />
                                    </Box>
                                }
                                secondary={
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Ação:</strong> {action.action}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Responsável:</strong> {action.responsible}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Prazo:</strong>{' '}
                                            {action.deadline.toLocaleDateString('pt-BR')}
                                        </Typography>
                                        {action.effectiveness > 0 && (
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Eficácia:</strong> {action.effectiveness}%
                                            </Typography>
                                        )}
                                        {action.comments && (
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Comentários:</strong> {action.comments}
                                            </Typography>
                                        )}
                                    </Box>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handleEdit(action)}
                                    sx={{ mr: 1 }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => onDeleteAction(action.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ backgroundColor: '#1DB954', color: 'white' }}>
                    {editingAction ? 'Editar Ação Corretiva' : 'Nova Ação Corretiva'}
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Problema"
                                value={newAction.issue}
                                onChange={(e) => setNewAction(prev => ({ ...prev, issue: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Ação Corretiva"
                                value={newAction.action}
                                onChange={(e) => setNewAction(prev => ({ ...prev, action: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Responsável"
                                value={newAction.responsible}
                                onChange={(e) => setNewAction(prev => ({ ...prev, responsible: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker
                                    label="Prazo"
                                    value={newAction.deadline}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setNewAction(prev => ({ ...prev, deadline: newValue }));
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={newAction.status}
                                    label="Status"
                                    onChange={(e) => setNewAction(prev => ({
                                        ...prev,
                                        status: e.target.value as CorrectiveAction['status']
                                    }))}
                                >
                                    <MenuItem value="pending">Pendente</MenuItem>
                                    <MenuItem value="in_progress">Em Andamento</MenuItem>
                                    <MenuItem value="completed">Concluído</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Eficácia (%)"
                                value={newAction.effectiveness}
                                onChange={(e) => setNewAction(prev => ({
                                    ...prev,
                                    effectiveness: Number(e.target.value)
                                }))}
                                InputProps={{
                                    inputProps: { min: 0, max: 100 }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Comentários"
                                value={newAction.comments}
                                onChange={(e) => setNewAction(prev => ({ ...prev, comments: e.target.value }))}
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
                        {editingAction ? 'Salvar' : 'Adicionar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 