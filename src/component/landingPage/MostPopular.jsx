import { ServerFetch } from "@/lib/Shared/Server";
import PopularRecipes from "../Item/PopularRecipes";


export default async function MostPopular() {

  const recipes =
    await ServerFetch("/api/popular-recipes");

  return (
    <PopularRecipes recipes={recipes} />
  );
}