// import FavoritesTable from "@/Components/Favorites/FavoritesTable";
// import { getUserSession } from "@/lib/ReuseableFunc/session";
// import { getFavoritesByUser } from "@/lib/Api/favorites";

import FavoritesTable from "@/component/Item/FavoritesTable";
import { getUserFavoriteRecipe } from "@/lib/actions/recipe";
import { getUserSession } from "@/lib/Reuseable/session";

export default async function FavoritesPage() {
  const user = await getUserSession();

  const favorites = await getUserFavoriteRecipe(user?.id);

  return (
    <div className="min-h-screen bg-[#F4F6F8] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="inline-flex bg-[#DFF8EC] text-[#00B96D] px-4 py-2 rounded-full text-sm font-medium">
            Favorite Recipes
          </span>

          <h1 className="text-4xl font-bold text-[#091E21] mt-4">
            My Favorites
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all recipes you have saved.
          </p>
        </div>

        <FavoritesTable favorites={favorites} />
      </div>
    </div>
  );
}
