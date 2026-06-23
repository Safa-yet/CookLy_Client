import RecipeDetailsClient from "@/component/landingPage/RecipeDetailsClient";
import { getRecipeDetails } from "@/lib/actions/recipe";
import { getUserSession } from "@/lib/Reuseable/session";

export default async function RecipeDetailsPage({params}) {

  const user = await getUserSession();

    const {id} =await params;

  const recipe = await getRecipeDetails(id);

  return <RecipeDetailsClient recipe={recipe} user={user} id={id}/>;
}
