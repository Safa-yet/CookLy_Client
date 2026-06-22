// import Sidebar from '@/Components/Dashboard/SideBar';
// import SideBar from '@/Components/Common Sec/SideBar';
import SideBar from '@/component/common/SideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className=' min-h-screen max-w-7xl mx-auto lg:flex gap-10 py-6'>
            <SideBar></SideBar>

           <div className='flex-1'>

            {children}
           </div>
            
        </div>
    );
};

export default DashboardLayout;