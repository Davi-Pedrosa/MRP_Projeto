import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Snackbar,
    Alert,
    MenuItem,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Equipe, MembroEquipe } from '../../types/Team';
import { equipeService, membroEquipeService } from '../../services/api';
import { TeamTypes } from '../../config/teams';
import StatusTable from '../../components/TeamStatusTable';

interface TeamFormData {
    nome: string;
    descricao: string;
    tipo: string;
    lider: string;
}

interface MemberFormData {
    nome: string;
    funcao: string;
    skills: string;
}

const GerenciamentoEquipes: React.FC = () => {
    const [equipes, setEquipes] = useState<Equipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogoAberto, setDialogoAberto] = useState(false);
    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const [selectedEquipe, setSelectedEquipe] = useState<Equipe | null>(null);
    const [teamForm, setTeamForm] = useState<TeamFormData>({
        nome: '',
        descricao: '',
        tipo: TeamTypes.PRODUCTION,
        lider: ''
    });
    const [memberForm, setMemberForm] = useState<MemberFormData>({
        nome: '',
        funcao: '',
        skills: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    useEffect(() => {
        carregarEquipes();
    }, []);

    const carregarEquipes = async () => {
        try {
            setLoading(true);
            const response = await equipeService.getAll();
            setEquipes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erro ao carregar equipes:', error);
            setSnackbar({
                open: true,
                message: 'Erro ao carregar equipes',
                severity: 'error'
            });
            setEquipes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAbrirDialogo = () => {
        setSelectedEquipe(null);
        setTeamForm({
            nome: '',
            descricao: '',
            tipo: TeamTypes.PRODUCTION,
            lider: ''
        });
        setDialogoAberto(true);
    };

    const handleFecharDialogo = () => {
        setDialogoAberto(false);
        setTeamForm({
            nome: '',
            descricao: '',
            tipo: TeamTypes.PRODUCTION,
            lider: ''
        });
    };

    const handleCriarEquipe = async () => {
        try {
            const teamData = {
                ...teamForm,
                dailyCapacity: 8,
                inUse: 0,
                cpusInProcessing: 0,
                timePerUnit: 60,
                currentTask: '',
                progress: 0,
                status: 'NORMAL',
                trend: 'STABLE',
                membros: selectedEquipe?.membros || [],
                tools: [],
                procedures: []
            };

            if (selectedEquipe) {
                await equipeService.update(selectedEquipe.id, teamData);
                setSnackbar({
                    open: true,
                    message: 'Equipe atualizada com sucesso',
                    severity: 'success'
                });
            } else {
                await equipeService.create(teamData);
                setSnackbar({
                    open: true,
                    message: 'Equipe criada com sucesso',
                    severity: 'success'
                });
            }

            handleFecharDialogo();
            carregarEquipes();
        } catch (error) {
            console.error('Erro detalhado ao salvar equipe:', error);
            setSnackbar({
                open: true,
                message: 'Erro ao salvar equipe: ' + (error.response?.data?.message || error.message),
                severity: 'error'
            });
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTeamForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditEquipe = (equipe: Equipe) => {
        setSelectedEquipe(equipe);
        setTeamForm({
            nome: equipe.nome,
            descricao: equipe.descricao || '',
            tipo: equipe.tipo,
            lider: equipe.lider || ''
        });
        setDialogoAberto(true);
    };

    const handleDeleteEquipe = async (equipeId: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta equipe?')) {
            try {
                await equipeService.delete(equipeId);
                setSnackbar({
                    open: true,
                    message: 'Equipe excluída com sucesso',
                    severity: 'success'
                });
                carregarEquipes();
            } catch (error) {
                console.error('Erro ao excluir equipe:', error);
                setSnackbar({
                    open: true,
                    message: 'Erro ao excluir equipe',
                    severity: 'error'
                });
            }
        }
    };

    const handleAddMember = async () => {
        if (!selectedEquipe) return;

        try {
            const memberData = {
                ...memberForm,
                skills: memberForm.skills.split(',').map(s => s.trim()),
                disponivel: true,
                ultimaAtividade: 'Disponível'
            };

            await equipeService.addMembro(selectedEquipe.id, memberData);
            setSnackbar({
                open: true,
                message: 'Membro adicionado com sucesso',
                severity: 'success'
            });
            setOpenMemberDialog(false);
            setMemberForm({
                nome: '',
                funcao: '',
                skills: ''
            });
            carregarEquipes();
        } catch (error) {
            console.error('Erro ao adicionar membro:', error);
            setSnackbar({
                open: true,
                message: 'Erro ao adicionar membro',
                severity: 'error'
            });
        }
    };

    const handleRemoveMember = async (equipeId: number, memberId: number) => {
        if (window.confirm('Tem certeza que deseja remover este membro?')) {
            try {
                await equipeService.removeMembro(equipeId, memberId);
                setSnackbar({
                    open: true,
                    message: 'Membro removido com sucesso',
                    severity: 'success'
                });
                carregarEquipes();
            } catch (error) {
                console.error('Erro ao remover membro:', error);
                setSnackbar({
                    open: true,
                    message: 'Erro ao remover membro',
                    severity: 'error'
                });
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Gerenciamento de Equipes
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAbrirDialogo}
                    sx={{ backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#18a449' } }}
                >
                    Nova Equipe
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
            <Grid container spacing={3}>
                    {Array.isArray(equipes) && equipes.length > 0 ? (
                        equipes.map((equipe) => (
                    <Grid item xs={12} md={6} key={equipe.id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <Box>
                                    <Typography variant="h6" gutterBottom>
                                            {equipe.nome}
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {equipe.tipo === TeamTypes.PRODUCTION ? 'Produção' :
                                             equipe.tipo === TeamTypes.MAINTENANCE ? 'Manutenção' :
                                             equipe.tipo === TeamTypes.QUALITY ? 'Qualidade' :
                                             equipe.tipo === TeamTypes.PACKAGING ? 'Empacotamento' : equipe.tipo}
                                    </Typography>
                                    </Box>
                                    <Box>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleEditEquipe(equipe)}
                                            sx={{ color: '#1DB954' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            size="small" 
                                            color="error"
                                            onClick={() => handleDeleteEquipe(equipe.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography color="textSecondary" paragraph sx={{ mt: 2 }}>
                                    {equipe.descricao}
                                </Typography>

                                <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                                    Membros da Equipe
                                </Typography>
                                <List>
                                            {Array.isArray(equipe.membros) && equipe.membros.map((member) => (
                                        <ListItem key={member.id}>
                                            <ListItemText
                                                primary={member.nome}
                                                secondary={member.funcao}
                                            />
                                            <ListItemSecondaryAction>
                                                <Chip
                                                    size="small"
                                                    label={member.disponivel ? 'Disponível' : 'Ocupado'}
                                                    color={member.disponivel ? 'success' : 'default'}
                                                    sx={{ mr: 1 }}
                                                />
                                                <IconButton
                                                    edge="end"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleRemoveMember(equipe.id, member.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<PersonAddIcon />}
                                    onClick={() => {
                                        setSelectedEquipe(equipe);
                                        setOpenMemberDialog(true);
                                    }}
                                    size="small"
                                    sx={{ color: '#1DB954' }}
                                >
                                    Adicionar Membro
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography variant="h6" color="textSecondary">
                                    Nenhuma equipe encontrada
                                </Typography>
                            </Box>
                        </Grid>
                    )}
            </Grid>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert 
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Dialog open={dialogoAberto} onClose={handleFecharDialogo} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedEquipe ? 'Editar Equipe' : 'Nova Equipe'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome da Equipe"
                            name="nome"
                            value={teamForm.nome}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Descrição"
                            name="descricao"
                            multiline
                            rows={4}
                            value={teamForm.descricao}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            select
                            label="Tipo"
                            name="tipo"
                            value={teamForm.tipo}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        >
                            {Object.entries(TeamTypes).map(([key, value]) => (
                                <MenuItem key={key} value={value}>
                                    {key === 'PRODUCTION' ? 'Produção' :
                                     key === 'MAINTENANCE' ? 'Manutenção' :
                                     key === 'QUALITY' ? 'Qualidade' :
                                     key === 'PACKAGING' ? 'Empacotamento' : key}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Líder da Equipe"
                            name="lider"
                            value={teamForm.lider}
                            onChange={handleInputChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFecharDialogo}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={handleCriarEquipe}
                        sx={{ backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#18a449' } }}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openMemberDialog} onClose={() => setOpenMemberDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Adicionar Membro à Equipe
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome do Funcionário"
                            name="nome"
                            value={memberForm.nome}
                            onChange={(e) => setMemberForm({ ...memberForm, nome: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Função"
                            name="funcao"
                            value={memberForm.funcao}
                            onChange={(e) => setMemberForm({ ...memberForm, funcao: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Habilidades"
                            name="skills"
                            value={memberForm.skills}
                            onChange={(e) => setMemberForm({ ...memberForm, skills: e.target.value })}
                            helperText="Separe as habilidades por vírgula"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenMemberDialog(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={handleAddMember}
                        sx={{ backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#18a449' } }}
                    >
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default GerenciamentoEquipes; 