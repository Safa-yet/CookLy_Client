"use client";

import Image from "next/image";

import { Avatar, Button, Chip, Input } from "@heroui/react";

import { useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userBlock, userUnblock } from "@/lib/actions/manageUser";

export default function ManageUsersTable({ users }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user?.name?.toLowerCase().includes(keyword) ||
      user?.email?.toLowerCase().includes(keyword)
    );
  });

  const handleBlock = async (id) => {
    try {
      const data = await userBlock(id);

      if (data.success) {
        toast.success("User Blocked");
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  const handleUnblock = async (id) => {
    try {
      const data = await userUnblock(id);

      if (data.success) {
        toast.success("User Unblocked");
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">
      <div className="flex justify-between gap-4 mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">User</th>

              <th className="text-left py-4">Plan</th>

              <th className="text-left py-4">Role</th>

              <th className="text-left py-4">Status</th>

              <th className="text-left py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                      <Avatar>
        <Avatar.Image alt="John Doe" src={user.image} />
        <Avatar.Fallback>{user.name[1]}</Avatar.Fallback>
      </Avatar>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>

                      <p className="text-sm text-default-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <Chip
                    color={
                      user.plan === "premium"
                        ? "warning"
                        : user.plan === "pro"
                          ? "success"
                          : "default"
                    }
                  >
                    {user.plan || "free"}
                  </Chip>
                </td>

                <td>
                  <Chip color={user.role === "admin" ? "danger" : "primary"}>
                    {user.role}
                  </Chip>
                </td>

                <td>
                  <Chip color={user.isBlocked ? "danger" : "success"}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Chip>
                </td>

                <td>
                  {user.role !== "admin" && (
                    <>
                      {user.isBlocked ? (
                        <Button
                          size="sm"
                          color="success"
                          onPress={() =>{console.log(user._id), handleUnblock(user._id)}}
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          color="danger"
                          onPress={() => handleBlock(user._id)}
                        >
                          Block
                        </Button>
                      )}
                    </>
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
