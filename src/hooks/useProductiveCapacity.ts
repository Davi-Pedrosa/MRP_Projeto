import { useState, useEffect } from 'react';
import api from '../services/api';
import { Team } from '../types/Team';

interface ProductiveCapacity {
    teams: Team[];
    loading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}

export function useProductiveCapacity(): ProductiveCapacity {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get('/teams');
            const teamsData = response.data;

            // Buscar membros para cada equipe
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
            console.error('Erro ao buscar dados de capacidade produtiva:', err);
            setError('Erro ao carregar dados das equipes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Atualiza a cada 30 segundos
        return () => clearInterval(interval);
    }, []);

    return {
        teams,
        loading,
        error,
        refreshData: fetchData
    };
} 