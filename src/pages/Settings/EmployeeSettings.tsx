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
    Alert,
} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import SaveIcon from '@mui/icons-material/Save';

interface Settings {
    system: {
        autoBackup: boolean;
        backupInterval: number;
    };
}

export default function EmployeeSettings() {
    const [settings, setSettings] = useState<Settings>({
        system: {
            autoBackup: true,
            backupInterval: 24,
        },
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

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

            <Grid container spacing={3} justifyContent="center">
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