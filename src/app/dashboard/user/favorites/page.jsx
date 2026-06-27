import FavoritesTable from "@/component/Item/FavoritesTable";
import { getUserFavoriteRecipe } from "@/lib/actions/recipe";
import { getUserSession } from "@/lib/Reuseable/session";

export default async function FavoritesPage() {
  const user = await getUserSession();

  const favorites = await getUserFavoriteRecipe(user?.id);

  return (
    <div className="min-h-screen bg-background text-foreground  dark:bg-zinc-900  sm:p-6 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="inline-flex bg-success-100 dark:bg-success/20 text-success px-4 py-2 rounded-full text-sm font-medium rounded-full">
            Favorite Recipes
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
            My Favorites
          </h1>

          <p className="text-default-500 mt-2">
            Manage all recipes you have saved.
          </p>
        </div>

        <div className="bg-content1 border border-default-200 rounded-3xl shadow-sm overflow-hidden">
          <FavoritesTable favorites={favorites} />
        </div>
      </div>
    </div>
  );
}