import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    Tooltip,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Tabs,
    Tab
} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot
} from '@mui/lab';
import {
    Speed as SpeedIcon,
    Error as ErrorIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    TrendingFlat as TrendingFlatIcon,
    Person as PersonIcon,
    Build as BuildIcon
} from '@mui/icons-material';
import type { CapacidadeRecurso } from '../../hooks/useProductiveCapacity';
import InspectionForm from '../QualityControl/InspectionForm';
import QualityMetrics from '../QualityControl/QualityMetrics';
import NonConformityLog from '../QualityControl/NonConformityLog';
import CorrectiveActions from '../QualityControl/CorrectiveActions';

interface HistoricoEvento {
    id: number;
    timestamp: Date;
    tipo: 'erro' | 'alerta' | 'sucesso';
    mensagem: string;
}

interface MembroEquipe {
    id: number;
    nome: string;
    funcao: string;
    disponivel: boolean;
    ultimaAtividade?: string;
}

interface TeamDetailsProps {
    recurso: CapacidadeRecurso;
    formatarData: (data: Date) => string;
}

// Dados simulados para demonstração
const membrosSimulados: MembroEquipe[] = [
    { id: 1, nome: 'João Silva', funcao: 'Líder Técnico', disponivel: true },
    { id: 2, nome: 'Maria Santos', funcao: 'Técnica Senior', disponivel: true },
    { id: 3, nome: 'Pedro Oliveira', funcao: 'Técnico', disponivel: false, ultimaAtividade: 'Em pausa' },
    { id: 4, nome: 'Ana Costa', funcao: 'Técnica', disponivel: true }
];

const historicoSimulado: HistoricoEvento[] = [
    { 
        id: 1, 
        timestamp: new Date(Date.now() - 1800000),
        tipo: 'erro',
        mensagem: 'Falha no teste de componente CPU#123'
    },
    {
        id: 2,
        timestamp: new Date(Date.now() - 3600000),
        tipo: 'sucesso',
        mensagem: 'Lote CPU#120-125 aprovado com sucesso'
    },
    {
        id: 3,
        timestamp: new Date(Date.now() - 7200000),
        tipo: 'alerta',
        mensagem: 'Capacidade próxima do limite'
    }
];

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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`team-tabpanel-${index}`}
            aria-labelledby={`team-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function TeamDetails({ recurso, formatarData }: TeamDetailsProps) {
    const [tabValue, setTabValue] = useState(0);
    const [qualityData, setQualityData] = useState({
        inspections: [],
        metrics: {
            approved: 15,
            rejected: 2,
            pending: 3,
            total: 20,
            defectRate: 10,
            qualityScore: 85,
        },
        nonConformities: [],
        correctiveActions: [],
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleInspectionSubmit = (inspection: any) => {
        // Implementar lógica de submissão
        console.log('Nova inspeção:', inspection);
    };

    const handleAddNonConformity = (nonConformity: any) => {
        // Implementar lógica de adição
        console.log('Nova não conformidade:', nonConformity);
    };

    const handleUpdateNonConformityStatus = (id: number, status: string) => {
        // Implementar lógica de atualização
        console.log('Atualizar status:', id, status);
    };

    const handleAddCorrectiveAction = (action: any) => {
        // Implementar lógica de adição
        console.log('Nova ação corretiva:', action);
    };

    const handleUpdateCorrectiveAction = (id: number, action: any) => {
        // Implementar lógica de atualização
        console.log('Atualizar ação:', id, action);
    };

    const handleDeleteCorrectiveAction = (id: number) => {
        // Implementar lógica de exclusão
        console.log('Excluir ação:', id);
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Cabeçalho */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {recurso.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Última atualização: {formatarData(recurso.ultimaAtualizacao)}
                </Typography>
            </Box>

            <Paper sx={{ mt: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{
                        '.MuiTabs-indicator': {
                            backgroundColor: '#1DB954',
                        },
                        '.Mui-selected': {
                            color: '#1DB954 !important',
                        },
                    }}
                >
                    <Tab label="Informações Gerais" />
                    <Tab label="Controle de Qualidade" />
                    <Tab label="Histórico" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    {/* Métricas Principais */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <SpeedIcon sx={{ mr: 1 }} />
                                        <Typography variant="h6">Capacidade Atual</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ flexGrow: 1 }}>
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
                                        {getTendenciaIcon(recurso.tendencia)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <BuildIcon sx={{ mr: 1 }} />
                                        <Typography variant="h6">CPUs em Processo</Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ color: '#1DB954' }}>
                                        {recurso.cpusEmProcessamento} / {recurso.capacidadeDiaria}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Capacidade diária
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <ScheduleIcon sx={{ mr: 1 }} />
                                        <Typography variant="h6">Tempo por Unidade</Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ color: '#1DB954' }}>
                                        {recurso.tempoPorUnidade}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Minutos por CPU
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <PersonIcon sx={{ mr: 1 }} />
                                        <Typography variant="h6">Equipe</Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ color: '#1DB954' }}>
                                        {membrosSimulados.length}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {membrosSimulados.filter(m => m.disponivel).length} disponíveis
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Membros da Equipe e Histórico */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Membros da Equipe
                                </Typography>
                                <List>
                                    {membrosSimulados.map((membro) => (
                                        <ListItem key={membro.id}>
                                            <ListItemIcon>
                                                <PersonIcon sx={{ color: membro.disponivel ? '#1DB954' : '#666' }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={membro.nome}
                                                secondary={
                                                    <>
                                                        {membro.funcao}
                                                        {!membro.disponivel && ` • ${membro.ultimaAtividade}`}
                                                    </>
                                                }
                                            />
                                            <Chip
                                                label={membro.disponivel ? 'Disponível' : 'Indisponível'}
                                                sx={{
                                                    bgcolor: membro.disponivel ? '#1DB954' : '#666',
                                                    color: 'white'
                                                }}
                                                size="small"
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Histórico de Eventos
                                </Typography>
                                <Timeline>
                                    {historicoSimulado.map((evento) => (
                                        <TimelineItem key={evento.id}>
                                            <TimelineSeparator>
                                                <TimelineDot sx={{
                                                    bgcolor: evento.tipo === 'erro' ? '#e74c3c' :
                                                            evento.tipo === 'alerta' ? '#f39c12' : '#1DB954'
                                                }}>
                                                    {evento.tipo === 'erro' ? <ErrorIcon /> :
                                                     evento.tipo === 'alerta' ? <WarningIcon /> :
                                                     <CheckCircleIcon />}
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="body1">
                                                    {evento.mensagem}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {formatarData(evento.timestamp)}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </Paper>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <QualityMetrics metrics={qualityData.metrics} />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <InspectionForm onSubmit={handleInspectionSubmit} />
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <NonConformityLog
                                    nonConformities={qualityData.nonConformities}
                                    onAddNonConformity={handleAddNonConformity}
                                    onUpdateStatus={handleUpdateNonConformityStatus}
                                />
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <CorrectiveActions
                                    actions={qualityData.correctiveActions}
                                    onAddAction={handleAddCorrectiveAction}
                                    onUpdateAction={handleUpdateCorrectiveAction}
                                    onDeleteAction={handleDeleteCorrectiveAction}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    {/* Conteúdo da aba de Histórico */}
                    <Typography>Histórico da equipe aqui...</Typography>
                </TabPanel>
            </Paper>
        </Box>
    );
} 