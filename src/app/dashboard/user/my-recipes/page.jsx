import Link from "next/link";
import { Button } from "@heroui/react";

import MyRecipesTable from "@/component/Item/MyRecipesTable";
import { getAuthorRecipes } from "@/lib/api/getAuthorRecipes";
import { getUserSession } from "@/lib/Reuseable/session";

export default async function MyRecipesPage() {
  const user = await getUserSession();

  const recipes = await getAuthorRecipes(user.id);

  const hasRecipes =
    Array.isArray(recipes) && recipes.length > 0;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-3xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <span className="inline-flex bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
              Recipe Dashboard
            </span>

            <h1 className="text-3xl font-bold mt-3">
              My Recipes
            </h1>

            <p className="text-default-500 mt-2">
              Manage all your recipes from one place.
            </p>
          </div>

          <Link href="/dashboard/user/add-recipe">
            <Button color="success">
              Add New Recipe
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      {hasRecipes ? (
        <MyRecipesTable recipes={recipes} />
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-3xl shadow-sm p-12 text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center text-5xl">
            🍳
          </div>

          <h2 className="text-3xl font-bold mt-6">
            No Recipes Added Yet
          </h2>

          <p className="text-default-500 max-w-md mx-auto mt-3">
            You haven't created any recipes yet.
            Start sharing your culinary creations
            with the community.
          </p>

          <Link href="/dashboard/user/add-recipe">
            <Button
              color="success"
              className="mt-8"
            >
              Create First Recipe
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}