import { ServerPost } from "../Shared/Server";

export const responseReport = async (id) => {
  return await ServerPost({}, `/api/admin/reports/dismiss/${id}`, "PATCH");
};

export const removeReport = async (reportId,recipeId) => {
  return await ServerPost({}, `/api/admin/reports/remove-recipe/${reportId}/${recipeId}`, "DELETE");
};