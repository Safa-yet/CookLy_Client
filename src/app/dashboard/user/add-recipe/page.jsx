
// import AddRecipeForm from "@/components/Recipes/AddRecipeForm";
// import { getUserRecipes } from "@/lib/api/recipes";
// import { getPlanById } from "@/lib/api/plans";
// import { getUserSession } from "@/lib/reusable/session";

import AddRecipeForm from "@/component/Item/AddRecipeForm";
import { getAuthorRecipes } from "@/lib/api/getAuthorRecipes";
import { getPlanById } from "@/lib/api/getPlan";
import { getUserSession } from "@/lib/Reuseable/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AddRecipePage() {
  const user = await getUserSession();

  if (!user) {
    redirect(
      "/auth/signin?redirect=/dashboard/add-recipe"
    );
  }

  const recipes = await getAuthorRecipes(
    user.id
  );

  const plan = await getPlanById(
    user.plan || "user_free"
  );

  const currentRecipes =
    recipes?.length || 0;

  const maxRecipes =
    plan.maxRecipes;

  const isUnlimited =
    maxRecipes === -1;

  const progress = isUnlimited
    ? 0
    : Math.min(
        (currentRecipes /
          maxRecipes) *
          100,
        100
      );

  const limitReached =
    !isUnlimited &&
    currentRecipes >= maxRecipes;

  return (
    <div className="min-h-screen bg-[#F4F6F8] pt-24 pb-10">

      <div className="max-w-6xl mx-auto px-5">

        {/* Usage Banner */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <span className="inline-flex bg-[#DFF8EC] text-[#00B96D] px-4 py-2 rounded-full text-sm font-medium">
                Recipe Publishing Plan
              </span>

              <h1 className="text-3xl font-bold text-[#091E21] mt-4">
                Recipe Publishing Usage
              </h1>

              <p className="text-gray-500 mt-2">
                Track how many recipes
                you've published.
              </p>

            </div>

            <div className="text-right">

              <h3 className="text-4xl font-bold text-[#091E21]">

                {isUnlimited
                  ? `${currentRecipes} / ∞`
                  : `${currentRecipes}/${maxRecipes}`}

              </h3>

              <p className="text-sm text-gray-500">
                Recipes Published
              </p>

            </div>

          </div>

          {!isUnlimited && (
            <div className="mt-8">

              <div className="flex justify-between text-sm mb-2">

                <span className="font-medium">
                  Progress
                </span>

                <span className="font-semibold text-[#00B96D]">
                  {Math.round(
                    progress
                  )}
                  %
                </span>

              </div>

              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className={`h-full transition-all duration-500 ${
                    limitReached
                      ? "bg-red-500"
                      : "bg-[#00B96D]"
                  }`}
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>
          )}
        </div>

        {/* Limit Reached */}

        {limitReached ? (
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center text-5xl">
              🍳
            </div>

            <h2 className="text-3xl font-bold text-[#091E21] mt-6">
              Recipe Limit Reached
            </h2>

            <p className="text-gray-500 max-w-lg mx-auto mt-3">

              You've already published
              your maximum allowed
              recipes for this plan.

            </p>

            <p className="text-gray-500 mt-2">
              Upgrade your membership
              to publish more recipes.
            </p>

            <Link
              href="/plans"
              className="inline-block mt-8"
            >
              <button className="bg-[#00B96D] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
                Upgrade Membership
              </button>
            </Link>

          </div>
        ) : (
          <>
            {/* Remaining Recipes */}

            {!isUnlimited && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-xl font-bold text-[#091E21]">
                      Remaining Recipes
                    </h3>

                    <p className="text-gray-500 mt-1">
                      You can still publish
                      more recipes.
                    </p>

                  </div>

                  <div className="bg-[#DFF8EC] text-[#00B96D] px-5 py-3 rounded-2xl">

                    <span className="text-2xl font-bold">

                      {maxRecipes -
                        currentRecipes}

                    </span>

                  </div>

                </div>

              </div>
            )}

            {isUnlimited && (
              <div className="bg-white rounded-3xl border border-green-100 shadow-sm p-6 mb-8">

                <h3 className="text-xl font-bold text-green-600">
                  Premium Membership Active 👑
                </h3>

                <p className="text-gray-500 mt-2">
                  You can publish
                  unlimited recipes.
                </p>

              </div>
            )}

            <AddRecipeForm
              user={user}
            />

          </>
        )}

      </div>

    </div>
  );
}

