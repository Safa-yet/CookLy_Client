import { ServerFetch } from "../Shared/Server";

export const getAuthorRecipes = async(authorId) => {
  return ServerFetch(`/api/recipes?authorId=${authorId}`);
};
