
import AdminDashboard from "@/component/common/AdminDashboard";
import { ProtectServerFetch } from "@/lib/Shared/Server";


export default async function Page() {
  const stats = await ProtectServerFetch("/api/admin/dashboard");

  return <AdminDashboard stats={stats} />;
}
