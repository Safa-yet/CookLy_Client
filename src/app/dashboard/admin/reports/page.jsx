import ReportsTable from "@/component/Item/ReportsTable";
import { ProtectServerFetch, ServerFetch } from "@/lib/Shared/Server";


export default async function Page() {
  const reports = await ProtectServerFetch(
    "/api/admin/reports"
  );

  return (
    <ReportsTable reports={reports} />
  );
}