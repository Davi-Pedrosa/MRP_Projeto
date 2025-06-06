import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';

interface MaintenanceRequest {
    id: string;
    equipment: string;
    description: string;
    priority: 'Alta' | 'Média' | 'Baixa';
    status: 'Pendente' | 'Em Andamento' | 'Concluído';
    requestedBy: string;
    requestedAt: string;
    department: string;
}

const MaintenanceRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedStatus, setEditedStatus] = useState('');
    const [statusNote, setStatusNote] = useState('');

    // Filtros
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const requests: MaintenanceRequest[] = [
        {
            id: 'REQ001',
            equipment: 'Torno CNC',
            description: 'Ruído anormal durante operação',
            priority: 'Alta',
            status: 'Pendente',
            requestedBy: 'João Silva',
            requestedAt: '2024-03-20 09:30',
            department: 'Produção'
        },
        {
            id: 'REQ002',
            equipment: 'Fresadora',
            description: 'Calibração necessária',
            priority: 'Média',
            status: 'Em Andamento',
            requestedBy: 'Maria Santos',
            requestedAt: '2024-03-20 10:15',
            department: 'Usinagem'
        },
        {
            id: 'REQ003',
            equipment: 'Prensa Hidráulica',
            description: 'Vazamento de óleo',
            priority: 'Baixa',
            status: 'Pendente',
            requestedBy: 'Pedro Costa',
            requestedAt: '2024-03-20 11:00',
            department: 'Estamparia'
        }
    ];

    const departments = ['Produção', 'Usinagem', 'Estamparia', 'Montagem'];
    const priorities = ['Alta', 'Média', 'Baixa'];
    const statuses = ['Pendente', 'Em Andamento', 'Concluído'];

    const filteredRequests = requests.filter(request => {
        const matchesStatus = !statusFilter || request.status === statusFilter;
        const matchesPriority = !priorityFilter || request.priority === priorityFilter;
        const matchesDepartment = !departmentFilter || request.department === departmentFilter;
        const matchesSearch = !searchTerm || 
            request.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesPriority && matchesDepartment && matchesSearch;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'alta':
                return '#f44336';
            case 'média':
                return '#ff9800';
            case 'baixa':
                return '#4caf50';
            default:
                return '#757575';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pendente':
                return '#ff9800';
            case 'em andamento':
                return '#2196f3';
            case 'concluído':
                return '#4caf50';
            default:
                return '#757575';
        }
    };

    const handleViewRequest = (request: MaintenanceRequest) => {
        setSelectedRequest(request);
        setIsViewDialogOpen(true);
    };

    const handleEditRequest = (request: MaintenanceRequest) => {
        setSelectedRequest(request);
        setEditedStatus(request.status);
        setStatusNote('');
        setIsEditDialogOpen(true);
    };

    const handleStatusUpdate = () => {
        // Aqui você implementaria a lógica para atualizar o status
        console.log('Status atualizado:', {
            requestId: selectedRequest?.id,
            newStatus: editedStatus,
            note: statusNote
        });
        setIsEditDialogOpen(false);
    };

    const handleClearFilters = () => {
        setStatusFilter('');
        setPriorityFilter('');
        setDepartmentFilter('');
        setSearchTerm('');
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 4 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        color: '#1DB954',
                        fontWeight: 'bold',
                        mb: 4,
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: 0,
                            width: '60px',
                            height: '4px',
                            backgroundColor: '#1DB954',
                            borderRadius: '2px'
                        }
                    }}
                >
                    Pedidos de Manutenção
                </Typography>

                {/* Filtros */}
                <Paper 
                    sx={{ 
                        p: 2, 
                        mb: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: '12px'
                    }}
                >
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon sx={{ color: '#1DB954' }} />
                        <Typography variant="h6" sx={{ color: '#1DB954' }}>
                            Filtros
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Pesquisar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Equipamento, descrição..."
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Status"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    {statuses.map((status) => (
                                        <MenuItem key={status} value={status}>{status}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Prioridade</InputLabel>
                                <Select
                                    value={priorityFilter}
                                    label="Prioridade"
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                >
                                    <MenuItem value="">Todas</MenuItem>
                                    {priorities.map((priority) => (
                                        <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Departamento</InputLabel>
                                <Select
                                    value={departmentFilter}
                                    label="Departamento"
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    {departments.map((department) => (
                                        <MenuItem key={department} value={department}>{department}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleClearFilters}
                                sx={{ 
                                    borderColor: '#1DB954',
                                    color: '#1DB954',
                                    '&:hover': {
                                        borderColor: '#18a34b',
                                        backgroundColor: 'rgba(29, 185, 84, 0.04)'
                                    }
                                }}
                            >
                                Limpar Filtros
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                <TableContainer 
                    component={Paper}
                    sx={{ 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Equipamento</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Prioridade</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Solicitante</TableCell>
                                <TableCell>Departamento</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRequests.map((request) => (
                                <TableRow 
                                    key={request.id}
                                    sx={{ 
                                        '&:hover': { 
                                            backgroundColor: 'rgba(0,0,0,0.02)'
                                        }
                                    }}
                                >
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.equipment}</TableCell>
                                    <TableCell>{request.description}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={request.priority}
                                            size="small"
                                            sx={{ 
                                                backgroundColor: getPriorityColor(request.priority),
                                                color: 'white'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={request.status}
                                            size="small"
                                            sx={{ 
                                                backgroundColor: getStatusColor(request.status),
                                                color: 'white'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{request.requestedBy}</TableCell>
                                    <TableCell>{request.department}</TableCell>
                                    <TableCell>{request.requestedAt}</TableCell>
                                    <TableCell>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleViewRequest(request)}
                                            sx={{ color: '#1DB954' }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleEditRequest(request)}
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

                {/* Dialog de Visualização */}
                <Dialog 
                    open={isViewDialogOpen} 
                    onClose={() => setIsViewDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                        Detalhes do Pedido
                    </DialogTitle>
                    <DialogContent>
                        {selectedRequest && (
                            <Box sx={{ pt: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    ID: {selectedRequest.id}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Equipamento:</strong> {selectedRequest.equipment}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Descrição:</strong> {selectedRequest.description}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Prioridade:</strong>{' '}
                                    <Chip 
                                        label={selectedRequest.priority}
                                        size="small"
                                        sx={{ 
                                            backgroundColor: getPriorityColor(selectedRequest.priority),
                                            color: 'white'
                                        }}
                                    />
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Status:</strong>{' '}
                                    <Chip 
                                        label={selectedRequest.status}
                                        size="small"
                                        sx={{ 
                                            backgroundColor: getStatusColor(selectedRequest.status),
                                            color: 'white'
                                        }}
                                    />
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Solicitante:</strong> {selectedRequest.requestedBy}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Departamento:</strong> {selectedRequest.department}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Data da Solicitação:</strong> {selectedRequest.requestedAt}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => setIsViewDialogOpen(false)}
                            sx={{ 
                                color: '#1DB954',
                                '&:hover': {
                                    backgroundColor: 'rgba(29, 185, 84, 0.04)'
                                }
                            }}
                        >
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog de Edição */}
                <Dialog 
                    open={isEditDialogOpen} 
                    onClose={() => setIsEditDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                        Atualizar Status
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ pt: 2 }}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={editedStatus}
                                    label="Status"
                                    onChange={(e) => setEditedStatus(e.target.value)}
                                >
                                    <MenuItem value="Pendente">Pendente</MenuItem>
                                    <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                                    <MenuItem value="Concluído">Concluído</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Observações"
                                multiline
                                rows={4}
                                value={statusNote}
                                onChange={(e) => setStatusNote(e.target.value)}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => setIsEditDialogOpen(false)}
                            sx={{ 
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.04)'
                                }
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            onClick={handleStatusUpdate}
                            variant="contained"
                            sx={{ 
                                backgroundColor: '#1DB954',
                                '&:hover': {
                                    backgroundColor: '#18a34b'
                                }
                            }}
                        >
                            Atualizar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default MaintenanceRequests; 