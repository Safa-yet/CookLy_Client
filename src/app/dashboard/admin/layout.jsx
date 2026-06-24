
import { requirRole } from '@/lib/Reuseable/session';
import React from 'react';

const AdminDashboardLayout =async ({children}) => {
     await requirRole('admin');


    return (
        children
    );
};

export default AdminDashboardLayout;