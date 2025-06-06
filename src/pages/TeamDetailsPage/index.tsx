import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    IconButton,
    Typography,
    Breadcrumbs,
    Link,
    CircularProgress,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useProductiveCapacity } from '../../hooks/useProductiveCapacity';
import TeamDetails from '../../components/TeamDetails';

export default function TeamDetailsPage() {
    const { teamId } = useParams<{ teamId: string }>();
    const navigate = useNavigate();
    const { recursos, carregando, erro, formatarData } = useProductiveCapacity();

    const recurso = recursos.find(r => r.id === Number(teamId));

    if (carregando) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (erro) {
        return (
            <Box sx={{ m: 2 }}>
                <Alert severity="error">{erro}</Alert>
            </Box>
        );
    }

    if (!recurso) {
        return (
            <Box sx={{ m: 2 }}>
                <Alert severity="warning">Equipe não encontrada</Alert>
            </Box>
        );
    }

    return (
        <Box>
            {/* Barra superior com navegação */}
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs>
                    <Link
                        component="button"
                        variant="body1"
                        onClick={() => navigate('/')}
                        sx={{ cursor: 'pointer' }}
                    >
                        Dashboard
                    </Link>
                    <Link
                        component="button"
                        variant="body1"
                        onClick={() => navigate('/capacidade')}
                        sx={{ cursor: 'pointer' }}
                    >
                        Capacidade Produtiva
                    </Link>
                    <Typography color="text.primary">{recurso.nome}</Typography>
                </Breadcrumbs>
            </Box>

            {/* Conteúdo principal */}
            <TeamDetails recurso={recurso} formatarData={formatarData} />
        </Box>
    );
} 