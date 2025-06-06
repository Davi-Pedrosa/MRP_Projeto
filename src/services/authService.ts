import api from './api';

interface JwtPayload {
    sub: string;
    nome: string;
    email: string;
    papel: string;
    exp: number;
}

export interface AuthResponse {
    token: string;
}

// Função para decodificar token JWT
function decodeJwt(token: string): JwtPayload {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) {
            throw new Error('Token inválido: formato incorreto');
        }

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const payload = JSON.parse(jsonPayload);

        // Validar se todos os campos necessários estão presentes
        if (!payload.sub || !payload.nome || !payload.email || !payload.papel) {
            throw new Error('Token inválido: informações incompletas');
        }

        return payload;
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        throw new Error('Erro ao processar resposta do servidor');
    }
}

export const authService = {
    login: async (email: string, password: string) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', { 
                email, 
                senha: password 
            });
            
            if (!response.data.token) {
                throw new Error('Resposta inválida do servidor: token não encontrado');
            }
            
            // Decodifica o token JWT para obter as informações do usuário
            const decodedToken = decodeJwt(response.data.token);
            
            // Cria o objeto do usuário a partir do token decodificado
            const user = {
                id: decodedToken.sub,
                nome: decodedToken.nome,
                email: decodedToken.email,
                papel: decodedToken.papel
            };
            
            // Salva as informações
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            
            console.log('Usuário autenticado:', user); // Log para debug
            
            return user;
        } catch (error: any) {
            console.error('Erro detalhado no login:', error);
            if (error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
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

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}; 