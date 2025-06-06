import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, IconButton, Fade, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FactoryIcon from '@mui/icons-material/Factory';
import GroupsIcon from '@mui/icons-material/Groups';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAuth } from '../../contexts/AuthContext';

const AdminHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigationCards = [
    // Grupo de Produção
    {
      title: 'Produção',
      description: 'Gerencie ordens de produção e acompanhe o status',
      icon: <FactoryIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/admin'
    },
    {
      title: 'Planejamento',
      description: 'Planeje e organize a produção',
      icon: <EventNoteIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/planning'
    },
    {
      title: 'Equipes',
      description: 'Visualize e gerencie as equipes de trabalho',
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/teams-management'
    },
    // Grupo de Qualidade e Estoque
    {
      title: 'Qualidade',
      description: 'Monitore e gerencie a qualidade da produção',
      icon: <VerifiedIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/quality-admin'
    },
    {
      title: 'Estoque',
      description: 'Controle o estoque de materiais e produtos',
      icon: <InventoryIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/inventory'
    },
    // Grupo de Gestão
    {
      title: 'Financeiro',
      description: 'Acesse relatórios e indicadores financeiros',
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/financial'
    },
    {
      title: 'Manutenção',
      description: 'Acompanhe solicitações de manutenção',
      icon: <BuildIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/maintenance'
    },
    {
      title: 'Configurações',
      description: 'Configure parâmetros do sistema',
      icon: <SettingsIcon sx={{ fontSize: 40, color: '#1DB954' }} />,
      path: '/settings'
    }
  ];

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          {/* Cabeçalho com boas-vindas */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography 
              variant="h3" 
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
              Painel Administrativo
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              Bem-vindo, {user?.name || 'Administrador'}
            </Typography>
          </Box>

          {/* Grid de cards de navegação */}
          <Grid container spacing={3}>
            {navigationCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={card.title}>
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card
                    onClick={() => navigate(card.path)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 25px rgba(29,185,84,0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <IconButton
                        sx={{
                          backgroundColor: 'rgba(29,185,84,0.1)',
                          width: 80,
                          height: 80,
                          '&:hover': {
                            backgroundColor: 'rgba(29,185,84,0.2)',
                          }
                        }}
                      >
                        {card.icon}
                      </IconButton>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Fade>
  );
};

export default AdminHome; 