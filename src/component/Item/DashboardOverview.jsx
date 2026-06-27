"use client";

import Link from "next/link";
import { 
  FiBookOpen, 
  FiHeart, 
  FiThumbsUp, 
  FiShoppingBag, 
  FiAward, 
  FiArrowUpRight, 
  FiUserCheck 
} from "react-icons/fi";

export default function DashboardOverview({ user, stats }) {
  const isPremium = user?.plan === "user_premium";
  const isPro = user?.plan === "user_pro";

  return (
    <div className="space-y-10 font-sans antialiased text-zinc-800 dark:text-zinc-200 selection:bg-[#0e4e36]/10">
      
      {/* ====================== */}
      {/* Top Banner & Profile Header */}
      {/* ====================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/40 p-6 md:p-8 rounded-[32px] transition-all">
        <div className="flex items-center gap-5">
          <div className="relative group shrink-0">
            <img
              src={user?.image}
              alt={user?.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-white dark:ring-zinc-900 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#0e4e36] dark:bg-emerald-500 text-white p-1.5 rounded-full shadow-sm border-2 border-white dark:border-zinc-900">
              <FiUserCheck size={12} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
                Hey, {user?.name?.split(" ")[0]}! 
              </h1>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs md:text-sm mt-1.5 font-medium max-w-md">
              Welcome back. Everything is synced up and ready. Manage your recipes and overview reports seamlessly.
            </p>
          </div>
        </div>

        {/* Action Controls Side */}
        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          <Link 
            href="/dashboard/add-recipe"
            className="inline-flex items-center justify-center bg-[#0e4e36] hover:bg-[#0b3d2a] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-zinc-950 px-6 h-12 rounded-2xl text-sm font-bold tracking-tight transition-all shadow-md shadow-[#0e4e36]/5 dark:shadow-none active:scale-[0.98]"
          >
            + Add New Recipe
          </Link>
        </div>
      </div>

      {/* ====================== */}
      {/* Main Core Analytics Layout */}
      {/* ====================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Core Area: Stats Grid & Recipe Features (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Stats Blocks Grid - Directly inspired by image_5540bf.jpg */}
          <div>
            <div className="flex items-center justify-between mb-4.5 px-1">
              <h3 className="text-base font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase tracking-wider text-[11px] text-zinc-400">
                Performance Matrices
              </h3>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard
                title="Total Recipes"
                value={stats?.totalRecipes || 0}
                icon={<FiBookOpen size={18} />}
                isFeatured={true} // Gradient highlighted state like image_5540bf.jpg total projects
              />
              <StatCard
                title="Saved Favorites"
                value={stats?.totalFavorites || 0}
                icon={<FiHeart size={18} />}
              />
              <StatCard
                title="Total Likes"
                value={stats?.totalLikesReceived || 0}
                icon={<FiThumbsUp size={18} />}
              />
              <StatCard
                title="Purchased Items"
                value={stats?.totalPurchased || 0}
                icon={<FiShoppingBag size={18} />}
              />
            </div>
          </div>

          {/* Most Liked Recipe Block */}
          {stats?.mostLikedRecipe && (
            <div className="rounded-[28px] border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.01)] backdrop-blur-md">
              <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-5">
                Top Performing Content 🔥
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative group shrink-0 overflow-hidden rounded-2xl w-full sm:w-[140px] h-[140px] border border-zinc-100 dark:border-zinc-800/40">
                  <img
                    src={stats?.mostLikedRecipe?.recipeImage}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-between py-1 grow">
                  <div className="space-y-1">
                    <h4 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
                      {stats?.mostLikedRecipe?.recipeName}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                      <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium">
                        Category: <span className="text-zinc-600 dark:text-zinc-300 font-semibold">{stats?.mostLikedRecipe?.category}</span>
                      </p>
                      <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
                      <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium">
                        Cuisine: <span className="text-zinc-600 dark:text-zinc-300 font-semibold">{stats?.mostLikedRecipe?.cuisineType}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50 flex items-center gap-3">
                    <span className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-100/30 dark:border-none">
                      ❤️ {stats?.mostLikedRecipe?.likesCount} Likes
                    </span>
                    <span className="bg-emerald-50 dark:bg-emerald-950/20 text-[#0e4e36] dark:text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-100/30 dark:border-none">
                      Price: ${stats?.mostLikedRecipe?.recipePrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Subscription Widget & Metadata Cards (4 Columns) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          
          {/* Brand New Modern Ultra-Badge Membership Layout (Inspired by App Download Widget of image_5540bf.jpg) */}
          <div className="relative rounded-[28px] p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-[#041f14] dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 border border-zinc-800 shadow-xl overflow-hidden group">
            
            {/* Geometric Glowing Orbs Background */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
            <div className="absolute left-[-20%] bottom-[-20%] w-40 h-40 bg-zinc-800/40 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-emerald-400 shadow-sm shrink-0">
                  <FiAward size={20} className="animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  {user?.plan?.replace("user_", "") || "Free Level"}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-black text-white tracking-tight">
                  {isPremium ? "Premium Master Account 👑" : isPro ? "Pro User" : "Standard Account Plan"}
                </h4>
                <p className="text-zinc-400 text-xs font-medium leading-relaxed">
                  {isPremium 
                    ? "Enjoy full unrestricted system endpoints and elite assets." 
                    : isPro 
                      ? "Advanced operational triggers and extended utilities unlocked." 
                      : "Unlock limits and upgrade your plan to experience complete features."}
                </p>
              </div>

              <div className="pt-2">
                <button className="w-full h-11 bg-[#0e4e36] hover:bg-[#0b3d2a] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-[0.99]">
                  {isPremium || isPro ? "View Benefits Matrix" : "Upgrade Plan Now"}
                </button>
              </div>
            </div>
          </div>

          {/* Account Identifiers Grid Card */}
          <div className="rounded-[28px] border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.005)]">
            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4 px-1">
              Account Attributes
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5">
              <InfoCard label="System Role" value={user?.role} />
              <InfoCard label="Plan Config" value={user?.plan?.replace("user_", "")} />
              <InfoCard label="Account Status" value={user?.isBlocked ? "Blocked" : "Active"} isStatus={true} isActive={!user?.isBlocked} />
              <InfoCard label="Identity Verified" value="Verified" isStatus={true} isActive={true} />
            </div>
            
            <div className="mt-4 pt-3.5 border-t border-zinc-50 dark:border-zinc-800/40 px-1 flex flex-col gap-0.5">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email String</span>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{user?.email}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ====================== */}
      {/* Quick Actions Grid Dashboard Bottom */}
      {/* ====================== */}
      <div>
        <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4.5 px-1">
          Quick Utilities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickCard href="/dashboard/add-recipe" title="Add Recipe" description="Publish new items" />
          <QuickCard href="/dashboard/my-recipes" title="My Recipes" description="Manage database" />
          <QuickCard href="/dashboard/favorites" title="Favorites" description="Curated collections" />
          <QuickCard href="/dashboard/purchased-recipes" title="Purchases" description="Unlocked premium items" />
        </div>
      </div>

    </div>
  );
}

{/* ====================== */}
{/* Helper Sub-Components Custom-Tailored for HeroUI Standards */}
{/* ====================== */}
function StatCard({ title, value, icon, isFeatured }) {
  if (isFeatured) {
    return (
      <div className="rounded-[22px] bg-[#0e4e36] text-white p-5 relative overflow-hidden group shadow-lg shadow-[#0e4e36]/5 transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1">
            <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">{title}</p>
            <h3 className="text-4xl font-black tracking-tight pt-1">{value}</h3>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-white">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center text-[10px] font-medium text-emerald-300/80 relative z-10">
          <span>Active records monitoring</span>
        </div>
        <FiArrowUpRight className="absolute right-2 bottom-2 text-white/5 group-hover:text-white/10 transition-colors pointer-events-none" size={70} />
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-5 flex justify-between items-start transition-all duration-300 hover:translate-y-[-2px] shadow-[0_10px_35px_rgba(0,0,0,0.003)]">
      <div className="space-y-1">
        <p className="text-zinc-400 dark:text-zinc-500 text-[11px] font-bold uppercase tracking-widest">{title}</p>
        <h3 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight pt-1">{value}</h3>
      </div>
      <div className="p-3 bg-zinc-50 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 rounded-xl border border-zinc-100/80 dark:border-zinc-800/80">
        {icon}
      </div>
    </div>
  );
}

function QuickCard({ href, title, description }) {
  return (
    <Link href={href} className="group">
      <div className="rounded-[22px] border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-5 hover:border-[#0e4e36]/30 dark:hover:border-emerald-500/30 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
        <div>
          <h4 className="font-extrabold text-zinc-800 dark:text-zinc-200 group-hover:text-[#0e4e36] dark:group-hover:text-emerald-400 transition-colors text-sm md:text-base tracking-tight">
            {title}
          </h4>
          <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-1 font-medium leading-normal">{description}</p>
        </div>
        <div className="mt-5 flex justify-end">
          <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-zinc-400 group-hover:text-[#0e4e36] dark:group-hover:text-emerald-400 border border-zinc-100 dark:border-zinc-800/80 transition-all">
            <FiArrowUpRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function InfoCard({ label, value, isStatus, isActive }) {
  return (
    <div className="rounded-xl bg-zinc-50/60 dark:bg-zinc-950/40 border border-zinc-100/50 dark:border-zinc-800/40 p-3">
      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">{label}</p>
      {isStatus ? (
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
          <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200 capitalize">{value}</h4>
        </div>
      ) : (
        <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200 mt-1.5 capitalize truncate">{value || "Unset"}</h4>
      )}
    </div>
  );
}