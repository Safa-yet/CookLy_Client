"use client";

import { Button, Chip } from "@heroui/react";

import toast from "react-hot-toast";

import { FiTrash2, FiCheck } from "react-icons/fi";

import { useRouter } from "next/navigation";
import { removeReport, responseReport } from "@/lib/actions/report";

export default function ReportsTable({ reports }) {
  const router = useRouter();

  const dismissReport = async (id) => {


    const data = await responseReport(id)

    if (data.success) {
      toast.success("Report Dismissed");

      router.refresh();
    }
  };

  const removeRecipe = async (reportId, recipeId) => {

    const data = await removeReport(reportId,recipeId)

    if (data.success) {
      toast.success("Recipe Removed");

      router.refresh();
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Recipe Reports</h2>

        <p className="text-default-500">Review reported recipes</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Recipe</th>

              <th className="text-left py-4">Reporter</th>

              <th className="text-left py-4">Reason</th>

              <th className="text-left py-4">Status</th>

              <th className="text-left py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports?.map((report) => (
              <tr key={report._id} className="border-b">
                <td className="py-4 font-medium">{report.recipeName}</td>

                <td>{report.reporterEmail}</td>

                <td>
                  <Chip
                    color={
                      report.reason === "Spam"
                        ? "warning"
                        : report.reason === "Copyright Issue"
                          ? "danger"
                          : "secondary"
                    }
                  >
                    {report.reason}
                  </Chip>
                </td>

                <td>
                  <Chip
                    color={
                      report.status === "pending"
                        ? "warning"
                        : report.status === "resolved"
                          ? "success"
                          : "default"
                    }
                  >
                    {report.status}
                  </Chip>
                </td>

                <td>
                  {report.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        color="success"
                        size="sm"
                        startContent={<FiCheck />}
                        onPress={() => dismissReport(report._id)}
                      >
                        Dismiss
                      </Button>

                      <Button
                        color="danger"
                        size="sm"
                        startContent={<FiTrash2 />}
                        onPress={() =>
                          removeRecipe(report._id, report.recipeId)
                        }
                      >
                        Remove Recipe
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
