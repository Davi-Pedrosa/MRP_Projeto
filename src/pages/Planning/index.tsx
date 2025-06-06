import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../../services/api';
import { productionOrderService, ProductionOrder } from '../../services/productionOrderService';

interface NewProductionOrder {
    product: string;
    quantity: number;
    startDate: Date | null;
    endDate: Date | null;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    team: string;
}

export default function Planning() {
    const [orders, setOrders] = useState<ProductionOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);
    const [newOrder, setNewOrder] = useState<NewProductionOrder>({
        product: '',
        quantity: 0,
        startDate: null,
        endDate: null,
        priority: 'MEDIUM',
        team: ''
    });

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await productionOrderService.getAll();
            setOrders(response.data);
            setError(null);
        } catch (err) {
            console.error('Erro ao carregar ordens de produção:', err);
            setError('Erro ao carregar ordens de produção');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAddOrder = () => {
        setSelectedOrder(null);
        setOpenDialog(true);
    };

    const handleEditOrder = (order: ProductionOrder) => {
        setSelectedOrder(order);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOrder(null);
        setNewOrder({
            product: '',
            quantity: 0,
            startDate: null,
            endDate: null,
            priority: 'MEDIUM',
            team: ''
        });
    };

    const handleSaveOrder = async () => {
        try {
            if (!newOrder.product || !newOrder.quantity || !newOrder.startDate || !newOrder.endDate || !newOrder.team) {
                alert('Por favor, preencha todos os campos');
                return;
            }

            const orderData = {
                ...newOrder,
                startDate: newOrder.startDate.toISOString(),
                endDate: newOrder.endDate.toISOString(),
                status: 'PENDING' as const
            };

            if (selectedOrder) {
                await productionOrderService.update(selectedOrder.id, orderData);
            } else {
                await productionOrderService.create(orderData);
            }

            fetchOrders();
            handleCloseDialog();
        } catch (err) {
            console.error('Erro ao salvar ordem de produção:', err);
            setError('Erro ao salvar ordem de produção');
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta ordem de produção?')) {
            try {
                await productionOrderService.delete(orderId);
                fetchOrders();
            } catch (err) {
                console.error('Erro ao excluir ordem de produção:', err);
                setError('Erro ao excluir ordem de produção');
            }
        }
    };

    const getStatusColor = (status: ProductionOrder['status']) => {
        switch (status) {
            case 'PENDING':
                return '#ff9800';
            case 'IN_PROGRESS':
                return '#2196f3';
            case 'COMPLETED':
                return '#4caf50';
            default:
                return '#666';
        }
    };

    const getStatusText = (status: ProductionOrder['status']) => {
        switch (status) {
            case 'PENDING':
                return 'Pendente';
            case 'IN_PROGRESS':
                return 'Em Produção';
            case 'COMPLETED':
                return 'Concluído';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <Container>
                <Typography>Carregando...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Planejamento de Produção
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddOrder}
                    sx={{ bgcolor: '#1DB954' }}
                >
                    Nova Ordem de Produção
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell>Data Início</TableCell>
                            <TableCell>Data Fim</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Prioridade</TableCell>
                            <TableCell>Equipe</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.product}</TableCell>
                                <TableCell align="right">{order.quantity}</TableCell>
                                <TableCell>{new Date(order.startDate).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>{new Date(order.endDate).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusText(order.status)}
                                        style={{
                                            backgroundColor: getStatusColor(order.status),
                                            color: 'white'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.priority}
                                        color={order.priority === 'HIGH' ? 'error' : order.priority === 'MEDIUM' ? 'warning' : 'success'}
                                    />
                                </TableCell>
                                <TableCell>{order.team}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleEditOrder(order)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteOrder(order.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedOrder ? 'Editar Ordem de Produção' : 'Nova Ordem de Produção'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Produto"
                                value={newOrder.product}
                                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantidade"
                                value={newOrder.quantity}
                                onChange={(e) => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker
                                    label="Data Início"
                                    value={newOrder.startDate}
                                    onChange={(date) => setNewOrder({ ...newOrder, startDate: date })}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker
                                    label="Data Fim"
                                    value={newOrder.endDate}
                                    onChange={(date) => setNewOrder({ ...newOrder, endDate: date })}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Prioridade"
                                value={newOrder.priority}
                                onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value as any })}
                            >
                                <option value="HIGH">Alta</option>
                                <option value="MEDIUM">Média</option>
                                <option value="LOW">Baixa</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Equipe"
                                value={newOrder.team}
                                onChange={(e) => setNewOrder({ ...newOrder, team: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSaveOrder} variant="contained" sx={{ bgcolor: '#1DB954' }}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
} 