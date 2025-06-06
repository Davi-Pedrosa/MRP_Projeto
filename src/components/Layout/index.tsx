import React from 'react';
import { Box } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';

/**
 * Interface que define as propriedades do componente Layout
 * @interface LayoutProps
 * @property {React.ReactNode} children - Elementos filhos que serão renderizados dentro do layout
 */
interface LayoutProps {
    children: React.ReactNode;
}

/**
 * Componente que define o layout padrão da aplicação
 * Inclui a barra de navegação superior com links para as principais seções
 * @component
 * @param {LayoutProps} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado dentro do layout
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
        }}>
            <Header />
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 3,
                    px: 2
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout; 