"use server";

import { ServerFetch, ServerPost } from "../Shared/Server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getRecipeDetails = async (id) => {
  return await ServerFetch(`/api/recipes/${id}`);
};

export const addFavorite = async (data) => {
  return await ServerPost(
    data,
    "/api/recipe/favorites"
  );
};

export const addReport = async (data) => {
  return await ServerPost(
    data,
    "/api/recipe/reports"
  );
};

export const likeRecipe = async (id) => {
  const res = await fetch(
    `${baseUrl}/api/recipes/${id}`,
    {
      method: "PATCH",
    }
  );

  return res.json();
};



export const createRecipeTransaction = async(subInfo)=>{
    return ServerPost(subInfo,'/api/recipePayments');
}


// Update Recipe 



export const UpdateRecipe = async (formData,id) => {
  return await ServerPost(formData, `/api/recipes/${id}`, "PATCH");
};


export const deleteRecipe = async (id) => {
  return await ServerPost({}, `/api/recipes/${id}`, "DELETE");
}