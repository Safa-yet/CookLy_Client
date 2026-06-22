import AddRecipeForm from '@/component/Item/AddRecipeForm';
import { getUserSession } from '@/lib/Reuseable/session';
import React from 'react';

const AddRecipePage = async () => {
          const user = await getUserSession();

    return (
        <div>
            <AddRecipeForm user={user}></AddRecipeForm>
        </div>
    );
};

export default AddRecipePage;