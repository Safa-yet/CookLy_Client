"use client";

import Link from "next/link";

import {
  FiBookOpen,
  FiHeart,
  FiThumbsUp,
  FiShoppingBag,
  FiAward,
  FiUser,
} from "react-icons/fi";

export default function DashboardOverview({ user, stats }) {
  const isPremium = user?.plan === "user_premium";

  const isPro = user?.plan === "user_pro";

  return (
    <div className="space-y-8">
      {/* ====================== */}
      {/* Welcome */}
      {/* ====================== */}

      <div>
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="text-default-500 mt-2">
          Manage your recipes and account.
        </p>
      </div>

      {/* ====================== */}
      {/* Membership Card */}
      {/* ====================== */}

      <div
        className={`
        rounded-3xl p-8 text-white

        ${
          isPremium
            ? "bg-gradient-to-r from-yellow-500 to-amber-600"
            : isPro
              ? "bg-gradient-to-r from-blue-500 to-cyan-600"
              : "bg-gradient-to-r from-zinc-700 to-zinc-900"
        }
      `}
      >
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 rounded-2xl">
            <FiAward size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {isPremium
                ? "Premium Member 👑"
                : isPro
                  ? "Pro Member 🚀"
                  : "Free Member"}
            </h2>

            <p className="text-white/80 mt-1">
              {isPremium
                ? "Unlimited recipe access unlocked."
                : isPro
                  ? "Advanced recipe features unlocked."
                  : "Upgrade your plan for more features."}
            </p>
          </div>
        </div>
      </div>

      {/* ====================== */}
      {/* Stats */}
      {/* ====================== */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Recipes"
          value={stats?.totalRecipes || 0}
          icon={<FiBookOpen size={24} />}
          bg="bg-green-100 dark:bg-green-900/30"
          text="text-green-600"
        />

        <StatCard
          title="Favorites"
          value={stats?.totalFavorites || 0}
          icon={<FiHeart size={24} />}
          bg="bg-pink-100 dark:bg-pink-900/30"
          text="text-pink-600"
        />

        <StatCard
          title="Likes"
          value={stats?.totalLikesReceived || 0}
          icon={<FiThumbsUp size={24} />}
          bg="bg-blue-100 dark:bg-blue-900/30"
          text="text-blue-600"
        />

        <StatCard
          title="Purchased"
          value={stats?.totalPurchased || 0}
          icon={<FiShoppingBag size={24} />}
          bg="bg-purple-100 dark:bg-purple-900/30"
          text="text-purple-600"
        />
      </div>

      {/* ====================== */}
      {/* Most Liked Recipe */}
      {/* ====================== */}

      {stats?.mostLikedRecipe && (
        <div className="rounded-3xl border border-default-200 bg-white dark:bg-zinc-900 p-6">
          <h3 className="text-xl font-bold mb-5">Most Liked Recipe 🔥</h3>

          <div className="flex flex-col md:flex-row gap-5">
            <img
              src={stats?.mostLikedRecipe?.recipeImage}
              alt=""
              className="w-full md:w-[180px] h-[180px] rounded-2xl object-cover"
            />

            <div>
              <h4 className="text-2xl font-bold">
                {stats?.mostLikedRecipe?.recipeName}
              </h4>

              <p className="mt-2 text-default-500">
                Category: {stats?.mostLikedRecipe?.category}
              </p>

              <p className="mt-2 text-default-500">
                Cuisine: {stats?.mostLikedRecipe?.cuisineType}
              </p>

              <div className="mt-4 flex gap-3">
                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                  ❤️ {stats?.mostLikedRecipe?.likesCount}
                </span>

                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">
                  ${stats?.mostLikedRecipe?.recipePrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================== */}
      {/* Quick Actions */}
      {/* ====================== */}

      <div>
        <h3 className="text-xl font-bold mb-5">Quick Actions</h3>

        <div className="grid md:grid-cols-4 gap-5">
          <QuickCard href="/dashboard/add-recipe" title="Add Recipe" />

          <QuickCard href="/dashboard/my-recipes" title="My Recipes" />

          <QuickCard href="/dashboard/favorites" title="Favorites" />

          <QuickCard href="/dashboard/purchased-recipes" title="Purchases" />
        </div>
      </div>

      {/* ====================== */}
      {/* Account */}
      {/* ====================== */}

      <div className="rounded-3xl border border-default-200 bg-white dark:bg-zinc-900 p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.image}
            alt=""
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>
            <h3 className="text-xl font-bold">{user.name}</h3>

            <p className="text-default-500">{user.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <InfoCard label="Role" value={user.role} />

          <InfoCard label="Plan" value={user.plan} />

          <InfoCard
            label="Status"
            value={user.isBlocked ? "Blocked" : "Active"}
          />

          <InfoCard label="Account" value="Verified" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg, text }) {
  return (
    <div className="rounded-3xl border border-default-200 bg-white dark:bg-zinc-900 p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-default-500">{title}</p>

          <h3 className="text-4xl font-bold mt-2">{value}</h3>
        </div>

        <div className={`${bg} ${text} p-4 rounded-2xl`}>{icon}</div>
      </div>
    </div>
  );
}

function QuickCard({ href, title }) {
  return (
    <Link href={href}>
      <div className="rounded-3xl border border-default-200 bg-white dark:bg-zinc-900 p-6 hover:shadow-lg transition">
        <h4 className="font-semibold">{title}</h4>
      </div>
    </Link>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-default-100 dark:bg-zinc-800 p-4">
      <p className="text-sm text-default-500">{label}</p>

      <h4 className="font-semibold mt-1">{value}</h4>
    </div>
  );
}
