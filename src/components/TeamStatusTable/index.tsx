import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    LinearProgress,
    Typography,
    Box
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';
import { 
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import { MembroEquipe } from '../../types/Team';

interface TeamMember {
    id: number;
    nome: string;
    funcao: string;
    disponivel: boolean;
    ultimaAtividade: string;
    skills: string[];
}

interface Team {
    id: number;
    name: string;
    type: string;
    members: TeamMember[];
    currentTask: string;
    status: 'IN_PRODUCTION' | 'PROBLEM' | 'COMPLETED' | 'PAUSED';
    progress: number;
    lastUpdate: string;
}

/**
 * Componente que exibe uma tabela com o status atual de todas as equipes
 * Mostra informações como nome da equipe, tarefa atual, status, progresso e última atualização
 * @component
 */
export default function TeamStatusTable() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeams = async () => {
        try {
            setLoading(true);
            // Buscar todas as equipes
            const teamsResponse = await api.get('/teams');
            const teamsData = teamsResponse.data;

            // Para cada equipe, buscar seus membros
            const teamsWithMembers = await Promise.all(
                teamsData.map(async (team: Team) => {
                    const membersResponse = await api.get(`/membros/equipe/${team.id}`);
                    return {
                        ...team,
                        members: membersResponse.data
                    };
                })
            );

            setTeams(teamsWithMembers);
            setError(null);
        } catch (err) {
            console.error('Erro ao carregar dados:', err);
            setError('Erro ao carregar dados das equipes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
        const interval = setInterval(fetchTeams, 30000); // Atualiza a cada 30 segundos
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <LinearProgress />;
    }

    if (error) {
        return (
            <Typography color="error" align="center">
                {error}
            </Typography>
        );
    }

    /**
     * Retorna a cor correspondente ao status da equipe
     * @param {Team['status']} status - Status atual da equipe
     * @returns {string} Código hexadecimal da cor
     */
    const getStatusColor = (status: Team['status']) => {
        switch (status) {
            case 'IN_PRODUCTION':
                return '#1DB954';
            case 'PROBLEM':
                return '#ff4444';
            case 'COMPLETED':
                return '#2ecc71';
            case 'PAUSED':
                return '#f39c12';
            default:
                return '#666';
        }
    };

    /**
     * Retorna o texto em português correspondente ao status da equipe
     * @param {Team['status']} status - Status atual da equipe
     * @returns {string} Texto do status em português
     */
    const getStatusText = (status: Team['status']) => {
        switch (status) {
            case 'IN_PRODUCTION':
                return 'Em Produção';
            case 'PROBLEM':
                return 'Problema';
            case 'COMPLETED':
                return 'Concluído';
            case 'PAUSED':
                return 'Pausado';
            default:
                return status;
        }
    };

    const getMembersStatus = (members: TeamMember[]) => {
        const total = members.length;
        const disponivel = members.filter(m => m.disponivel).length;
        return `${disponivel}/${total} disponíveis`;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ATIVO':
                return <CheckCircleIcon style={{ color: '#4caf50' }} />;
            case 'INATIVO':
                return <CancelIcon style={{ color: '#f44336' }} />;
            case 'FERIAS':
                return <WarningIcon style={{ color: '#ff9800' }} />;
            case 'AFASTADO':
                return <WarningIcon style={{ color: '#f44336' }} />;
            default:
                return null;
        }
    };

    const getDisponibilidadeColor = (disponivel: boolean) => {
        return disponivel ? '#4caf50' : '#f44336';
    };

    const getEficienciaColor = (eficiencia: number) => {
        if (eficiencia >= 1.0) return '#4caf50';
        if (eficiencia >= 0.7) return '#ff9800';
        return '#f44336';
    };

    const getCargaTrabalhoColor = (carga: number) => {
        if (carga <= 70) return '#4caf50';
        if (carga <= 90) return '#ff9800';
        return '#f44336';
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Equipe</TableCell>
                        <TableCell>Membros</TableCell>
                        <TableCell>Tarefa Atual</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Progresso</TableCell>
                        <TableCell>Última Atualização</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((team) => (
                        <TableRow key={team.id}>
                            <TableCell>{team.name}</TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {getMembersStatus(team.members)}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {team.members.map(m => m.nome).join(', ')}
                                </Typography>
                            </TableCell>
                            <TableCell>{team.currentTask}</TableCell>
                            <TableCell>
                                <Chip
                                    label={getStatusText(team.status)}
                                    style={{
                                        backgroundColor: getStatusColor(team.status),
                                        color: 'white'
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={team.progress}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: getStatusColor(team.status),
                                                    borderRadius: 5,
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography variant="body2" color="textSecondary">
                                            {`${Math.round(team.progress)}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                {formatDistanceToNow(new Date(team.lastUpdate), {
                                    addSuffix: true,
                                    locale: ptBR
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} 