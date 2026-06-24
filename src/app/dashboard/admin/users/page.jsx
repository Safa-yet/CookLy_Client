import ManageUsersTable from "@/component/Item/ManageUsersTable";
import { getAllUsers } from "@/lib/api/getUser";


export default async function ManageUsersPage() {
  const users = await getAllUsers();

  const totalUsers = users.length;

  const premiumUsers = users.filter(
    (user) => user.plan === "premium"
  ).length;

  const blockedUsers = users.filter(
    (user) => user.isBlocked
  ).length;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>

        <p className="text-default-500 mt-2">
          Manage platform users, plans and access.
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">
          <h4 className="text-default-500">
            Total Users
          </h4>

          <h2 className="text-4xl font-bold mt-2">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">
          <h4 className="text-default-500">
            Premium Users
          </h4>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {premiumUsers}
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">
          <h4 className="text-default-500">
            Blocked Users
          </h4>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {blockedUsers}
          </h2>
        </div>
      </div>

      <ManageUsersTable users={users} />
    </div>
  );
}