// import RecipeCard from "@/Components/Recipes/RecipeCard";
// import RecipeFilter from "@/Components/Recipes/RecipeFilter";

import RecipeCard from "@/component/Item/RecipeCard";
import { getAllRecipes } from "@/lib/api/getAllRecipes";

export default async function RecipesPage() {
  // TODO:
  const recipes = await getAllRecipes();

//   const recipes = [];

  return (
    <section className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
            Browse Recipes
          </span>

          <h1 className="text-5xl font-bold mt-4">
            Discover Amazing Recipes
          </h1>

          <p className="text-default-500 mt-4 max-w-2xl mx-auto">
            Explore recipes shared by our community.
            Filter by category and find your next favorite meal.
          </p>
        </div>

        {/* Filter */}
        {/* <RecipeFilter /> */}

        {/* Cards */}
        {recipes?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-8">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-default-200 p-16 text-center mt-8">
            <div className="text-7xl mb-6">🍲</div>

            <h2 className="text-3xl font-bold">
              No Recipes Found
            </h2>

            <p className="text-default-500 mt-3">
              Try selecting another category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}