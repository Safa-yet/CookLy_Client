"use client";

import {
  FiBookOpen,
  FiHeart,
  FiThumbsUp,
  FiAward,
} from "react-icons/fi";

export default function DashboardOverview() {
  // ============================
  // TODO: Fetch dashboard stats
  // ============================

  // Example:
  // const { data, isLoading } = useGetDashboardStats();

  const stats = {
    totalRecipes: 0,
    totalFavorites: 0,
    totalLikesReceived: 0,
    isPremium: false,
  };

  return (
    <div className="space-y-8">
      {/* ============================
          PAGE HEADER
      ============================ */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard Overview
        </h1>

        <p className="text-default-500 mt-2">
          Manage your recipes, favorites and account.
        </p>
      </div>

      {/* ============================
          PREMIUM CARD
      ============================ */}
      <div
        className={`rounded-3xl border p-6 ${
          stats.isPremium
            ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
            : "border-default-200"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-4 rounded-2xl ${
              stats.isPremium
                ? "bg-amber-500 text-white"
                : "bg-default-100"
            }`}
          >
            <FiAward size={28} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {stats.isPremium
                ? "Premium Member"
                : "Free Member"}
            </h2>

            <p className="text-default-500">
              {stats.isPremium
                ? "Unlimited recipe creation unlocked."
                : "Upgrade to Premium for unlimited recipes."}
            </p>
          </div>
        </div>
      </div>

      {/* ============================
          STATS GRID
      ============================ */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Recipes */}
        <div className="rounded-3xl border border-default-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-default-500">
                Total Recipes
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                {stats.totalRecipes}
              </h3>
            </div>

            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <FiBookOpen size={26} />
            </div>
          </div>
        </div>

        {/* Total Favorites */}
        <div className="rounded-3xl border border-default-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-default-500">
                Total Favorites
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                {stats.totalFavorites}
              </h3>
            </div>

            <div className="rounded-2xl bg-pink-100 p-4 text-pink-600">
              <FiHeart size={26} />
            </div>
          </div>
        </div>

        {/* Total Likes */}
        <div className="rounded-3xl border border-default-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-default-500">
                Total Likes Received
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                {stats.totalLikesReceived}
              </h3>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
              <FiThumbsUp size={26} />
            </div>
          </div>
        </div>
      </div>

      {/* ============================
          FUTURE DATA SECTION
      ============================ */}
      <div className="rounded-3xl border border-dashed border-default-300 p-10">
        <h3 className="text-xl font-semibold">
          Recent Activity
        </h3>

        <p className="mt-2 text-default-500">
          You can show recent recipes,
          favorites, purchases, or analytics here.
        </p>

        {/* TODO:
            Fetch recent user activity
        */}
      </div>
    </div>
  );
}