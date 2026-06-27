import { ServerFetch } from "@/lib/Shared/Server";
import FeaturedRecipes from "../Item/FeaturedRecipes";



export default async function FeaturedSec() {

    const recipes =
      await ServerFetch("/api/featured-recipes");

    return (
        <>
            <FeaturedRecipes
                recipes={recipes}
            />
        </>
    );
}