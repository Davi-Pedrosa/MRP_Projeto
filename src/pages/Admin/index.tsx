import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Card,
    CardContent,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid,
    Fade,
    Zoom,
    useTheme,
    Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import TimerComponent from '../../components/TimerComponent';
import { useTimer } from '../../contexts/TimerContext';
import TeamStatusTable from '../../components/TeamStatusTable';
import { teamsConfig } from '../../config/teams';

interface Employee {
    id: number;
    name: string;
    currentTask: string;
    status: string;
    progress: number;
}

interface ProductionOrder {
    id: number;
    product: string;
    quantity: number;
    deadline: string;
    status: string;
    assignedTo: string;
}

interface Admin {
    id: number;
    name: string;
    role: string;
    department: string;
    shift: string;
}

interface TimerConfig {
    defaultTime: number; // em minutos
    isConfiguring: boolean;
}

interface NewProductionOrder {
    product: string;
    quantity: number;
    deadline: Date | null;
    assignedTo: string;
}

export default function Admin() {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const { estimatedTime, setEstimatedTime } = useTimer();
    const [adminInfo] = useState<Admin>({
        id: 1,
        name: "Carlos Roberto Gomes",
        role: "Gerente de Produção",
        department: "Produção Industrial",
        shift: "Comercial (08:00 - 17:00)"
    });

    const [timerConfig, setTimerConfig] = useState<{isConfiguring: boolean}>({
        isConfiguring: false
    });

    const [employees] = useState<Employee[]>([
        { id: 1, name: 'João Silva', currentTask: 'Montagem XYZ', status: 'Em Andamento', progress: 75 },
        { id: 2, name: 'Maria Santos', currentTask: 'Inspeção ABC', status: 'Pausa', progress: 45 },
    ]);

    const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([
        {
            id: 1,
            product: 'Produto XYZ',
            quantity: 100,
            deadline: '2024-03-25',
            status: 'Em Produção',
            assignedTo: 'João Silva'
        },
        {
            id: 2,
            product: 'Produto ABC',
            quantity: 50,
            deadline: '2024-03-26',
            status: 'Aguardando',
            assignedTo: 'Maria Santos'
        },
    ]);

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [newOrder, setNewOrder] = useState<NewProductionOrder>({
        product: '',
        quantity: 0,
        deadline: null,
        assignedTo: ''
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<ProductionOrder | null>(null);

    const teams = Object.values(teamsConfig);

    const handleTimerConfigChange = (newTime: number) => {
        setEstimatedTime(newTime);
    };

    const toggleTimerConfig = () => {
        setTimerConfig(prev => ({
            ...prev,
            isConfiguring: !prev.isConfiguring
        }));
    };

    const handleOpenNewOrderModal = () => {
        setIsNewOrderModalOpen(true);
    };

    const handleCloseNewOrderModal = () => {
        setIsNewOrderModalOpen(false);
        setNewOrder({
            product: '',
            quantity: 0,
            deadline: null,
            assignedTo: ''
        });
    };

    const handleNewOrderChange = (field: keyof NewProductionOrder, value: any) => {
        setNewOrder(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddNewOrder = () => {
        if (!newOrder.product || !newOrder.quantity || !newOrder.deadline || !newOrder.assignedTo) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        const formattedDate = newOrder.deadline.toISOString().split('T')[0];
        
        const newProductionOrder: ProductionOrder = {
            id: productionOrders.length + 1,
            product: newOrder.product,
            quantity: newOrder.quantity,
            deadline: formattedDate,
            status: 'Aguardando',
            assignedTo: newOrder.assignedTo
        };

        setProductionOrders((prev: ProductionOrder[]) => [...prev, newProductionOrder]);
        handleCloseNewOrderModal();
    };

    const handleOpenEditModal = (order: ProductionOrder) => {
        setEditingOrder(order);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditingOrder(null);
        setIsEditModalOpen(false);
    };

    const handleEditOrder = () => {
        if (!editingOrder) return;

        setProductionOrders(prev => 
            prev.map(order => 
                order.id === editingOrder.id ? editingOrder : order
            )
        );
        handleCloseEditModal();
    };

    const handleDeleteOrder = (orderId: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta ordem de produção?')) {
            setProductionOrders(prev => prev.filter(order => order.id !== orderId));
        }
    };

    const handleRefresh = () => {
        setIsLoading(true);
        // Simular carregamento
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <Fade in={true} timeout={800}>
            <Container maxWidth="xl">
                <Box sx={{ py: 4 }}>
                    {/* Header */}
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
                            Painel de Administração
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
                                onClick={handleOpenNewOrderModal}
                                sx={{ 
                                    bgcolor: '#1DB954',
                                    '&:hover': {
                                        bgcolor: '#18a34b'
                                    },
                                    boxShadow: '0 4px 6px rgba(29, 185, 84, 0.2)'
                                }}
                            >
                                Nova Ordem de Produção
                            </Button>
                        </Box>
                    </Box>

                    {/* Admin Info and Timer */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={6}>
                            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
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
                                        <Typography variant="h6" gutterBottom sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                                            Informações do Administrador
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                <strong>Nome:</strong> {adminInfo.name}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                <strong>Cargo:</strong> {adminInfo.role}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                <strong>Departamento:</strong> {adminInfo.department}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Turno:</strong> {adminInfo.shift}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Zoom>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
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
                                        <Typography variant="h6" gutterBottom sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                                            Controle de Tempo
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <TimerComponent />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Zoom>
                        </Grid>
                    </Grid>

                    {/* Production Orders Table */}
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
                            Ordens de Produção
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Produto</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantidade</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Prazo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productionOrders.map((order) => (
                                        <TableRow 
                                            key={order.id}
                                            hover
                                            sx={{
                                                transition: 'background-color 0.2s',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(29, 185, 84, 0.05)'
                                                }
                                            }}
                                        >
                                            <TableCell>{order.product}</TableCell>
                                            <TableCell align="right">{order.quantity}</TableCell>
                                            <TableCell align="right">{order.deadline}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={order.status}
                                                    color={order.status === 'Em Produção' ? 'primary' : 'warning'}
                                                    sx={{
                                                        bgcolor: order.status === 'Em Produção' ? '#1DB954' : undefined,
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{order.assignedTo}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Editar" arrow>
                                                    <IconButton 
                                                        onClick={() => handleOpenEditModal(order)}
                                                        sx={{ color: '#1DB954' }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Excluir" arrow>
                                                    <IconButton 
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                        color="error"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Team Status */}
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

                    {/* Modals */}
                    <Dialog 
                        open={isEditModalOpen} 
                        onClose={handleCloseEditModal}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle sx={{ 
                            backgroundColor: '#1DB954', 
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            Editar Ordem de Produção
                        </DialogTitle>
                        <DialogContent sx={{ pt: 2 }}>
                            {editingOrder && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                    <TextField
                                        label="Produto"
                                        value={editingOrder.product}
                                        onChange={(e) => setEditingOrder({
                                            ...editingOrder,
                                            product: e.target.value
                                        })}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Quantidade"
                                        type="number"
                                        value={editingOrder.quantity}
                                        onChange={(e) => setEditingOrder({
                                            ...editingOrder,
                                            quantity: Number(e.target.value)
                                        })}
                                        fullWidth
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                        <DatePicker
                                            label="Prazo"
                                            value={new Date(editingOrder.deadline)}
                                            onChange={(date) => setEditingOrder({
                                                ...editingOrder,
                                                deadline: date ? date.toISOString().split('T')[0] : editingOrder.deadline
                                            })}
                                        />
                                    </LocalizationProvider>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={editingOrder.status}
                                            label="Status"
                                            onChange={(e) => setEditingOrder({
                                                ...editingOrder,
                                                status: e.target.value
                                            })}
                                        >
                                            <MenuItem value="Aguardando">Aguardando</MenuItem>
                                            <MenuItem value="Em Produção">Em Produção</MenuItem>
                                            <MenuItem value="Concluído">Concluído</MenuItem>
                                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel>Responsável</InputLabel>
                                        <Select
                                            value={editingOrder.assignedTo}
                                            label="Responsável"
                                            onChange={(e) => setEditingOrder({
                                                ...editingOrder,
                                                assignedTo: e.target.value
                                            })}
                                        >
                                            {employees.map(employee => (
                                                <MenuItem key={employee.id} value={employee.name}>
                                                    {employee.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button 
                                onClick={handleCloseEditModal}
                                sx={{ color: '#666' }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleEditOrder}
                                sx={{
                                    backgroundColor: '#1DB954',
                                    '&:hover': {
                                        backgroundColor: '#18a449'
                                    }
                                }}
                            >
                                Salvar
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog 
                        open={isNewOrderModalOpen} 
                        onClose={handleCloseNewOrderModal}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle sx={{ 
                            backgroundColor: '#1DB954', 
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            Nova Ordem de Produção
                        </DialogTitle>
                        <DialogContent sx={{ pt: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                <TextField
                                    label="Produto"
                                    value={newOrder.product}
                                    onChange={(e) => handleNewOrderChange('product', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Quantidade"
                                    type="number"
                                    value={newOrder.quantity}
                                    onChange={(e) => handleNewOrderChange('quantity', Number(e.target.value))}
                                    fullWidth
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                    <DatePicker
                                        label="Prazo"
                                        value={newOrder.deadline}
                                        onChange={(date) => handleNewOrderChange('deadline', date)}
                                    />
                                </LocalizationProvider>
                                <FormControl fullWidth>
                                    <InputLabel>Responsável</InputLabel>
                                    <Select
                                        value={newOrder.assignedTo}
                                        label="Responsável"
                                        onChange={(e) => handleNewOrderChange('assignedTo', e.target.value)}
                                    >
                                        {employees.map(employee => (
                                            <MenuItem key={employee.id} value={employee.name}>
                                                {employee.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button 
                                onClick={handleCloseNewOrderModal}
                                sx={{ color: '#666' }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleAddNewOrder}
                                sx={{
                                    backgroundColor: '#1DB954',
                                    '&:hover': {
                                        backgroundColor: '#18a449'
                                    }
                                }}
                            >
                                Adicionar
                            </Button>
                        </DialogActions>
                    </Dialog>

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
            </Container>
        </Fade>
    );
} 