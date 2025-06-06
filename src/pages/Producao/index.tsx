import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ordemProducaoService, OrdemProducao } from '../../services/ordemProducaoService';
import './styles.css';

const Producao = () => {
    const { user } = useAuth();
    const [ordens, setOrdens] = useState<OrdemProducao[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Estado do formulário
    const [numeroPedido, setNumeroPedido] = useState('');
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [dataPrevisao, setDataPrevisao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('NORMAL');
    const [observacoes, setObservacoes] = useState('');
    const [custoEstimado, setCustoEstimado] = useState('');
    const [tempoEstimado, setTempoEstimado] = useState('');

    // Carregar ordens de produção
    const carregarOrdens = async () => {
        try {
            setLoading(true);
            const data = await ordemProducaoService.listar();
            setOrdens(data);
        } catch (error) {
            console.error('Erro ao carregar ordens:', error);
            setError('Erro ao carregar ordens de produção');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarOrdens();
    }, []);

    // Criar nova ordem
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            
            const novaOrdem: OrdemProducao = {
                numeroPedido,
                produto,
                quantidade: parseInt(quantidade),
                status: 'PENDENTE',
                dataPrevisao: new Date(dataPrevisao).toISOString(),
                descricao,
                prioridade,
                observacoes,
                custoEstimado: parseFloat(custoEstimado),
                tempoEstimado: parseInt(tempoEstimado)
            };

            await ordemProducaoService.criar(novaOrdem);
            
            // Limpar formulário
            setNumeroPedido('');
            setProduto('');
            setQuantidade('');
            setDataPrevisao('');
            setDescricao('');
            setPrioridade('NORMAL');
            setObservacoes('');
            setCustoEstimado('');
            setTempoEstimado('');
            
            // Recarregar lista
            await carregarOrdens();
            
        } catch (error) {
            console.error('Erro ao criar ordem:', error);
            setError('Erro ao criar ordem de produção');
        } finally {
            setLoading(false);
        }
    };

    // Atualizar status
    const handleStatusUpdate = async (id: number, novoStatus: OrdemProducao['status']) => {
        try {
            setLoading(true);
            await ordemProducaoService.atualizarStatus(id, novoStatus);
            await carregarOrdens();
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            setError('Erro ao atualizar status da ordem');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="producao-container">
            <h2>Painel de Produção</h2>
            
            {/* Formulário de Nova Ordem */}
            <div className="form-section">
                <h3>Nova Ordem de Produção</h3>
                <form onSubmit={handleSubmit} className="ordem-form">
                    <div className="form-group">
                        <label htmlFor="numeroPedido">Número do Pedido:</label>
                        <input
                            type="text"
                            id="numeroPedido"
                            value={numeroPedido}
                            onChange={(e) => setNumeroPedido(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="produto">Produto:</label>
                        <input
                            type="text"
                            id="produto"
                            value={produto}
                            onChange={(e) => setProduto(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input
                            type="number"
                            id="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dataPrevisao">Data de Previsão:</label>
                        <input
                            type="datetime-local"
                            id="dataPrevisao"
                            value={dataPrevisao}
                            onChange={(e) => setDataPrevisao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prioridade">Prioridade:</label>
                        <select
                            id="prioridade"
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value)}
                            required
                        >
                            <option value="BAIXA">Baixa</option>
                            <option value="NORMAL">Normal</option>
                            <option value="ALTA">Alta</option>
                            <option value="URGENTE">Urgente</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="observacoes">Observações:</label>
                        <textarea
                            id="observacoes"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="custoEstimado">Custo Estimado (R$):</label>
                        <input
                            type="number"
                            step="0.01"
                            id="custoEstimado"
                            value={custoEstimado}
                            onChange={(e) => setCustoEstimado(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tempoEstimado">Tempo Estimado (horas):</label>
                        <input
                            type="number"
                            id="tempoEstimado"
                            value={tempoEstimado}
                            onChange={(e) => setTempoEstimado(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Criando...' : 'Criar Ordem'}
                    </button>
                </form>
            </div>

            {/* Lista de Ordens */}
            <div className="orders-section">
                <h3>Ordens de Produção</h3>
                {error && <p className="error-message">{error}</p>}
                
                <div className="orders-list">
                    {ordens.map(ordem => (
                        <div key={ordem.id} className={`order-card status-${ordem.status.toLowerCase()}`}>
                            <div className="order-header">
                                <h4>Pedido #{ordem.numeroPedido}</h4>
                                <span className={`status-badge ${ordem.status.toLowerCase()}`}>
                                    {ordem.status}
                                </span>
                            </div>
                            
                            <div className="order-details">
                                <p><strong>Produto:</strong> {ordem.produto}</p>
                                <p><strong>Quantidade:</strong> {ordem.quantidade}</p>
                                <p><strong>Previsão:</strong> {new Date(ordem.dataPrevisao).toLocaleString()}</p>
                                <p><strong>Prioridade:</strong> {ordem.prioridade}</p>
                                <p><strong>Descrição:</strong> {ordem.descricao}</p>
                                <p><strong>Custo Estimado:</strong> R$ {ordem.custoEstimado?.toFixed(2)}</p>
                                <p><strong>Tempo Estimado:</strong> {ordem.tempoEstimado}h</p>
                                <p><strong>Criado por:</strong> {ordem.usuarioNome}</p>
                                {ordem.observacoes && (
                                    <p><strong>Observações:</strong> {ordem.observacoes}</p>
                                )}
                            </div>

                            <div className="order-actions">
                                {ordem.status === 'PENDENTE' && (
                                    <button 
                                        onClick={() => handleStatusUpdate(ordem.id!, 'EM_PRODUCAO')}
                                        className="btn-iniciar"
                                    >
                                        Iniciar Produção
                                    </button>
                                )}
                                
                                {ordem.status === 'EM_PRODUCAO' && (
                                    <button 
                                        onClick={() => handleStatusUpdate(ordem.id!, 'CONCLUIDA')}
                                        className="btn-concluir"
                                    >
                                        Concluir
                                    </button>
                                )}
                                
                                {(ordem.status === 'PENDENTE' || ordem.status === 'EM_PRODUCAO') && (
                                    <button 
                                        onClick={() => handleStatusUpdate(ordem.id!, 'CANCELADA')}
                                        className="btn-cancelar"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Producao; 