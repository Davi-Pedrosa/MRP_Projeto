import React from 'react';
import {
    Typography,
    Box,
    Button,
    Tooltip,
} from '@mui/material';
import {
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    Restaurant as LunchIcon,
    Error as ProblemIcon,
    CheckCircle as CompletedIcon,
} from '@mui/icons-material';

type TaskStatus = 'not_started' | 'in_progress' | 'break' | 'lunch' | 'problem' | 'completed';

interface TaskStatusProps {
    currentStatus: TaskStatus;
    onStatusChange: (newStatus: TaskStatus) => void;
}

interface StatusButton {
    status: TaskStatus;
    label: string;
    icon: React.ReactNode;
    color: string;
    tooltip: string;
}

const statusButtons: StatusButton[] = [
    {
        status: 'in_progress',
        label: 'Iniciar',
        icon: <PlayIcon />,
        color: '#1DB954',
        tooltip: 'Iniciar ou continuar a tarefa'
    },
    {
        status: 'break',
        label: 'Pausa',
        icon: <PauseIcon />,
        color: '#ffbb33',
        tooltip: 'Fazer uma pausa curta'
    },
    {
        status: 'lunch',
        label: 'Almoço',
        icon: <LunchIcon />,
        color: '#ffbb33',
        tooltip: 'Pausa para almoço/refeição'
    },
    {
        status: 'problem',
        label: 'Problema',
        icon: <ProblemIcon />,
        color: '#ff4444',
        tooltip: 'Reportar um problema'
    },
    {
        status: 'completed',
        label: 'Concluído',
        icon: <CompletedIcon />,
        color: '#1DB954',
        tooltip: 'Marcar tarefa como concluída'
    },
];

export default function TaskStatus({ currentStatus, onStatusChange }: TaskStatusProps) {
    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case 'in_progress':
                return '#1DB954';
            case 'break':
            case 'lunch':
                return '#ffbb33';
            case 'problem':
                return '#ff4444';
            case 'completed':
                return '#1DB954';
            default:
                return '#666';
        }
    };

    const getStatusText = (status: TaskStatus) => {
        switch (status) {
            case 'not_started':
                return 'Não Iniciado';
            case 'in_progress':
                return 'Em Andamento';
            case 'break':
                return 'Em Pausa';
            case 'lunch':
                return 'Horário de Almoço';
            case 'problem':
                return 'Problema Reportado';
            case 'completed':
                return 'Concluído';
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
                Status da Tarefa
            </Typography>

            <Typography 
                variant="body1" 
                sx={{ 
                    mb: 2,
                    color: getStatusColor(currentStatus),
                    fontWeight: 'bold'
                }}
            >
                Status Atual: {getStatusText(currentStatus)}
            </Typography>

            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 1
            }}>
                {statusButtons.map((button) => (
                    <Tooltip 
                        key={button.status}
                        title={button.tooltip}
                        arrow
                    >
                        <Button
                            variant={currentStatus === button.status ? "contained" : "outlined"}
                            startIcon={button.icon}
                            onClick={() => onStatusChange(button.status)}
                            disabled={currentStatus === 'completed' && button.status !== 'in_progress'}
                            sx={{
                                borderColor: button.color,
                                color: currentStatus === button.status ? 'white' : button.color,
                                backgroundColor: currentStatus === button.status ? button.color : 'transparent',
                                '&:hover': {
                                    backgroundColor: currentStatus === button.status 
                                        ? button.color 
                                        : `${button.color}10`,
                                    borderColor: button.color,
                                },
                                textTransform: 'none',
                            }}
                        >
                            {button.label}
                        </Button>
                    </Tooltip>
                ))}
            </Box>
        </Box>
    );
} 