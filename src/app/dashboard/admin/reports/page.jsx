import ReportsTable from "@/component/Item/ReportsTable";
import { ServerFetch } from "@/lib/Shared/Server";


export default async function Page() {
  const reports = await ServerFetch(
    "/api/admin/reports"
  );

  return (
    <ReportsTable reports={reports} />
  );
}