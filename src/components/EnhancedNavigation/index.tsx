import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    useTheme,
    useMediaQuery,
    Container,
    Menu,
    MenuItem,
    Avatar,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FactoryIcon from '@mui/icons-material/Factory';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VerifiedIcon from '@mui/icons-material/Verified';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function EnhancedNavigation() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuAnchors, setMenuAnchors] = useState<{ [key: string]: HTMLElement | null }>({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdmin, logout } = useAuth();

    const isLoginPage = location.pathname === '/login';

    if (isLoginPage) {
        return null;
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, menuId: string) => {
        setMenuAnchors(prev => ({ ...prev, [menuId]: event.currentTarget }));
    };

    const handleMenuClose = (menuId: string) => {
        setMenuAnchors(prev => ({ ...prev, [menuId]: null }));
    };

    const handleLogout = () => {
        handleCloseMenu();
        logout();
        navigate('/login');
    };

    const adminMenuGroups = {
        production: {
            title: 'Produção',
            icon: <FactoryIcon />,
            items: [
                { text: 'Produção', icon: <FactoryIcon />, path: '/admin' },
                { text: 'Planejamento', icon: <EventNoteIcon />, path: '/planning' },
                { text: 'Equipes', icon: <GroupsIcon />, path: '/teams-management' },
            ]
        },
        quality: {
            title: 'Qualidade e Estoque',
            icon: <VerifiedIcon />,
            items: [
                { text: 'Qualidade', icon: <VerifiedIcon />, path: '/quality-admin' },
                { text: 'Estoque', icon: <InventoryIcon />, path: '/inventory' },
            ]
        },
        management: {
            title: 'Gestão',
            icon: <AttachMoneyIcon />,
            items: [
                { text: 'Financeiro', icon: <AttachMoneyIcon />, path: '/financial' },
                { text: 'Manutenção', icon: <BuildIcon />, path: '/maintenance' },
                { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' },
            ]
        }
    };

    const employeeMenuItems = [
        { text: 'Área do Funcionário', icon: <PersonIcon />, path: '/employee' },
        { text: 'Registro de Qualidade', icon: <VerifiedIcon />, path: '/quality-register' },
        { text: 'Manutenção', icon: <BuildIcon />, path: '/maintenance' },
        { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) {
            handleDrawerToggle();
        }
        // Fechar todos os menus dropdown
        Object.keys(adminMenuGroups).forEach(menuId => {
            handleMenuClose(menuId);
        });
    };

    const handleLogoClick = () => {
        navigate(isAdmin() ? '/admin-home' : '/employee-home');
    };

    const drawer = (
        <Box sx={{ width: 250 }}>
            <List>
                <ListItem
                    button
                    onClick={() => handleNavigation(isAdmin() ? '/admin-home' : '/employee-home')}
                    sx={{
                        backgroundColor: location.pathname === (isAdmin() ? '/admin-home' : '/employee-home') ? '#f5f5f5' : 'transparent',
                        '&:hover': { backgroundColor: '#e8f5e9' },
                    }}
                >
                    <ListItemIcon sx={{ color: location.pathname === (isAdmin() ? '/admin-home' : '/employee-home') ? '#1DB954' : 'inherit' }}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Home"
                        sx={{
                            color: location.pathname === (isAdmin() ? '/admin-home' : '/employee-home') ? '#1DB954' : 'inherit',
                            fontWeight: location.pathname === (isAdmin() ? '/admin-home' : '/employee-home') ? 'bold' : 'normal',
                        }}
                    />
                </ListItem>
                
                {isAdmin() ? (
                    Object.entries(adminMenuGroups).map(([key, group]) => (
                        <React.Fragment key={key}>
                            {group.items.map((item) => (
                                <ListItem
                                    button
                                    key={item.text}
                                    onClick={() => handleNavigation(item.path)}
                                    sx={{
                                        backgroundColor: location.pathname === item.path ? '#f5f5f5' : 'transparent',
                                        '&:hover': { backgroundColor: '#e8f5e9' },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: location.pathname === item.path ? '#1DB954' : 'inherit' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.text}
                                        sx={{
                                            color: location.pathname === item.path ? '#1DB954' : 'inherit',
                                            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </React.Fragment>
                    ))
                ) : (
                    employeeMenuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                backgroundColor: location.pathname === item.path ? '#f5f5f5' : 'transparent',
                                '&:hover': { backgroundColor: '#e8f5e9' },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? '#1DB954' : 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text}
                                sx={{
                                    color: location.pathname === item.path ? '#1DB954' : 'inherit',
                                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                }}
                            />
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar 
                position="fixed" 
                sx={{ 
                    backgroundColor: '#1DB954',
                    zIndex: (theme) => theme.zIndex.drawer + 1 
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ 
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                color: 'white',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleLogoClick}
                        >
                            MRP2 System
                        </Typography>

                        {!isLoginPage && (
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleDrawerToggle}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        )}

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                                fontWeight: 700,
                                color: 'white',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={handleLogoClick}
                        >
                            MRP2
                        </Typography>

                        {!isLoginPage && (
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }}>
                                <Button
                                    onClick={() => handleNavigation(isAdmin() ? '/admin-home' : '/employee-home')}
                                    sx={{
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        px: 2,
                                        backgroundColor: location.pathname === (isAdmin() ? '/admin-home' : '/employee-home') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        },
                                    }}
                                    startIcon={<HomeIcon />}
                                >
                                    Home
                                </Button>

                                {isAdmin() ? (
                                    Object.entries(adminMenuGroups).map(([key, group]) => (
                                        <React.Fragment key={key}>
                                            <Button
                                                onClick={(e) => handleMenuOpen(e, key)}
                                                sx={{
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    px: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    },
                                                }}
                                                endIcon={<KeyboardArrowDownIcon />}
                                                startIcon={group.icon}
                                            >
                                                {group.title}
                                            </Button>
                                            <Popper
                                                open={Boolean(menuAnchors[key])}
                                                anchorEl={menuAnchors[key]}
                                                transition
                                                placement="bottom-start"
                                            >
                                                {({ TransitionProps }) => (
                                                    <Grow {...TransitionProps}>
                                                        <Paper elevation={3}>
                                                            <ClickAwayListener onClickAway={() => handleMenuClose(key)}>
                                                                <MenuList>
                                                                    {group.items.map((item) => (
                                                                        <MenuItem
                                                                            key={item.text}
                                                                            onClick={() => handleNavigation(item.path)}
                                                                            selected={location.pathname === item.path}
                                                                            sx={{
                                                                                color: location.pathname === item.path ? '#1DB954' : 'inherit',
                                                                                '&:hover': {
                                                                                    backgroundColor: '#e8f5e9',
                                                                                },
                                                                            }}
                                                                        >
                                                                            <ListItemIcon sx={{ color: location.pathname === item.path ? '#1DB954' : 'inherit' }}>
                                                                                {item.icon}
                                                                            </ListItemIcon>
                                                                            <ListItemText>{item.text}</ListItemText>
                                                                        </MenuItem>
                                                                    ))}
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    employeeMenuItems.map((item) => (
                                        <Button
                                            key={item.text}
                                            onClick={() => handleNavigation(item.path)}
                                            sx={{
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                px: 2,
                                                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                },
                                            }}
                                            startIcon={item.icon}
                                        >
                                            {item.text}
                                        </Button>
                                    ))
                                )}
                            </Box>
                        )}

                        {/* Menu de Usuário */}
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton
                                onClick={handleMenu}
                                sx={{ 
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                                }}
                            >
                                <Avatar sx={{ bgcolor: 'white', color: '#1DB954' }}>
                                    {isAdmin() ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        '& .MuiMenuItem-root': {
                                            px: 2,
                                            py: 1,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Sair</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {!isLoginPage && (
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 250,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            )}

            <Box component="main" sx={{ pt: 8 }}>
                {/* O conteúdo da página será renderizado aqui */}
            </Box>
        </Box>
    );
} 