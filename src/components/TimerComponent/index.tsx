import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useTimer } from '../../contexts/TimerContext';

// Interface que define as propriedades do componente Timer
export interface TimerComponentProps {
    showControls?: boolean; // Controla a exibição dos botões de controle do timer
}

// Componente que exibe e controla o timer compartilhado entre Admin e Employee
const TimerComponent: React.FC<TimerComponentProps> = ({ showControls = true }) => {
    // Hook personalizado que gerencia o estado do timer
    const {
        currentTime,
        isRunning,
        status,
        startTimer,
        pauseTimer,
        resetTimer
    } = useTimer();

    // Formata o tempo em segundos para o formato MM:SS
    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Retorna a cor baseada no status atual do timer
    const getStatusColor = () => {
        switch (status) {
            case 'running':
                return '#1DB954';
            case 'paused':
                return '#f39c12';
            case 'completed':
                return '#e74c3c';
            default:
                return '#666';
        }
    };

    // Retorna o texto do status em português
    const getStatusText = () => {
        switch (status) {
            case 'running':
                return 'Em Andamento';
            case 'paused':
                return 'Pausado';
            case 'completed':
                return 'Concluído';
            default:
                return 'Não Iniciado';
        }
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            {/* Exibe o tempo atual do timer */}
            <Typography variant="h4" sx={{ color: getStatusColor(), mb: 1 }}>
                {formatTime(currentTime)}
            </Typography>
            {/* Exibe o status atual do timer */}
            <Typography variant="body2" sx={{ color: getStatusColor(), mb: showControls ? 2 : 0 }}>
                {getStatusText()}
            </Typography>
            {/* Controles do timer (play/pause e reset) */}
            {showControls && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {!isRunning ? (
                        <IconButton
                            onClick={startTimer}
                            sx={{ color: '#1DB954' }}
                            disabled={status === 'completed'}
                        >
                            <PlayArrowIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={pauseTimer} sx={{ color: '#f39c12' }}>
                            <PauseIcon />
                        </IconButton>
                    )}
                    <IconButton
                        onClick={resetTimer}
                        sx={{ color: '#666' }}
                        disabled={status === 'not_started'}
                    >
                        <RestartAltIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default TimerComponent; 