import { ServerFetch } from "../Shared/Server"


export const getAllRecipes = async () => {
    return ServerFetch('/api/recipes')
}