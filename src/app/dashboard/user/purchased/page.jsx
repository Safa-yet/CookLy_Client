import PurchasedRecipesTable from "@/component/Item/PurchasedRecipesTable";
import { getPurchasedRecipes } from "@/lib/api/payment";
import { getUserSession } from "@/lib/Reuseable/session";



export default async function PurchasedRecipesPage() {

  const user =
    await getUserSession();

  const purchasedRecipes =
    await getPurchasedRecipes(
      user?.id
    );

  return (
    <div className="min-h-screen bg-[#F4F6F8] dark:bg-zinc-950 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-[#091E21] dark:text-white">
            My Purchased Recipes
          </h1>

          <p className="text-default-500 mt-2">
            View all recipes you have purchased.
          </p>

        </div>

        <PurchasedRecipesTable
          recipes={purchasedRecipes}
        />

      </div>

    </div>
  );
}