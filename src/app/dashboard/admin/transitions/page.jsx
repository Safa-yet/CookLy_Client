import TransactionsTable from "@/component/Item/TransactionsTable";
import { ServerFetch } from "@/lib/Shared/Server";


export default async function TransactionsPage() {

  const transactions =
    await ServerFetch(
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