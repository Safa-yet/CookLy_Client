import ManageRecipesTable from "@/component/Item/ManageRecipesTable";
import { ProtectServerFetch, ServerFetch } from "@/lib/Shared/Server";


export default async function Page({
  searchParams,
}) {

    const params = await searchParams; // Next.js 15
  const page =
    Number(params.page) || 1;

  const data = await ProtectServerFetch(
    `/api/admin/recipes?page=${page}&limit=5`
  );

  return (
    <ManageRecipesTable
      recipes={data.recipes}
      totalPages={data.totalPages}
      currentPage={data.currentPage}
    />
  );
}