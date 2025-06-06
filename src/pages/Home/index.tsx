import { Box, Button, Container, Grid, Typography, Card, CardContent, Fade, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import FactoryIcon from '@mui/icons-material/Factory';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';

const Home = () => {
  const navigate = useNavigate();

  const navigationButtons = [
    { 
      text: 'Área do Funcionário', 
      path: '/employee',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      description: 'Acesse sua área pessoal e gerencie suas atividades'
    },
    { 
      text: 'Produção', 
      path: '/admin',
      icon: <FactoryIcon sx={{ fontSize: 40 }} />,
      description: 'Gerencie ordens de produção e acompanhe o status'
    },
    { 
      text: 'Manutenção', 
      path: '/maintenance',
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      description: 'Controle manutenções e equipamentos'
    },
    { 
      text: 'Financeiro', 
      path: '/financial',
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      description: 'Acompanhe métricas e indicadores financeiros'
    },
    { 
      text: 'Configurações', 
      path: '/settings',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      description: 'Configure parâmetros do sistema'
    },
  ];

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg">
        <Box sx={{ 
          mt: 4, 
          mb: 4,
          textAlign: 'center'
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{
              color: '#1DB954',
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              mb: 6,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '25%',
                width: '50%',
                height: 4,
                backgroundColor: '#1DB954',
                borderRadius: 2
              }
            }}
          >
            Sistema MRP2
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {navigationButtons.map((button, index) => (
              <Grid item xs={12} sm={6} md={4} key={button.path}>
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card 
                    onClick={() => navigate(button.path)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                        '& .icon': {
                          transform: 'scale(1.1)',
                          color: '#1DB954'
                        }
                      }
                    }}
                  >
                    <CardContent sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4
                    }}>
                      <Box 
                        className="icon"
                        sx={{ 
                          color: '#666',
                          mb: 2,
                          transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out'
                        }}
                      >
                        {button.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 'bold',
                          color: '#1DB954'
                        }}
                      >
                        {button.text}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          textAlign: 'center',
                          opacity: 0.8
                        }}
                      >
                        {button.description}
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

export default Home; 