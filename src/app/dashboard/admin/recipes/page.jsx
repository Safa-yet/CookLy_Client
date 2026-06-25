// dashboard/admin/recipes/page.jsx

import ManageRecipesTable from "@/component/Item/ManageRecipesTable";
import { ServerFetch } from "@/lib/Shared/Server";

export default async function Page() {
  const recipes = await ServerFetch("/api/recipes");

  return <ManageRecipesTable recipes={recipes} />;
}
