import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Slider,
    Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

// Estrutura das equipes e suas responsabilidades
export const estruturaEquipes = {
    'Equipe Qualidade de Componentes': {
        nome: 'Equipe Qualidade de Componentes',
        etapas: [
            'Verificação de Peças do Estoque',
            'Teste de Funcionamento dos Componentes'
        ],
        descricao: 'Responsável pela verificação e teste de todos os componentes antes da montagem'
    },
    'Equipe Montagem A': {
        nome: 'Equipe Montagem A',
        etapas: [
            'Instalação da Placa Mãe',
            'Instalação do Processador',
            'Instalação da Memória RAM',
            'Instalação do Cooler',
            'Instalação das Placas Extras'
        ],
        descricao: 'Responsável pela montagem inicial e instalação dos componentes principais'
    },
    'Equipe Montagem B': {
        nome: 'Equipe Montagem B',
        etapas: [
            'Instalação da Fonte',
            'Instalação dos HDs/SSDs',
            'Organização dos Cabos',
            'Fechamento do Gabinete'
        ],
        descricao: 'Responsável pela instalação da fonte, armazenamento e organização dos cabos'
    },
    'Equipe Qualidade de Software': {
        nome: 'Equipe Qualidade de Software',
        etapas: [
            'Teste Inicial de POST',
            'Instalação do Sistema Operacional',
            'Instalação dos Drivers',
            'Testes de Funcionamento Final'
        ],
        descricao: 'Responsável pelos testes de funcionamento e instalação do software'
    },
    'Equipe Empacotamento': {
        nome: 'Equipe Empacotamento',
        etapas: [
            'Limpeza Final',
            'Verificação Visual',
            'Embalagem',
            'Etiquetagem'
        ],
        descricao: 'Responsável pelo processo final de embalagem e preparação para envio'
    }
};

// Lista de todas as etapas
const todasEtapas = Object.values(estruturaEquipes).flatMap(equipe => equipe.etapas);

// Lista de equipes
const equipes = Object.keys(estruturaEquipes);

interface GanttEntryFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (dadosTarefa: {
        nome: string;
        etapa: string;
        dataInicio: Date;
        dataFim: Date;
        recurso: string;
        progresso: number;
        observacoes: string;
    }) => void;
}

export default function FormularioGantt({ open, onClose, onSubmit }: GanttEntryFormProps) {
    const [nome, setNome] = useState('');
    const [etapa, setEtapa] = useState('');
    const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
    const [dataFim, setDataFim] = useState<Date | null>(new Date());
    const [recurso, setRecurso] = useState('');
    const [progresso, setProgresso] = useState(0);
    const [observacoes, setObservacoes] = useState('');

    // Atualiza o recurso (equipe) automaticamente com base na etapa selecionada
    const handleEtapaChange = (novaEtapa: string) => {
        setEtapa(novaEtapa);
        // Encontra a equipe responsável pela etapa
        const equipeResponsavel = Object.values(estruturaEquipes).find(
            equipe => equipe.etapas.includes(novaEtapa)
        );
        if (equipeResponsavel) {
            setRecurso(equipeResponsavel.nome);
        }
    };

    const handleSubmit = () => {
        if (nome && etapa && dataInicio && dataFim && recurso) {
            onSubmit({
                nome,
                etapa,
                dataInicio,
                dataFim,
                recurso,
                progresso,
                observacoes
            });
            // Limpa o formulário
            setNome('');
            setEtapa('');
            setDataInicio(new Date());
            setDataFim(new Date());
            setRecurso('');
            setProgresso(0);
            setObservacoes('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Nova Tarefa de Produção</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Nome da Tarefa"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                        placeholder="Ex: Montagem CPU Gaming #123"
                    />

                    <FormControl fullWidth>
                        <InputLabel>Etapa de Montagem</InputLabel>
                        <Select
                            value={etapa}
                            label="Etapa de Montagem"
                            onChange={(e) => handleEtapaChange(e.target.value)}
                        >
                            {todasEtapas.map((etapa) => (
                                <MenuItem key={etapa} value={etapa}>
                                    {etapa}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                        <DateTimePicker
                            label="Data e Hora de Início"
                            value={dataInicio}
                            onChange={(novoValor) => setDataInicio(novoValor)}
                            sx={{ width: '100%' }}
                        />
                        <DateTimePicker
                            label="Data e Hora de Finalização"
                            value={dataFim}
                            onChange={(novoValor) => setDataFim(novoValor)}
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>

                    <FormControl fullWidth>
                        <InputLabel>Equipe Responsável</InputLabel>
                        <Select
                            value={recurso}
                            label="Equipe Responsável"
                            onChange={(e) => setRecurso(e.target.value)}
                        >
                            {equipes.map((equipe) => (
                                <MenuItem 
                                    key={equipe} 
                                    value={equipe}
                                    disabled={!estruturaEquipes[equipe].etapas.includes(etapa)}
                                >
                                    {equipe}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box>
                        <Typography gutterBottom>Progresso (%)</Typography>
                        <Slider
                            value={progresso}
                            onChange={(_, novoValor) => setProgresso(novoValor as number)}
                            valueLabelDisplay="auto"
                            sx={{
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '#1DB954',
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: '#1DB954',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#ccc',
                                }
                            }}
                        />
                    </Box>

                    <TextField
                        label="Observações"
                        multiline
                        rows={4}
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        fullWidth
                        placeholder="Digite aqui observações adicionais sobre a tarefa..."
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ bgcolor: '#1DB954', '&:hover': { bgcolor: '#1ed760' } }}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
} 