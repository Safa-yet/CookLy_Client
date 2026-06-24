import { ServerFetch } from "../Shared/Server";

export const getPurchasedRecipes = async (userId) => {
  return ServerFetch(`/api/recipePayments?userId=${userId}`);
};
