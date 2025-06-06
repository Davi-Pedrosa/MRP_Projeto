import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Event as EventIcon,
} from '@mui/icons-material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProductionEvent {
    date: Date;
    title: string;
    type: 'normal' | 'urgent' | 'maintenance';
}

const mockEvents: ProductionEvent[] = [
    {
        date: new Date(2024, 2, 15),
        title: 'Produção Lote #123',
        type: 'normal',
    },
    {
        date: new Date(2024, 2, 20),
        title: 'Manutenção Preventiva',
        type: 'maintenance',
    },
    {
        date: new Date(2024, 2, 25),
        title: 'Produção Urgente Lote #124',
        type: 'urgent',
    },
];

const ProductionCalendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handlePreviousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getEventsForDay = (date: Date) => {
        return mockEvents.filter(event => 
            event.date.getDate() === date.getDate() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getFullYear() === date.getFullYear()
        );
    };

    const getEventColor = (type: ProductionEvent['type']) => {
        switch (type) {
            case 'urgent':
                return '#ff4444';
            case 'maintenance':
                return '#ffbb33';
            default:
                return '#1DB954';
        }
    };

    return (
        <Paper 
            elevation={0} 
            sx={{ 
                p: 2, 
                backgroundColor: '#f8f9fa',
                minWidth: '800px',
                maxWidth: '1024px',
                margin: '0 auto'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                <IconButton onClick={handlePreviousMonth}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#1DB954', fontWeight: 'bold' }}>
                    {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                </Typography>
                <IconButton onClick={handleNextMonth}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                                <TableCell
                                    key={day}
                                    align="center"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#666',
                                    }}
                                >
                                    {day}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: Math.ceil(daysInMonth.length / 7) }).map((_, weekIndex) => (
                            <TableRow key={weekIndex}>
                                {daysInMonth.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                                    const events = getEventsForDay(day);
                                    return (
                                        <TableCell
                                            key={dayIndex}
                                            align="center"
                                            sx={{
                                                height: '100px',
                                                backgroundColor: isSameMonth(day, currentMonth) ? 'white' : '#f8f9fa',
                                                position: 'relative',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: isSameMonth(day, currentMonth) ? '#333' : '#999',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {format(day, 'd')}
                                            </Typography>
                                            {events.map((event, index) => (
                                                <Tooltip key={index} title={event.title}>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: getEventColor(event.type),
                                                            color: 'white',
                                                            p: 0.5,
                                                            borderRadius: 1,
                                                            fontSize: '0.75rem',
                                                            mb: 0.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 0.5,
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <EventIcon fontSize="small" />
                                                        <Typography noWrap variant="caption">
                                                            {event.title}
                                                        </Typography>
                                                    </Box>
                                                </Tooltip>
                                            ))}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ProductionCalendar; 