import api from './api';

export interface ProductionOrder {
    id: number;
    product: string;
    quantity: number;
    startDate: string;
    endDate: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    team: string;
    createdAt?: string;
    updatedAt?: string;
}

export const productionOrderService = {
    getAll: () => api.get<ProductionOrder[]>('/production-orders'),
    getById: (id: number) => api.get<ProductionOrder>(`/production-orders/${id}`),
    create: (order: Partial<ProductionOrder>) => api.post<ProductionOrder>('/production-orders', order),
    update: (id: number, order: Partial<ProductionOrder>) => api.put<ProductionOrder>(`/production-orders/${id}`, order),
    delete: (id: number) => api.delete(`/production-orders/${id}`),
    updateStatus: (id: number, status: ProductionOrder['status']) => 
        api.put<ProductionOrder>(`/production-orders/${id}/status/${status}`, {}),
    getByStatus: (status: ProductionOrder['status']) => 
        api.get<ProductionOrder[]>(`/production-orders/status/${status}`),
    getByPriority: (priority: ProductionOrder['priority']) => 
        api.get<ProductionOrder[]>(`/production-orders/priority/${priority}`),
    getByTeam: (team: string) => 
        api.get<ProductionOrder[]>(`/production-orders/team/${team}`)
}; 