import React from 'react';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
} from '@mui/material';
import {
    Memory as CPUIcon,
    Storage as HDDIcon,
    DeveloperBoard as MotherboardIcon,
    Memory as RAMIcon,
} from '@mui/icons-material';

interface Material {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    status: 'available' | 'low' | 'unavailable';
    icon: React.ReactNode;
}

const mockMaterials: Material[] = [
    {
        id: 1,
        name: 'Processador Intel i7',
        quantity: 5,
        unit: 'unid',
        status: 'available',
        icon: <CPUIcon />
    },
    {
        id: 2,
        name: 'HD SSD 1TB',
        quantity: 3,
        unit: 'unid',
        status: 'low',
        icon: <HDDIcon />
    },
    {
        id: 3,
        name: 'Placa Mãe ASUS',
        quantity: 8,
        unit: 'unid',
        status: 'available',
        icon: <MotherboardIcon />
    },
    {
        id: 4,
        name: 'Memória RAM 16GB',
        quantity: 0,
        unit: 'unid',
        status: 'unavailable',
        icon: <RAMIcon />
    },
];

export default function MaterialsList() {
    const getStatusColor = (status: Material['status']) => {
        switch (status) {
            case 'available':
                return '#1DB954';
            case 'low':
                return '#ffbb33';
            case 'unavailable':
                return '#ff4444';
            default:
                return '#666';
        }
    };

    const getStatusText = (status: Material['status']) => {
        switch (status) {
            case 'available':
                return 'Disponível';
            case 'low':
                return 'Baixo Estoque';
            case 'unavailable':
                return 'Indisponível';
            default:
                return status;
        }
    };

    return (
        <Box>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                    color: '#1DB954',
                    borderBottom: '2px solid #1DB954',
                    pb: 1,
                    fontWeight: 'bold'
                }}
            >
                Materiais Necessários
            </Typography>

            <List>
                {mockMaterials.map((material) => (
                    <ListItem
                        key={material.id}
                        sx={{
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: '#f8f9fa',
                        }}
                    >
                        <ListItemIcon sx={{ color: getStatusColor(material.status) }}>
                            {material.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={material.name}
                            secondary={`Quantidade: ${material.quantity} ${material.unit}`}
                        />
                        <Chip
                            label={getStatusText(material.status)}
                            sx={{
                                backgroundColor: getStatusColor(material.status),
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
} 