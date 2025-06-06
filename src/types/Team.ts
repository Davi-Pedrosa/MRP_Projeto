import { TeamTypes, TeamStatus, TeamTrends } from '../config/teams';

export interface MembroEquipe {
    id: number;
    nome: string;
    funcao: string;
    disponivel: boolean;
    ultimaAtividade?: string;
    dataUltimaAtividade?: Date;
    status: 'ATIVO' | 'INATIVO' | 'FERIAS' | 'AFASTADO';
    cargaTrabalho: number;
    eficiencia: number;
    equipeId: number;
    habilidades: string[];
    certificacoes: string[];
    observacoes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Equipe {
    id: number;
    nome: string;
    descricao: string;
    membros: MembroEquipe[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EquipeResponse {
    id: number;
    nome: string;
    descricao: string;
    membros: MembroEquipe[];
    createdAt: string;
    updatedAt: string;
}

export interface TeamMember {
    id: number;
    nome: string;
    funcao: string;
    disponivel: boolean;
    ultimaAtividade: string;
    skills: string[];
}

export interface Team {
    id: number;
    name: string;
    type: keyof typeof TeamTypes;
    dailyCapacity: number;
    inUse: number;
    cpusInProcessing: number;
    timePerUnit: number;
    currentTask: string;
    progress: number;
    status: keyof typeof TeamStatus;
    trend: keyof typeof TeamTrends;
    nextAvailability: string;
    lastUpdate: string;
    members: TeamMember[];
    tools: string[];
    procedures: string[];
}

export interface TeamResponse {
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
    members: TeamMember[];
    tools: string[];
    procedures: string[];
} 