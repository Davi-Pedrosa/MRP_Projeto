import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Task {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
}

interface GanttChartProps {
  tasks?: Task[];
}

const GanttBar = styled(Box)(({ theme }) => ({
  height: '30px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '4px',
  position: 'relative',
  '&:hover': {
    opacity: 0.9,
  },
}));

const GanttChart: React.FC<GanttChartProps> = ({ tasks = [] }) => {
  const theme = useTheme();

  // If no tasks, show placeholder
  if (tasks.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No tasks scheduled
        </Typography>
      </Paper>
    );
  }

  // Find the earliest and latest dates
  const earliestDate = new Date(Math.min(...tasks.map(task => task.startDate.getTime())));
  const latestDate = new Date(Math.max(...tasks.map(task => task.endDate.getTime())));
  const totalDuration = latestDate.getTime() - earliestDate.getTime();

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Production Schedule
      </Typography>
      <Box sx={{ mt: 2 }}>
        {tasks.map((task) => {
          const start = task.startDate.getTime() - earliestDate.getTime();
          const duration = task.endDate.getTime() - task.startDate.getTime();
          const leftPosition = (start / totalDuration) * 100;
          const width = (duration / totalDuration) * 100;

          return (
            <Box key={task.id} sx={{ mb: 2, position: 'relative' }}>
              <Typography variant="body2" gutterBottom>
                {task.name}
              </Typography>
              <Box sx={{ height: '30px', position: 'relative' }}>
                <GanttBar
                  sx={{
                    left: `${leftPosition}%`,
                    width: `${width}%`,
                    position: 'absolute',
                  }}
                >
                  <Box
                    sx={{
                      width: `${task.progress}%`,
                      height: '100%',
                      backgroundColor: theme.palette.success.main,
                      borderRadius: '4px 0 0 4px',
                    }}
                  />
                </GanttBar>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default GanttChart; 