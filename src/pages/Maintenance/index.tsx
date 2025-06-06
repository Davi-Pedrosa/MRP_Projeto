import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Fade,
    Zoom,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ConstructionIcon from '@mui/icons-material/Construction';

interface Equipment {
    id: number;
    name: string;
    type: string;
    status: 'operational' | 'maintenance' | 'broken';
    lastMaintenance: Date;
    nextMaintenance: Date;
}

interface MaintenanceRecord {
    id: number;
    equipmentId: number;
    type: 'preventive' | 'corrective';
    description: string;
    date: Date;
    technician: string;
    cost: number;
    status: 'scheduled' | 'in_progress' | 'completed';
}

export default function Maintenance() {
    const [isLoading, setIsLoading] = useState(false);
    const [equipment, setEquipment] = useState<Equipment[]>([
        {
            id: 1,
            name: 'Torno CNC',
            type: 'Máquina de Usinagem',
            status: 'operational',
            lastMaintenance: new Date('2024-02-15'),
            nextMaintenance: new Date('2024-04-15'),
        },
        {
            id: 2,
            name: 'Fresadora',
            type: 'Máquina de Usinagem',
            status: 'maintenance',
            lastMaintenance: new Date('2024-03-01'),
            nextMaintenance: new Date('2024-03-15'),
        },
    ]);

    const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([
        {
            id: 1,
            equipmentId: 2,
            type: 'preventive',
            description: 'Manutenção preventiva mensal',
            date: new Date('2024-03-15'),
            technician: 'João Silva',
            cost: 500,
            status: 'scheduled',
        },
    ]);

    const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false);
    const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceRecord | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational':
                return '#1DB954';
            case 'maintenance':
                return '#ffa726';
            case 'broken':
                return '#ff3333';
            default:
                return '#666666';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'operational':
                return 'Operacional';
            case 'maintenance':
                return 'Em Manutenção';
            case 'broken':
                return 'Quebrado';
            default:
                return status;
        }
    };

    const handleAddEquipment = () => {
        setSelectedEquipment(null);
        setIsEquipmentDialogOpen(true);
    };

    const handleEditEquipment = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setIsEquipmentDialogOpen(true);
    };

    const handleAddMaintenance = () => {
        setSelectedMaintenance(null);
        setIsMaintenanceDialogOpen(true);
    };

    const handleEditMaintenance = (maintenance: MaintenanceRecord) => {
        setSelectedMaintenance(maintenance);
        setIsMaintenanceDialogOpen(true);
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
                            Gestão de Manutenção
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
                                onClick={handleAddEquipment}
                                sx={{ 
                                    bgcolor: '#1DB954',
                                    '&:hover': {
                                        bgcolor: '#18a34b'
                                    },
                                    boxShadow: '0 4px 6px rgba(29, 185, 84, 0.2)'
                                }}
                            >
                                Novo Equipamento
                            </Button>
                        </Box>
                    </Box>

                    {/* Métricas */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {[
                            {
                                title: 'Total de Equipamentos',
                                value: equipment.length,
                                icon: <ConstructionIcon />,
                                color: '#1DB954'
                            },
                            {
                                title: 'Manutenções Pendentes',
                                value: maintenanceRecords.filter(m => m.status === 'scheduled').length,
                                icon: <BuildIcon />,
                                color: '#ffa726'
                            },
                            {
                                title: 'Equipamentos Operacionais',
                                value: equipment.filter(e => e.status === 'operational').length,
                                icon: <CheckCircleIcon />,
                                color: '#1DB954'
                            },
                            {
                                title: 'Em Manutenção',
                                value: equipment.filter(e => e.status === 'maintenance').length,
                                icon: <EngineeringIcon />,
                                color: '#ffa726'
                            }
                        ].map((metric, index) => (
                            <Grid item xs={12} sm={6} md={3} key={metric.title}>
                                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
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
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Box sx={{ 
                                                    color: metric.color,
                                                    mr: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    p: 1,
                                                    borderRadius: '50%',
                                                    backgroundColor: `${metric.color}22`
                                                }}>
                                                    {metric.icon}
                                                </Box>
                                                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                                    {metric.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="h3" sx={{ color: metric.color, fontWeight: 'bold' }}>
                                                {metric.value}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Lista de Equipamentos */}
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
                            Equipamentos
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Última Manutenção</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Próxima Manutenção</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {equipment.map((item) => (
                                        <TableRow 
                                            key={item.id}
                                            hover
                                            sx={{
                                                transition: 'background-color 0.2s',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(29, 185, 84, 0.05)'
                                                }
                                            }}
                                        >
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(item.status)}
                                                    sx={{
                                                        bgcolor: `${getStatusColor(item.status)}22`,
                                                        color: getStatusColor(item.status),
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {item.lastMaintenance.toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>
                                                {item.nextMaintenance.toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton 
                                                    onClick={() => handleEditEquipment(item)}
                                                    sx={{ color: '#1DB954' }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Registros de Manutenção */}
                    <Paper sx={{ 
                        p: 3,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <Typography variant="h6" sx={{ 
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
                                Registros de Manutenção
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddMaintenance}
                                sx={{ 
                                    bgcolor: '#1DB954',
                                    '&:hover': {
                                        bgcolor: '#18a34b'
                                    },
                                    boxShadow: '0 4px 6px rgba(29, 185, 84, 0.2)'
                                }}
                            >
                                Nova Manutenção
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Equipamento</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Técnico</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Custo</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {maintenanceRecords.map((record) => (
                                        <TableRow 
                                            key={record.id}
                                            hover
                                            sx={{
                                                transition: 'background-color 0.2s',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(29, 185, 84, 0.05)'
                                                }
                                            }}
                                        >
                                            <TableCell>
                                                {equipment.find(e => e.id === record.equipmentId)?.name}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={record.type === 'preventive' ? 'Preventiva' : 'Corretiva'}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: record.type === 'preventive' ? '#1DB95422' : '#ffa72622',
                                                        color: record.type === 'preventive' ? '#1DB954' : '#ffa726',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{record.description}</TableCell>
                                            <TableCell>{record.date.toLocaleDateString('pt-BR')}</TableCell>
                                            <TableCell>{record.technician}</TableCell>
                                            <TableCell align="right">
                                                {record.cost.toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={record.status === 'scheduled' ? 'Agendada' : 
                                                           record.status === 'in_progress' ? 'Em Andamento' : 'Concluída'}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: record.status === 'completed' ? '#1DB95422' : 
                                                                record.status === 'in_progress' ? '#ffa72622' : '#66666622',
                                                        color: record.status === 'completed' ? '#1DB954' : 
                                                               record.status === 'in_progress' ? '#ffa726' : '#666666',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton 
                                                    onClick={() => handleEditMaintenance(record)}
                                                    sx={{ color: '#1DB954' }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Dialogs */}
                    <Dialog
                        open={isEquipmentDialogOpen}
                        onClose={() => setIsEquipmentDialogOpen(false)}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle sx={{ backgroundColor: '#1DB954', color: 'white' }}>
                            {selectedEquipment ? 'Editar Equipamento' : 'Novo Equipamento'}
                        </DialogTitle>
                        <DialogContent sx={{ pt: 2 }}>
                            {/* Formulário de equipamento aqui */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsEquipmentDialogOpen(false)}>Cancelar</Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1DB954',
                                    '&:hover': {
                                        backgroundColor: '#18a449',
                                    },
                                }}
                            >
                                {selectedEquipment ? 'Salvar' : 'Adicionar'}
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={isMaintenanceDialogOpen}
                        onClose={() => setIsMaintenanceDialogOpen(false)}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle sx={{ backgroundColor: '#1DB954', color: 'white' }}>
                            {selectedMaintenance ? 'Editar Manutenção' : 'Nova Manutenção'}
                        </DialogTitle>
                        <DialogContent sx={{ pt: 2 }}>
                            {/* Formulário de manutenção aqui */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsMaintenanceDialogOpen(false)}>Cancelar</Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1DB954',
                                    '&:hover': {
                                        backgroundColor: '#18a449',
                                    },
                                }}
                            >
                                {selectedMaintenance ? 'Salvar' : 'Adicionar'}
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