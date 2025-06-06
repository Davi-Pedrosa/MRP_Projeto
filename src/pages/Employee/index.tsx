import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Zoom,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  RestaurantMenu,
  Error,
  CheckCircle,
  Build,
  Inventory,
  Person,
  AccessTime,
} from '@mui/icons-material';
import TimerComponent from '../../components/TimerComponent';

type TaskStatus = 'not_started' | 'in_progress' | 'break' | 'lunch' | 'problem' | 'completed';

interface Material {
  name: string;
  quantity: number;
  unit: string;
}

interface Tool {
  name: string;
  quantity: number;
}

const Employee = () => {
  const [status, setStatus] = useState<TaskStatus>('not_started');
  const [startTime, setStartTime] = useState<Date | undefined>();

  // Mock data - replace with real data from your backend
  const taskData = {
    id: '1',
    name: 'Montagem do Produto XYZ',
    estimatedTime: 120, // 2 hours in minutes
    assignedTo: 'João Silva',
    materials: [
      { name: 'Parafuso M4', quantity: 12, unit: 'unidades' },
      { name: 'Placa de Metal', quantity: 2, unit: 'peças' },
    ] as Material[],
    tools: [
      { name: 'Chave de Fenda', quantity: 1 },
      { name: 'Alicate', quantity: 1 },
    ] as Tool[],
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    setStatus(newStatus);
    if (newStatus === 'in_progress' && !startTime) {
      setStartTime(new Date());
    }
  };

  const getStatusColor = (buttonStatus: TaskStatus) => {
    switch (buttonStatus) {
      case 'in_progress':
        return '#1DB954';
      case 'break':
      case 'lunch':
        return '#f39c12';
      case 'problem':
        return '#e74c3c';
      case 'completed':
        return '#2ecc71';
      default:
        return '#666';
    }
  };

  const getStatusButton = (buttonStatus: TaskStatus, icon: JSX.Element, label: string) => (
    <Button
      variant={status === buttonStatus ? 'contained' : 'outlined'}
      startIcon={icon}
      onClick={() => handleStatusChange(buttonStatus)}
      sx={{
        backgroundColor: status === buttonStatus ? getStatusColor(buttonStatus) : 'transparent',
        borderColor: getStatusColor(buttonStatus),
        color: status === buttonStatus ? 'white' : getStatusColor(buttonStatus),
        '&:hover': {
          backgroundColor: status === buttonStatus 
            ? getStatusColor(buttonStatus) 
            : `${getStatusColor(buttonStatus)}22`,
          borderColor: getStatusColor(buttonStatus),
        },
        transition: 'all 0.3s ease-in-out',
        fontWeight: 'bold',
      }}
    >
      {label}
    </Button>
  );

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{
                color: '#1DB954',
                fontWeight: 'bold',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '25%',
                  width: '50%',
                  height: 4,
                  backgroundColor: '#1DB954',
                  borderRadius: 2
                }
              }}
            >
              {taskData.name}
            </Typography>
          </Box>

          {/* Task Info and Timer */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                <Card sx={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  height: '100%',
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                      Informações da Tarefa
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Person sx={{ color: '#666', mr: 1 }} />
                        <Typography variant="body1">
                          <strong>Responsável:</strong> {taskData.assignedTo}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ color: '#666', mr: 1 }} />
                        <Typography variant="body1">
                          <strong>Tempo Estimado:</strong> {taskData.estimatedTime} minutos
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <Card sx={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  height: '100%',
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                      Controle de Tempo
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <TimerComponent />
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          </Grid>

          {/* Status Buttons */}
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Paper sx={{ 
              p: 3, 
              mb: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3,
                color: '#1DB954',
                fontWeight: 'bold',
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
                Status da Tarefa
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  {getStatusButton('not_started', <PlayArrow />, 'Não Iniciado')}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {getStatusButton('in_progress', <PlayArrow />, 'Em Progresso')}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {getStatusButton('break', <Pause />, 'Pausa')}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {getStatusButton('lunch', <RestaurantMenu />, 'Almoço')}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {getStatusButton('problem', <Error />, 'Problema')}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {getStatusButton('completed', <CheckCircle />, 'Concluído')}
                </Grid>
              </Grid>
            </Paper>
          </Zoom>

          {/* Materials and Tools */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                <Paper sx={{ 
                  p: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  height: '100%',
                }}>
                  <Typography variant="h6" gutterBottom sx={{
                    color: '#1DB954',
                    fontWeight: 'bold',
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
                    <Inventory />
                    Materiais Necessários
                  </Typography>
                  <List>
                    {taskData.materials.map((material, index) => (
                      <ListItem 
                        key={index}
                        sx={{
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            backgroundColor: 'rgba(29, 185, 84, 0.05)',
                            borderRadius: 1
                          }
                        }}
                      >
                        <ListItemIcon>
                          <Inventory sx={{ color: '#1DB954' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={material.name}
                          secondary={
                            <Chip 
                              label={`${material.quantity} ${material.unit}`}
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(29, 185, 84, 0.1)',
                                color: '#1DB954',
                                fontWeight: 'bold'
                              }}
                            />
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom in={true} style={{ transitionDelay: '500ms' }}>
                <Paper sx={{ 
                  p: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  height: '100%',
                }}>
                  <Typography variant="h6" gutterBottom sx={{
                    color: '#1DB954',
                    fontWeight: 'bold',
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
                    <Build />
                    Ferramentas Necessárias
                  </Typography>
                  <List>
                    {taskData.tools.map((tool, index) => (
                      <ListItem 
                        key={index}
                        sx={{
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            backgroundColor: 'rgba(29, 185, 84, 0.05)',
                            borderRadius: 1
                          }
                        }}
                      >
                        <ListItemIcon>
                          <Build sx={{ color: '#1DB954' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={tool.name}
                          secondary={
                            <Chip 
                              label={`Quantidade: ${tool.quantity}`}
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(29, 185, 84, 0.1)',
                                color: '#1DB954',
                                fontWeight: 'bold'
                              }}
                            />
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fade>
  );
};

export default Employee; 