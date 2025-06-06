import { Equipe, MembroEquipe } from '../types/Team';
import api from './api';

export const equipeService = {
    getAll: () => api.get<Equipe[]>('/equipes'),
    getById: (id: number) => api.get<Equipe>(`/equipes/${id}`),
    getByStatus: (status: string) => api.get<Equipe[]>(`/equipes/status/${status}`),
    getByType: (type: string) => api.get<Equipe[]>(`/equipes/type/${type}`),
    getOverloaded: (threshold: number = 90) => api.get<Equipe[]>(`/equipes/overloaded?threshold=${threshold}`),
    create: (equipe: Partial<Equipe>) => api.post<Equipe>('/equipes', equipe),
    update: (id: number, equipe: Partial<Equipe>) => api.put<Equipe>(`/equipes/${id}`, equipe),
    updateStatus: (id: number, status: string) => api.put<Equipe>(`/equipes/${id}/status`, status),
    updateProgress: (id: number, progress: number) => api.put<Equipe>(`/equipes/${id}/progress`, progress),
    updateCurrentTask: (id: number, task: string) => api.put<Equipe>(`/equipes/${id}/current-task`, task),
    addMembro: (id: number, membro: Partial<MembroEquipe>) => api.post<Equipe>(`/equipes/${id}/membros`, membro),
    removeMembro: (id: number, membroId: number) => api.delete(`/equipes/${id}/membros/${membroId}`),
    delete: (id: number) => api.delete(`/equipes/${id}`)
}; 