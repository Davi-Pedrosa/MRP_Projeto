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
    Build as WrenchIcon,
    SettingsInputComponent as ComponentIcon,
    Cable as CableIcon,
    Straighten as RulerIcon,
} from '@mui/icons-material';

interface Tool {
    id: number;
    name: string;
    location: string;
    status: 'available' | 'in_use' | 'maintenance';
    icon: React.ReactNode;
}

const mockTools: Tool[] = [
    {
        id: 1,
        name: 'Chave de Fenda Precision',
        location: 'Bancada A1',
        status: 'available',
        icon: <WrenchIcon />
    },
    {
        id: 2,
        name: 'Kit de Montagem CPU',
        location: 'Armário B2',
        status: 'in_use',
        icon: <ComponentIcon />
    },
    {
        id: 3,
        name: 'Multímetro Digital',
        location: 'Bancada C3',
        status: 'available',
        icon: <CableIcon />
    },
    {
        id: 4,
        name: 'Paquímetro Digital',
        location: 'Manutenção',
        status: 'maintenance',
        icon: <RulerIcon />
    },
];

export default function ToolsList() {
    const getStatusColor = (status: Tool['status']) => {
        switch (status) {
            case 'available':
                return '#1DB954';
            case 'in_use':
                return '#ffbb33';
            case 'maintenance':
                return '#ff4444';
            default:
                return '#666';
        }
    };

    const getStatusText = (status: Tool['status']) => {
        switch (status) {
            case 'available':
                return 'Disponível';
            case 'in_use':
                return 'Em Uso';
            case 'maintenance':
                return 'Manutenção';
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
                Ferramentas Necessárias
            </Typography>

            <List>
                {mockTools.map((tool) => (
                    <ListItem
                        key={tool.id}
                        sx={{
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: '#f8f9fa',
                        }}
                    >
                        <ListItemIcon sx={{ color: getStatusColor(tool.status) }}>
                            {tool.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={tool.name}
                            secondary={`Localização: ${tool.location}`}
                        />
                        <Chip
                            label={getStatusText(tool.status)}
                            sx={{
                                backgroundColor: getStatusColor(tool.status),
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