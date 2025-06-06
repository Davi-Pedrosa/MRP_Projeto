import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Chip,
} from '@mui/material';
import {
    Assignment as TaskIcon,
    Build as ToolIcon,
    Inventory as MaterialIcon,
    Description as ProcedureIcon,
} from '@mui/icons-material';
import { teamsConfig } from '../../config/teams';
import TaskStatus from '../TaskStatus';
import MaterialsList from '../MaterialsList';
import ToolsList from '../ToolsList';

interface TeamWorkspaceProps {
    teamId: string;
}

export default function TeamWorkspace({ teamId }: TeamWorkspaceProps) {
    const teamConfig = teamsConfig[teamId];

    if (!teamConfig) {
        return (
            <Typography color="error">
                Equipe não encontrada
            </Typography>
        );
    }

    return (
        <Box>
            {/* Cabeçalho da Equipe */}
            <Paper 
                elevation={0}
                sx={{ 
                    p: 2, 
                    mb: 3, 
                    backgroundColor: '#1DB954',
                    color: 'white',
                    borderRadius: 2
                }}
            >
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                    {teamConfig.name}
                </Typography>
                <Typography variant="subtitle1">
                    {teamConfig.description}
                </Typography>
            </Paper>

            <Grid container spacing={3}>
                {/* Responsabilidades */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: '#1DB954',
                                borderBottom: '2px solid #1DB954',
                                pb: 1,
                                mb: 2,
                                fontWeight: 'bold'
                            }}
                        >
                            Responsabilidades
                        </Typography>
                        <List>
                            {teamConfig.responsibilities.map((resp, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <TaskIcon sx={{ color: '#1DB954' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={resp} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Procedimentos Específicos */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: '#1DB954',
                                borderBottom: '2px solid #1DB954',
                                pb: 1,
                                mb: 2,
                                fontWeight: 'bold'
                            }}
                        >
                            Procedimentos Específicos
                        </Typography>
                        <List>
                            {teamConfig.specificProcedures.map((proc, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <ProcedureIcon sx={{ color: '#1DB954' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={proc} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Ferramentas Específicas */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: '#1DB954',
                                borderBottom: '2px solid #1DB954',
                                pb: 1,
                                mb: 2,
                                fontWeight: 'bold'
                            }}
                        >
                            Ferramentas da Equipe
                        </Typography>
                        <List>
                            {teamConfig.tools.map((tool) => (
                                <ListItem key={tool.id}>
                                    <ListItemIcon>
                                        <ToolIcon sx={{ color: '#1DB954' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={tool.name}
                                        secondary={tool.description}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Materiais Específicos */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: '#1DB954',
                                borderBottom: '2px solid #1DB954',
                                pb: 1,
                                mb: 2,
                                fontWeight: 'bold'
                            }}
                        >
                            Materiais Necessários
                        </Typography>
                        <List>
                            {teamConfig.materials.map((material) => (
                                <ListItem key={material.id}>
                                    <ListItemIcon>
                                        <MaterialIcon sx={{ color: '#1DB954' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={material.name}
                                        secondary={`Tipo: ${material.type}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Status da Tarefa */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <TaskStatus 
                            currentStatus="not_started"
                            onStatusChange={() => {}}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
} 