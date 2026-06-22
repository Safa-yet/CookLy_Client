"use server";

import { ServerFetch, ServerPost } from "../Shared/Server";


export const getRecipeDetails = async (id) => {
  return await ServerFetch(`/api/recipes/${id}`);
};

export const addFavorite = async (data) => {
  return await ServerPost(
    data,
    "/api/favorites"
  );
};

export const addReport = async (data) => {
  return await ServerPost(
    data,
    "/api/reports"
  );
};

export const likeRecipe = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/like/${id}`,
    {
      method: "PATCH",
    }
  );

  return res.json();
};