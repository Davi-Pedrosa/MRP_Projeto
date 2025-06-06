import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    LinearProgress,
    Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';

interface QualityMetric {
    label: string;
    value: number;
    total: number;
    color: string;
}

interface QualityMetricsProps {
    metrics: {
        approved: number;
        rejected: number;
        pending: number;
        total: number;
        defectRate: number;
        qualityScore: number;
    };
}

export default function QualityMetrics({ metrics }: QualityMetricsProps) {
    const qualityMetrics: QualityMetric[] = [
        {
            label: 'Aprovados',
            value: metrics.approved,
            total: metrics.total,
            color: '#1DB954',
        },
        {
            label: 'Reprovados',
            value: metrics.rejected,
            total: metrics.total,
            color: '#ff3333',
        },
        {
            label: 'Pendentes',
            value: metrics.pending,
            total: metrics.total,
            color: '#ffa726',
        },
    ];

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1DB954' }}>
                Métricas de Qualidade
            </Typography>
            <Grid container spacing={2}>
                {qualityMetrics.map((metric) => (
                    <Grid item xs={12} sm={4} key={metric.label}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    {metric.label === 'Aprovados' && (
                                        <CheckCircleIcon sx={{ color: metric.color, mr: 1 }} />
                                    )}
                                    {metric.label === 'Reprovados' && (
                                        <ErrorIcon sx={{ color: metric.color, mr: 1 }} />
                                    )}
                                    {metric.label === 'Pendentes' && (
                                        <PendingIcon sx={{ color: metric.color, mr: 1 }} />
                                    )}
                                    <Typography variant="h6" component="div">
                                        {metric.label}
                                    </Typography>
                                </Box>
                                <Typography variant="h4" component="div" sx={{ color: metric.color }}>
                                    {metric.value}
                                </Typography>
                                <Tooltip title={`${((metric.value / metric.total) * 100).toFixed(1)}%`}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(metric.value / metric.total) * 100}
                                        sx={{
                                            mt: 1,
                                            height: 8,
                                            borderRadius: 5,
                                            backgroundColor: '#e0e0e0',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: metric.color,
                                                borderRadius: 5,
                                            },
                                        }}
                                    />
                                </Tooltip>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Indicadores Gerais
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography color="textSecondary" gutterBottom>
                                            Taxa de Defeitos
                                        </Typography>
                                        <Typography variant="h4" sx={{ color: metrics.defectRate > 5 ? '#ff3333' : '#1DB954' }}>
                                            {metrics.defectRate.toFixed(1)}%
                                        </Typography>
                                        <Tooltip title="Meta: < 5%">
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min((metrics.defectRate / 5) * 100, 100)}
                                                sx={{
                                                    mt: 1,
                                                    height: 8,
                                                    borderRadius: 5,
                                                    backgroundColor: '#e0e0e0',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: metrics.defectRate > 5 ? '#ff3333' : '#1DB954',
                                                        borderRadius: 5,
                                                    },
                                                }}
                                            />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box>
                                        <Typography color="textSecondary" gutterBottom>
                                            Índice de Qualidade
                                        </Typography>
                                        <Typography variant="h4" sx={{ color: metrics.qualityScore < 90 ? '#ff3333' : '#1DB954' }}>
                                            {metrics.qualityScore.toFixed(1)}%
                                        </Typography>
                                        <Tooltip title="Meta: > 90%">
                                            <LinearProgress
                                                variant="determinate"
                                                value={metrics.qualityScore}
                                                sx={{
                                                    mt: 1,
                                                    height: 8,
                                                    borderRadius: 5,
                                                    backgroundColor: '#e0e0e0',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: metrics.qualityScore < 90 ? '#ff3333' : '#1DB954',
                                                        borderRadius: 5,
                                                    },
                                                }}
                                            />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
} 