import axios from 'axios';
import { Equipe, MembroEquipe } from '../types/Team';

// Criando uma instância do axios com configurações base
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interface para Team
interface Team {
    id: number;
    name: string;
    type: string;
    dailyCapacity: number;
    inUse: number;
    cpusInProcessing: number;
    timePerUnit: number;
    currentTask: string;
    progress: number;
    status: string;
    trend: string;
    nextAvailability: string;
    lastUpdate: string;
    tools: string[];
    procedures: string[];
}

// Interface para TeamMember
interface TeamMember {
    id: number;
    nome: string;
    funcao: string;
    disponivel: boolean;
    ultimaAtividade: string;
    skills: string[];
    team?: Team;
}

// Interface para os dados financeiros
export interface FinancialData {
    operationalCosts: {
        labor: number;
        materials: number;
        equipment: number;
        utilities: number;
        maintenance: number;
        total: number;
    };
    revenue: {
        totalSales: number;
        averageUnitPrice: number;
        unitsProduced: number;
    };
    grossProfit: number;
    netProfit: number;
    profitMargin: number;
    monthlyComparison?: {
        grossProfitChange: number;
        netProfitChange: number;
        revenueChange: number;
    };
}

// Interface para os parâmetros de filtro
export interface FinancialFilters {
    startDate?: string;
    endDate?: string;
    department?: string;
    productLine?: string;
}

// Serviço para equipes
export const equipeService = {
    getAll: () => api.get<Equipe[]>('/equipes'),
    getById: (id: number) => api.get<Equipe>(`/equipes/${id}`),
    getByStatus: (status: string) => api.get<Equipe[]>(`/equipes/status/${status}`),
    getByType: (type: string) => api.get<Equipe[]>(`/equipes/type/${type}`),
    getOverloaded: (threshold: number = 90) => api.get<Equipe[]>(`/equipes/overloaded?threshold=${threshold}`),
    create: (equipe: Partial<Equipe>) => api.post<Equipe>('/equipes', equipe),
    updateStatus: (id: number, status: string) => api.put<Equipe>(`/equipes/${id}/status`, status),
    updateProgress: (id: number, progress: number) => api.put<Equipe>(`/equipes/${id}/progress`, progress),
    updateCurrentTask: (id: number, task: string) => api.put<Equipe>(`/equipes/${id}/current-task`, task),
    addMembro: (id: number, membro: Partial<MembroEquipe>) => api.post<Equipe>(`/equipes/${id}/membros`, membro),
    removeMembro: (id: number, membroId: number) => api.delete(`/equipes/${id}/membros/${membroId}`),
    update: (id: number, equipe: Partial<Equipe>) => api.put<Equipe>(`/equipes/${id}`, equipe),
    delete: (id: number) => api.delete(`/equipes/${id}`)
};

// Serviço para membros de equipe
export const membroEquipeService = {
    getAll: () => api.get<MembroEquipe[]>('/membros'),
    getById: (id: number) => api.get<MembroEquipe>(`/membros/${id}`),
    getByEquipeId: (equipeId: number) => api.get<MembroEquipe[]>(`/membros/equipe/${equipeId}`),
    getByDisponivel: (disponivel: boolean) => api.get<MembroEquipe[]>(`/membros/disponivel/${disponivel}`),
    getByFuncao: (funcao: string) => api.get<MembroEquipe[]>(`/membros/funcao/${funcao}`),
    getByStatus: (status: string) => api.get<MembroEquipe[]>(`/membros/status/${status}`),
    getByCargaTrabalhoMenorQue: (cargaMaxima: number) => api.get<MembroEquipe[]>(`/membros/carga-trabalho/menor-que/${cargaMaxima}`),
    create: (membro: Partial<MembroEquipe>) => api.post<MembroEquipe>('/membros', membro),
    update: (id: number, membro: Partial<MembroEquipe>) => api.put<MembroEquipe>(`/membros/${id}`, membro),
    delete: (id: number) => api.delete(`/membros/${id}`),
    atualizarDisponibilidade: (id: number, disponivel: boolean) =>
        api.put<MembroEquipe>(`/membros/${id}/disponibilidade?disponivel=${disponivel}`),
    atualizarUltimaAtividade: (id: number, atividade: string) =>
        api.put<MembroEquipe>(`/membros/${id}/ultima-atividade`, atividade),
    atualizarStatus: (id: number, status: string) =>
        api.put<MembroEquipe>(`/membros/${id}/status`, status),
    atualizarCargaTrabalho: (id: number, cargaTrabalho: number) =>
        api.put<MembroEquipe>(`/membros/${id}/carga-trabalho`, cargaTrabalho),
    atualizarEficiencia: (id: number, eficiencia: number) =>
        api.put<MembroEquipe>(`/membros/${id}/eficiencia`, eficiencia),
    atualizarHabilidades: (id: number, habilidades: string[]) =>
        api.put<MembroEquipe>(`/membros/${id}/habilidades`, habilidades),
    atualizarCertificacoes: (id: number, certificacoes: string[]) =>
        api.put<MembroEquipe>(`/membros/${id}/certificacoes`, certificacoes)
};

// Serviço para dados financeiros
export const financialService = {
    // Buscar dados financeiros com filtros opcionais
    getFinancialData: async (filters?: FinancialFilters): Promise<FinancialData> => {
        try {
            const response = await api.get('/financial', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados financeiros:', error);
            throw error;
        }
    },

    // Buscar histórico financeiro
    getFinancialHistory: async (period: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
        try {
            const response = await api.get(`/financial/history/${period}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar histórico financeiro:', error);
            throw error;
        }
    },

    // Buscar detalhes de custos operacionais
    getOperationalCostsDetails: async (costType: string) => {
        try {
            const response = await api.get(`/financial/costs/${costType}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar detalhes de custos:', error);
            throw error;
        }
    },

    // Enviar atualizações de dados financeiros
    updateFinancialData: async (data: Partial<FinancialData>) => {
        try {
            const response = await api.put('/financial', data);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar dados financeiros:', error);
            throw error;
        }
    }
};

// Interceptor para tratar erros
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // O servidor respondeu com um status de erro
            const errorMessage = error.response.data || 'Erro no servidor';
            
            if (error.response.status === 401) {
                // Não autorizado - redirecionar para login
                localStorage.clear();
                window.location.href = '/login';
            }
            
            return Promise.reject(errorMessage);
        }
        
        return Promise.reject('Erro de conexão');
    }
);

export default api; 