import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface ForecastData {
    month: string;
    actual: number;
    forecast: number;
    accuracy: number;
}

const mockData: ForecastData[] = [
    { month: 'Jan', actual: 120, forecast: 115, accuracy: 95.8 },
    { month: 'Fev', actual: 135, forecast: 130, accuracy: 96.3 },
    { month: 'Mar', actual: 150, forecast: 145, accuracy: 96.7 },
    { month: 'Abr', actual: 140, forecast: 142, accuracy: 98.6 },
    { month: 'Mai', actual: 160, forecast: 155, accuracy: 96.9 },
    { month: 'Jun', actual: 175, forecast: 170, accuracy: 97.1 },
];

const metrics = [
    { label: 'Precisão Média', value: '96.9%', color: '#1DB954' },
    { label: 'Erro Médio', value: '3.1%', color: '#ff4444' },
    { label: 'Tendência', value: '+15%', color: '#1DB954' },
];

const DemandForecast: React.FC = () => {
    return (
        <Box sx={{ 
            minWidth: '800px',
            maxWidth: '1024px',
            margin: '0 auto'
        }}>
            <Grid container spacing={3}>
                {/* Métricas */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {metrics.map((metric, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{ backgroundColor: '#f8f9fa' }}>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {metric.label}
                                        </Typography>
                                        <Typography 
                                            variant="h4" 
                                            sx={{ 
                                                color: metric.color,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {metric.value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Gráfico */}
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                            Previsão de Demanda vs. Real
                        </Typography>
                        <Box sx={{ height: 350 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={mockData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="actual"
                                        stroke="#1DB954"
                                        name="Demanda Real"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="forecast"
                                        stroke="#666"
                                        name="Previsão"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Tabela de Dados */}
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                            Detalhamento Mensal
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Mês</TableCell>
                                        <TableCell align="right">Demanda Real</TableCell>
                                        <TableCell align="right">Previsão</TableCell>
                                        <TableCell align="right">Precisão (%)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mockData.map((row) => (
                                        <TableRow key={row.month}>
                                            <TableCell component="th" scope="row">
                                                {row.month}
                                            </TableCell>
                                            <TableCell align="right">{row.actual}</TableCell>
                                            <TableCell align="right">{row.forecast}</TableCell>
                                            <TableCell 
                                                align="right"
                                                sx={{ 
                                                    color: row.accuracy >= 95 ? '#1DB954' : '#ff4444',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {row.accuracy}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DemandForecast; 