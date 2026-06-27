import { Spinner } from '@heroui/react';
import React from 'react';

const Loading = () => {
    return (
             <div className="flex flex-col justify-center items-center gap-2 min-h-screen">
        <Spinner color="success" size="xl"/>
        
      </div>
 
    );
};

export default Loading;