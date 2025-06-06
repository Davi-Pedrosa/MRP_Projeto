import React, { useState } from 'react';
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
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    unit: string;
    category: string;
    location: string;
    lastUpdated: Date;
}

export default function Inventory() {
    const [items, setItems] = useState<InventoryItem[]>([
        {
            id: 'CPU001',
            name: 'Processador i7',
            quantity: 50,
            minQuantity: 20,
            maxQuantity: 100,
            unit: 'unidade',
            category: 'Componentes',
            location: 'Prateleira A1',
            lastUpdated: new Date('2024-03-20')
        },
        {
            id: 'MB002',
            name: 'Placa-mãe Gaming',
            quantity: 15,
            minQuantity: 25,
            maxQuantity: 75,
            unit: 'unidade',
            category: 'Componentes',
            location: 'Prateleira B2',
            lastUpdated: new Date('2024-03-19')
        },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    const handleAddItem = () => {
        setSelectedItem(null);
        setOpenDialog(true);
    };

    const handleEditItem = (item: InventoryItem) => {
        setSelectedItem(item);
        setOpenDialog(true);
    };

    const getLowStockItems = () => {
        return items.filter(item => item.quantity < item.minQuantity);
    };

    // Dados para o gráfico
    const chartData = {
        labels: items.map(item => item.name),
        datasets: [
            {
                label: 'Quantidade Atual',
                data: items.map(item => item.quantity),
                backgroundColor: '#1DB95480',
                borderColor: '#1DB954',
                borderWidth: 1,
            },
            {
                label: 'Quantidade Mínima',
                data: items.map(item => item.minQuantity),
                backgroundColor: '#ff980080',
                borderColor: '#ff9800',
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
                text: 'Níveis de Estoque',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Gestão de Estoque
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total de Itens
                            </Typography>
                            <Typography variant="h4">
                                {items.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Itens com Estoque Baixo
                            </Typography>
                            <Typography variant="h4" sx={{ color: '#ff9800' }}>
                                {getLowStockItems().length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Valor Total em Estoque
                            </Typography>
                            <Typography variant="h4" sx={{ color: '#1DB954' }}>
                                R$ 125.750,00
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {getLowStockItems().length > 0 && (
                <Alert 
                    severity="warning" 
                    icon={<WarningIcon />}
                    sx={{ mb: 3 }}
                >
                    Existem {getLowStockItems().length} itens com estoque abaixo do mínimo recomendado.
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Gráfico */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Bar options={chartOptions} data={chartData} />
                    </Paper>
                </Grid>

                {/* Tabela de Itens */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">
                                Itens em Estoque
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddItem}
                                sx={{ backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#18a449' } }}
                            >
                                Novo Item
                            </Button>
                        </Box>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell align="right">Quantidade</TableCell>
                                        <TableCell>Localização</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Última Atualização</TableCell>
                                        <TableCell align="right">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell align="right">
                                                {item.quantity} {item.unit}
                                            </TableCell>
                                            <TableCell>{item.location}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.quantity < item.minQuantity ? 'Estoque Baixo' : 'Normal'}
                                                    color={item.quantity < item.minQuantity ? 'warning' : 'success'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {item.lastUpdated.toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditItem(item)}
                                                    sx={{ color: '#1DB954' }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Dialog para adicionar/editar item */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedItem ? 'Editar Item' : 'Novo Item'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome do Item"
                            defaultValue={selectedItem?.name}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Quantidade"
                                    type="number"
                                    defaultValue={selectedItem?.quantity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Unidade"
                                    defaultValue={selectedItem?.unit}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Quantidade Mínima"
                                    type="number"
                                    defaultValue={selectedItem?.minQuantity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Quantidade Máxima"
                                    type="number"
                                    defaultValue={selectedItem?.maxQuantity}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="Categoria"
                            defaultValue={selectedItem?.category}
                        />
                        <TextField
                            fullWidth
                            label="Localização"
                            defaultValue={selectedItem?.location}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#1DB954',
                            '&:hover': { backgroundColor: '#18a449' }
                        }}
                    >
                        {selectedItem ? 'Salvar' : 'Adicionar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
} 