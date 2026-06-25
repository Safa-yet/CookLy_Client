"use client";

import {
  FiUsers,
  FiBookOpen,
  FiAward,
  FiFlag,
  FiShoppingCart,
  FiStar,
  FiUserX,
} from "react-icons/fi";

export default function AdminDashboard({
  stats,
}) {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    {
      title: "Total Recipes",
      value: stats.totalRecipes,
      icon: FiBookOpen,
      bg: "bg-green-100",
      text: "text-green-600",
    },

    {
      title: "Premium Members",
      value:
        stats.totalPremiumMembers,
      icon: FiAward,
      bg: "bg-amber-100",
      text: "text-amber-600",
    },

    {
      title: "Reports",
      value: stats.totalReports,
      icon: FiFlag,
      bg: "bg-red-100",
      text: "text-red-600",
    },

    {
      title: "Purchases",
      value:
        stats.totalPurchases,
      icon: FiShoppingCart,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },

    {
      title: "Featured Recipes",
      value:
        stats.featuredRecipes,
      icon: FiStar,
      bg: "bg-pink-100",
      text: "text-pink-600",
    },

    {
      title: "Blocked Users",
      value:
        stats.blockedUsers,
      icon: FiUserX,
      bg: "bg-zinc-100",
      text: "text-zinc-600",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-default-500 mt-2">
          Monitor users, recipes,
          reports and platform activity.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {cards.map(
          (card, index) => {
            const Icon =
              card.icon;

            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border rounded-3xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-default-500 text-sm">
                      {
                        card.title
                      }
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                      {
                        card.value
                      }
                    </h2>

                  </div>

                  <div
                    className={`${card.bg} ${card.text} p-4 rounded-2xl`}
                  >
                    <Icon
                      size={
                        28
                      }
                    />
                  </div>

                </div>
              </div>
            );
          }
        )}

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">

          <h3 className="font-semibold text-xl">
            Platform Overview
          </h3>

          <div className="space-y-4 mt-6">

            <div className="flex justify-between">
              <span>
                User Base
              </span>

              <span className="font-semibold">
                {
                  stats.totalUsers
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Premium Members
              </span>

              <span className="font-semibold">
                {
                  stats.totalPremiumMembers
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Recipes Published
              </span>

              <span className="font-semibold">
                {
                  stats.totalRecipes
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Purchases
              </span>

              <span className="font-semibold">
                {
                  stats.totalPurchases
                }
              </span>
            </div>

          </div>

        </div>

        <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">

          <h3 className="font-semibold text-xl">
            Moderation Center
          </h3>

          <div className="space-y-4 mt-6">

            <div className="flex justify-between">
              <span>
                Pending Reports
              </span>

              <span className="font-semibold text-red-500">
                {
                  stats.totalReports
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Featured Recipes
              </span>

              <span className="font-semibold text-amber-500">
                {
                  stats.featuredRecipes
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Blocked Users
              </span>

              <span className="font-semibold text-red-500">
                {
                  stats.blockedUsers
                }
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}