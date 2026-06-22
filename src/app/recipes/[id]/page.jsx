import RecipeDetailsClient from "@/component/landingPage/RecipeDetailsClient";
import { getRecipeDetails } from "@/lib/actions/recipe";

export default async function RecipeDetailsPage({params}) {

    const {id} =await params;

    console.log(id);
  const recipe = await getRecipeDetails(id);

  return <RecipeDetailsClient recipe={recipe} />;
}
