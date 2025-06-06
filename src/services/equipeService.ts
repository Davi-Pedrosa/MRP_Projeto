import api from './api';

export interface Equipe {
    id?: number;
    nome: string;
    tipo: string;
    capacidadeDiaria: number;
    emUso: number;
    cpusEmProcessamento: number;
    tempoPorUnidade: number;
    status: 'NORMAL' | 'ATENCAO' | 'CRITICO';
    tendencia: 'SUBINDO' | 'DESCENDO' | 'ESTAVEL';
    proximaDisponibilidade: string;
    ultimaAtualizacao: string;
    membros: MembroEquipe[];
    ferramentas: string[];
    procedimentos: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface MembroEquipe {
    id?: number;
    nome: string;
    funcao: string;
    disponivel: boolean;
    ultimaAtividade: string;
    skills: string[];
    equipe?: Equipe;
}

export const equipeService = {
    criar: async (equipe: Omit<Equipe, 'id' | 'createdAt' | 'updatedAt'>) => {
        const response = await api.post<Equipe>('/equipes', equipe);
        return response.data;
    },

    listar: async () => {
        const response = await api.get<Equipe[]>('/equipes');
        return response.data;
    },

    buscarPorId: async (id: number) => {
        const response = await api.get<Equipe>(`/equipes/${id}`);
        return response.data;
    },

    buscarPorStatus: async (status: Equipe['status']) => {
        const response = await api.get<Equipe[]>(`/equipes/status/${status}`);
        return response.data;
    },

    buscarPorTipo: async (tipo: string) => {
        const response = await api.get<Equipe[]>(`/equipes/tipo/${tipo}`);
        return response.data;
    },

    buscarPorUsoAcima: async (limite: number) => {
        const response = await api.get<Equipe[]>(`/equipes/uso-acima/${limite}`);
        return response.data;
    },

    atualizar: async (id: number, equipe: Partial<Equipe>) => {
        const response = await api.put<Equipe>(`/equipes/${id}`, equipe);
        return response.data;
    },

    deletar: async (id: number) => {
        await api.delete(`/equipes/${id}`);
    },

    // Métodos específicos para membros
    adicionarMembro: async (equipeId: number, membro: Omit<MembroEquipe, 'id' | 'equipe'>) => {
        const response = await api.post<Equipe>(`/equipes/${equipeId}/membros`, membro);
        return response.data;
    },

    removerMembro: async (equipeId: number, membroId: number) => {
        await api.delete(`/equipes/${equipeId}/membros/${membroId}`);
    },

    // Métodos de atualização específicos
    atualizarStatus: async (id: number, status: Equipe['status']) => {
        const response = await api.put<Equipe>(`/equipes/${id}/status`, { status });
        return response.data;
    },

    atualizarCapacidade: async (id: number, capacidadeDiaria: number) => {
        const response = await api.put<Equipe>(`/equipes/${id}/capacidade`, { capacidadeDiaria });
        return response.data;
    },

    atualizarUso: async (id: number, emUso: number) => {
        const response = await api.put<Equipe>(`/equipes/${id}/uso`, { emUso });
        return response.data;
    }
}; 