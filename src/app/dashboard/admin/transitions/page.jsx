import TransactionsTable from "@/component/Item/TransactionsTable";
import { ProtectServerFetch } from "@/lib/Shared/Server";


export default async function TransactionsPage() {

  const transactions =
    await ProtectServerFetch(
      "/api/admin/transactions"
    );

  return (
    <TransactionsTable
      transactions={
        transactions
      }
    />
  );
}