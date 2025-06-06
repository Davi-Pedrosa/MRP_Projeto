import api from './api';

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export const authService = {
    login: async (email: string, password: string) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', { 
                email, 
                senha: password 
            });
            
            if (!response.data.accessToken || !response.data.user) {
                throw new Error('Resposta inválida do servidor');
            }
            
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refresh_token', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data;
        } catch (error) {
            console.error('Erro no authService.login:', error);
            throw error;
        }
    },

    register: async (name: string, email: string, password: string, role: string) => {
        const response = await api.post<AuthResponse>('/auth/registrar', { 
            nome: name, 
            email, 
            senha: password, 
            papel: role 
        });
        return response.data;
    },

    refreshToken: async (refreshToken: string) => {
        const response = await api.post<AuthResponse>('/auth/atualizar-token', refreshToken);
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    }
}; 