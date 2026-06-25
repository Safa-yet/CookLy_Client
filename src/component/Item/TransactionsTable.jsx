"use client";

import {
  Chip,
  Input,
} from "@heroui/react";

import { useState } from "react";

export default function TransactionsTable({
  transactions,
}) {

  const [search, setSearch] =
    useState("");

  const filtered =
    transactions.filter(
      (item) =>
        item.user
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Transactions
        </h2>

        <p className="text-default-500">
          All platform payments
        </p>

      </div>

      <Input
        placeholder="Search User..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="overflow-x-auto mt-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">
                User
              </th>

              <th className="text-left py-4">
                Type
              </th>

              <th className="text-left py-4">
                Amount
              </th>

              <th className="text-left py-4">
                Status
              </th>

              <th className="text-left py-4">
                Transaction ID
              </th>

              <th className="text-left py-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map(
              (item) => (
                <tr
                  key={item._id}
                  className="border-b"
                >

                  <td className="py-4">
                    {item.user}
                  </td>

                  <td>

                    <Chip
                      color={
                        item.type ===
                        "Subscription"
                          ? "warning"
                          : "primary"
                      }
                    >
                      {item.type}
                    </Chip>

                  </td>

                  <td>
                    $
                    {item.amount}
                  </td>

                  <td>

                    <Chip
                      color={
                        item.status ===
                        "succeeded"
                          ? "success"
                          : "danger"
                      }
                    >
                      {
                        item.status
                      }
                    </Chip>

                  </td>

                  <td className="max-w-[250px] truncate">
                    {
                      item.transactionId
                    }
                  </td>

                  <td>
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}