import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface TimerComponentProps {
  estimatedTime: number; // in minutes
  startTime?: Date;
}

const TimerComponent = ({ estimatedTime, startTime }: TimerComponentProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
      setElapsedTime(elapsed);
      setProgress((elapsed / estimatedTime) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, estimatedTime]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Tempo Decorrido: {formatTime(elapsedTime)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tempo Estimado: {formatTime(estimatedTime)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={Math.min(progress, 100)}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#282828',
          '& .MuiLinearProgress-bar': {
            backgroundColor: progress > 100 ? '#ff4444' : '#1DB954',
          },
        }}
      />
    </Box>
  );
};

export default TimerComponent; 