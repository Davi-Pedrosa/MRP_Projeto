import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Popper,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FactoryIcon from '@mui/icons-material/Factory';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
    id: number;
    type: 'team' | 'order' | 'task';
    title: string;
    description: string;
    route: string;
}

// Mock data - substituir por dados reais posteriormente
const mockResults: SearchResult[] = [
    { id: 1, type: 'team', title: 'Equipe A', description: 'Produção', route: '/team/1' },
    { id: 2, type: 'order', title: 'Ordem #123', description: 'Em andamento', route: '/admin' },
    { id: 3, type: 'task', title: 'Montagem XYZ', description: 'Equipe A', route: '/team/1' },
];

export default function GlobalSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [results, setResults] = useState<SearchResult[]>([]);
    const navigate = useNavigate();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        setAnchorEl(event.currentTarget);

        if (value.length > 2) {
            // Filtrar resultados mock - substituir por chamada API real
            const filtered = mockResults.filter(result =>
                result.title.toLowerCase().includes(value.toLowerCase()) ||
                result.description.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    };

    const handleResultClick = (route: string) => {
        navigate(route);
        setSearchTerm('');
        setResults([]);
        setAnchorEl(null);
    };

    const handleClickAway = () => {
        setResults([]);
        setAnchorEl(null);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'team':
                return <GroupsIcon />;
            case 'order':
                return <FactoryIcon />;
            case 'task':
                return <AssignmentIcon />;
            default:
                return <SearchIcon />;
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
                <TextField
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar equipes, ordens ou tarefas..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#e0e0e0',
                            },
                            '&:hover fieldset': {
                                borderColor: '#1DB954',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1DB954',
                            },
                        },
                    }}
                />
                <Popper
                    open={results.length > 0}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    style={{ width: anchorEl?.clientWidth, zIndex: 1300 }}
                >
                    <Paper elevation={3}>
                        <List>
                            {results.map((result) => (
                                <ListItem
                                    key={`${result.type}-${result.id}`}
                                    button
                                    onClick={() => handleResultClick(result.route)}
                                >
                                    <ListItemIcon>
                                        {getIcon(result.type)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={result.title}
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                {result.description}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
} 