import api from './api';

export interface OrdemProducao {
    id?: number;
    numeroPedido: string;
    produto: string;
    quantidade: number;
    status: 'PENDENTE' | 'EM_PRODUCAO' | 'CONCLUIDA' | 'CANCELADA';
    dataPrevisao: string;
    descricao: string;
    prioridade: 'BAIXA' | 'NORMAL' | 'ALTA' | 'URGENTE';
    observacoes?: string;
    custoEstimado: number;
    tempoEstimado: number;
    usuarioId?: number;
    usuarioNome?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const ordemProducaoService = {
    criar: async (ordem: OrdemProducao) => {
        const response = await api.post<OrdemProducao>('/ordens-producao', ordem);
        return response.data;
    },

    listar: async () => {
        const response = await api.get<OrdemProducao[]>('/ordens-producao');
        return response.data;
    },

    atualizarStatus: async (id: number, status: OrdemProducao['status']) => {
        const response = await api.put<OrdemProducao>(`/ordens-producao/${id}/status?status=${status}`);
        return response.data;
    }
}; 