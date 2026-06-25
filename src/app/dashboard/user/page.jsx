

// import DashboardOverview from "@/component/Dashboard/DashboardOverview";
import DashboardOverview from "@/component/Item/DashboardOverview";
import { getUserSession } from "@/lib/Reuseable/session";
import { ServerFetch } from "@/lib/Shared/Server";

export default async function DashboardPage() {
  const user = await getUserSession();

  const stats = await ServerFetch(
    `/api/dashboard/stats/${user.id}`
  );

  return (
    <DashboardOverview
      user={user}
      stats={stats}
    />
  );
}