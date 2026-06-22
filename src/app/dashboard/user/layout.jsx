// import { requirRole } from '@/lib/ReuseableFunc/session';
import { requirRole } from '@/lib/Reuseable/session';
import React from 'react';

const RecruiterLayout =async ({children}) => {
     await requirRole('user');

    return (
       children
    );
};

export default RecruiterLayout;