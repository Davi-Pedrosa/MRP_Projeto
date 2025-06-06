import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminSettings from './AdminSettings';
import EmployeeSettings from './EmployeeSettings';

const Settings = () => {
    const { isAdmin } = useAuth();

    return isAdmin() ? <AdminSettings /> : <EmployeeSettings />;
};

export default Settings; 