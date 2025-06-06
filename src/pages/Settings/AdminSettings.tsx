import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Switch,
    Button,
    TextField,
    Divider,
    Alert,
} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import SaveIcon from '@mui/icons-material/Save';

interface Settings {
    production: {
        defaultShiftDuration: number;
        qualityThreshold: number;
        maintenanceInterval: number;
    };
    system: {
        autoBackup: boolean;
        backupInterval: number;
    };
}

export default function AdminSettings() {
    const [settings, setSettings] = useState<Settings>({
        production: {
            defaultShiftDuration: 8,
            qualityThreshold: 90,
            maintenanceInterval: 30,
        },
        system: {
            autoBackup: true,
            backupInterval: 24,
        },
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleProductionChange = (key: keyof Settings['production'], value: number) => {
        setSettings(prev => ({
            ...prev,
            production: {
                ...prev.production,
                [key]: value,
            },
        }));
    };

    const handleSystemChange = (key: keyof Settings['system'], value: any) => {
        setSettings(prev => ({
            ...prev,
            system: {
                ...prev.system,
                [key]: value,
            },
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simular salvamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaveSuccess(true);
        setIsSaving(false);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, backgroundColor: '#1DB954', color: 'white', mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Configurações do Sistema
                </Typography>
            </Paper>

            {saveSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Configurações salvas com sucesso!
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Parâmetros de Produção */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#1DB954' }}>
                            Parâmetros de Produção
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Duração Padrão do Turno (horas)"
                                    type="number"
                                    value={settings.production.defaultShiftDuration}
                                    onChange={(e) => handleProductionChange('defaultShiftDuration', Number(e.target.value))}
                                    InputProps={{ inputProps: { min: 1, max: 24 } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Limite de Qualidade (%)"
                                    type="number"
                                    value={settings.production.qualityThreshold}
                                    onChange={(e) => handleProductionChange('qualityThreshold', Number(e.target.value))}
                                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Intervalo de Manutenção (dias)"
                                    type="number"
                                    value={settings.production.maintenanceInterval}
                                    onChange={(e) => handleProductionChange('maintenanceInterval', Number(e.target.value))}
                                    InputProps={{ inputProps: { min: 1 } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Sistema */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#1DB954' }}>
                            Backup do Sistema
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <BackupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Backup Automático" secondary="Realizar backup automático dos dados" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        checked={settings.system.autoBackup}
                                        onChange={() => handleSystemChange('autoBackup', !settings.system.autoBackup)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            {settings.system.autoBackup && (
                                <ListItem>
                                    <TextField
                                        fullWidth
                                        label="Intervalo de Backup (horas)"
                                        type="number"
                                        value={settings.system.backupInterval}
                                        onChange={(e) => handleSystemChange('backupInterval', Number(e.target.value))}
                                        InputProps={{ inputProps: { min: 1 } }}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{
                        backgroundColor: '#1DB954',
                        '&:hover': {
                            backgroundColor: '#18a449',
                        },
                    }}
                >
                    {isSaving ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
            </Box>
        </Container>
    );
} 