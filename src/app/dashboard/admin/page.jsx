
import AdminDashboard from "@/component/common/AdminDashboard";
import { ServerFetch } from "@/lib/Shared/Server";

export default async function Page() {
  const stats = await ServerFetch("/api/admin/dashboard");

  return <AdminDashboard stats={stats} />;
}
