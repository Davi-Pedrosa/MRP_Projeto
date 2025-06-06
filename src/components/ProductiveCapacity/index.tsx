import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Chip,
    Tooltip,
    Grid as MuiGrid,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    IconButton,
    Link as MuiLink
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useProductiveCapacity } from '../../hooks/useProductiveCapacity';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// Criando um Grid customizado com as props corretas
const Grid = styled(MuiGrid)({});

export default function CapacidadeProdutiva() {
    const navigate = useNavigate();
    const { recursos, metricas, carregando, erro, formatarData } = useProductiveCapacity();

    const getCorStatus = (status: 'normal' | 'atencao' | 'critico') => {
        switch (status) {
            case 'normal':
                return '#1DB954';
            case 'atencao':
                return '#f39c12';
            case 'critico':
                return '#e74c3c';
            default:
                return '#666';
        }
    };

    const getTextoStatus = (status: 'normal' | 'atencao' | 'critico') => {
        switch (status) {
            case 'normal':
                return 'Normal';
            case 'atencao':
                return 'Atenção';
            case 'critico':
                return 'Crítico';
            default:
                return status;
        }
    };

    const getTendenciaIcon = (tendencia?: 'subindo' | 'descendo' | 'estavel') => {
        switch (tendencia) {
            case 'subindo':
                return <TrendingUpIcon sx={{ color: '#e74c3c' }} />;
            case 'descendo':
                return <TrendingDownIcon sx={{ color: '#1DB954' }} />;
            case 'estavel':
                return <TrendingFlatIcon sx={{ color: '#f39c12' }} />;
            default:
                return null;
        }
    };

    if (carregando) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (erro) {
        return (
            <Box sx={{ m: 2 }}>
                <Alert severity="error">{erro}</Alert>
            </Box>
        );
    }

    if (!metricas || recursos.length === 0) {
        return (
            <Box sx={{ m: 2 }}>
                <Alert severity="warning">Nenhum dado disponível</Alert>
            </Box>
        );
    }

    return (
        <Box>
            {/* Métricas Gerais */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Capacidade Total
                            </Typography>
                            <Typography variant="h4" sx={{ color: '#1DB954' }}>
                                {metricas.capacidadeTotal}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                CPUs por dia
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Em Processamento
                            </Typography>
                            <Typography variant="h4" sx={{ color: '#1DB954' }}>
                                {metricas.cpusEmProcessamento}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                CPUs em produção
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Utilização Média
                            </Typography>
                            <Typography variant="h4" sx={{ color: metricas.utilizacaoMedia > 90 ? '#e74c3c' : '#1DB954' }}>
                                {metricas.utilizacaoMedia}%
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Capacidade em uso
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Equipes em Sobrecarga
                            </Typography>
                            <Typography variant="h4" sx={{ color: metricas.equipesEmSobrecarga > 0 ? '#e74c3c' : '#1DB954' }}>
                                {metricas.equipesEmSobrecarga}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Status crítico
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Última Atualização */}
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: 'right' }}>
                Última atualização: {formatarData(metricas.ultimaAtualizacao)}
            </Typography>

            {/* Tabela de Capacidade */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Equipe</TableCell>
                            <TableCell align="center">Capacidade Utilizada</TableCell>
                            <TableCell align="center">CPUs em Processo</TableCell>
                            <TableCell align="center">Tempo/Unidade</TableCell>
                            <TableCell align="center">Próxima Disponibilidade</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Tendência</TableCell>
                            <TableCell align="center">Link Direto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recursos.map((recurso) => (
                            <TableRow
                                key={recurso.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    bgcolor: recurso.status === 'critico' ? '#fff5f5' : 'inherit'
                                }}
                            >
                                <TableCell>
                                    <Box>
                                        <MuiLink
                                            component={RouterLink}
                                            to={`/equipe/${recurso.id}`}
                                            sx={{
                                                color: '#1DB954',
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {recurso.nome}
                                        </MuiLink>
                                        <Typography variant="caption" color="textSecondary" display="block">
                                            Atualizado: {formatarData(recurso.ultimaAtualizacao)}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <Tooltip title={`${recurso.emUso}% da capacidade em uso`}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={recurso.emUso}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        bgcolor: '#e9ecef',
                                                        '& .MuiLinearProgress-bar': {
                                                            bgcolor: getCorStatus(recurso.status)
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {recurso.emUso}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title={`Capacidade diária: ${recurso.capacidadeDiaria} CPUs`}>
                                        <Typography>
                                            {recurso.cpusEmProcessamento} / {recurso.capacidadeDiaria}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    {recurso.tempoPorUnidade} min
                                </TableCell>
                                <TableCell align="center">
                                    {formatarData(recurso.proximaDisponibilidade)}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={getTextoStatus(recurso.status)}
                                        sx={{
                                            bgcolor: getCorStatus(recurso.status),
                                            color: 'white',
                                            fontWeight: 500
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {getTendenciaIcon(recurso.tendencia)}
                                </TableCell>
                                <TableCell align="center">
                                    <MuiLink
                                        component={RouterLink}
                                        to={`/equipe/${recurso.id}`}
                                        sx={{
                                            color: '#1DB954',
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Ver Detalhes
                                    </MuiLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Legenda */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            bgcolor: '#1DB954',
                            borderRadius: '50%'
                        }}
                    />
                    <Typography variant="body2">Normal (≤ 85%)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            bgcolor: '#f39c12',
                            borderRadius: '50%'
                        }}
                    />
                    <Typography variant="body2">Atenção (86-95%)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            bgcolor: '#e74c3c',
                            borderRadius: '50%'
                        }}
                    />
                    <Typography variant="body2">Crítico (&gt; 95%)</Typography>
                </Box>
            </Box>
        </Box>
    );
} 