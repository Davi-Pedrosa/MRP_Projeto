# Documentação do Frontend - Sistema de Gestão de Manutenção

## Estrutura de Rotas e Páginas

### Rotas de Autenticação
- `/login` - Página de login com três tipos de acesso:
  - Admin: admin@email.com
  - Funcionário: funcionario@email.com
  - Manutenção: manutencao@email.com

### Rotas do Administrador
- `/admin-home` - Dashboard principal do administrador
- `/admin/teams` - Gerenciamento de equipes
- `/admin/financial` - Gestão financeira
- `/admin/maintenance-team` - Configuração da equipe de manutenção

### Rotas do Funcionário
- `/employee-home` - Dashboard do funcionário
- `/employee/quality` - Controle de qualidade
- `/employee/maintenance-request` - Solicitação de manutenção

### Rotas da Manutenção
- `/maintenance-home` - Dashboard da equipe de manutenção
- `/maintenance-requests` - Gestão de pedidos de manutenção

## Funcionalidades por Perfil

### Administrador
- Acesso completo ao sistema
- Gerenciamento de equipes
- Configuração de equipes de manutenção
- Gestão financeira
- Visualização de todas as solicitações

### Funcionário
- Visualização do dashboard de produção
- Solicitação de manutenção
- Acesso ao controle de qualidade
- Sem acesso às configurações do sistema

### Equipe de Manutenção
- Visualização de pedidos de manutenção
- Atualização de status dos pedidos
- Agendamento de manutenções
- Adição de notas e observações

## Componentes Principais

### AuthContext
- Gerenciamento de autenticação
- Controle de perfis de usuário
- Redirecionamento baseado em perfil

### MaintenanceHome
- Dashboard específico para equipe de manutenção
- Exibição de estatísticas
- Lista de pedidos recentes
- Indicadores de performance

### MaintenanceRequests
- Listagem completa de pedidos
- Filtros por status, prioridade e departamento
- Detalhes completos dos pedidos
- Funcionalidade de atualização de status

## Estados e Fluxos

### Pedidos de Manutenção
Estados possíveis:
- Pendente
- Em Andamento
- Concluído

Prioridades:
- Alta
- Média
- Baixa

### Fluxo de Solicitação
1. Funcionário cria solicitação
2. Equipe de manutenção recebe notificação
3. Manutenção agenda o serviço
4. Atualização de status e notas
5. Conclusão do pedido

## Interface do Usuário

### Temas e Cores
- Cor principal: #1DB954 (Verde)
- Estados:
  - Pendente: #ff9800 (Laranja)
  - Em Andamento: #2196f3 (Azul)
  - Concluído: #4caf50 (Verde)

### Componentes MUI
- Material-UI como biblioteca principal
- Componentes personalizados para cada seção
- Layout responsivo para todas as telas

## Detalhes de Implementação

### Estrutura de Arquivos
```
src/
  ├── components/           # Componentes reutilizáveis
  │   ├── Layout/          # Layouts específicos por perfil
  │   ├── Forms/           # Formulários reutilizáveis
  │   └── UI/              # Componentes de interface
  ├── contexts/            # Contextos React
  │   └── AuthContext.tsx  # Contexto de autenticação
  ├── pages/               # Páginas da aplicação
  │   ├── Admin/          # Páginas administrativas
  │   ├── Employee/       # Páginas do funcionário
  │   └── Maintenance/    # Páginas da manutenção
  ├── services/           # Serviços e APIs
  ├── utils/              # Funções utilitárias
  └── styles/             # Estilos globais
```

### Bibliotecas Principais
- React 18
- Material-UI v5
- React Router v6
- Date-fns para manipulação de datas
- Axios para requisições HTTP

### Padrões de Código
- TypeScript para tipagem estática
- ESLint para padronização de código
- Prettier para formatação
- Componentes funcionais com hooks

### Responsividade
- Breakpoints padrão do Material-UI
- Layout flexível para diferentes tamanhos de tela
- Grid system para organização de conteúdo

### Segurança
- Validação de rotas por perfil
- Tokens JWT armazenados em localStorage
- Interceptors para requisições autenticadas
- Proteção contra XSS

### Performance
- Lazy loading de componentes
- Memoização de componentes pesados
- Otimização de re-renders
- Caching de dados frequentes

## Fluxos de Navegação

### Login e Autenticação
1. Usuário acessa `/login`
2. Insere credenciais
3. Sistema valida perfil
4. Redireciona para dashboard específico

### Solicitação de Manutenção
1. Funcionário acessa `/employee/maintenance-request`
2. Preenche formulário com detalhes
3. Sistema registra solicitação
4. Notifica equipe de manutenção

### Gestão de Manutenção
1. Equipe acessa `/maintenance-requests`
2. Visualiza lista de pedidos
3. Filtra por status/prioridade
4. Atualiza status e adiciona notas

## Melhorias Futuras

### Planejadas
1. Implementação de PWA
2. Notificações push
3. Modo offline
4. Relatórios exportáveis
5. Dashboard customizável

### Em Consideração
1. Chat integrado
2. Scanner de QR Code
3. Integração com calendário
4. App mobile nativo 