
import { ServerPost } from "../Shared/Server";

export const createRecipe =async (formData)=>{

    return ServerPost(formData,'/api/recipes');

}