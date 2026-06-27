import { FiMail, FiShield, FiCalendar } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { getUserSession } from "@/lib/Reuseable/session";
import { getUserByEmail } from "@/lib/api/getUser";
import EditProfileModal from "@/component/Item/EditProfileModal";

export default async function ProfilePage() {
  const session = await getUserSession();
  const user = await getUserByEmail(session?.email);

  const isPremium = user?.plan === "user_premium";
  const isPro = user?.plan === "user_pro";

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12 text-foreground font-sans antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* ====================== */}
        {/* Core Profile Header Card */}
        {/* ====================== */}
        <div className="bg-content1 rounded-[32px] border border-default-100 shadow-medium overflow-hidden relative">
          
          {/* Cover Area with Premium Theme Gradients */}
          <div className={`h-40 md:h-48 w-full relative opacity-85 ${
            isPremium 
              ? "bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-transparent" 
              : isPro 
                ? "bg-gradient-to-r from-success-500/20 via-emerald-500/10 to-transparent" 
                : "bg-gradient-to-r from-default-300/30 to-transparent"
          }`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-content1" />
          </div>

          <div className="px-6 md:px-8 pb-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-16">
              
              {/* Left Wing: Avatar & Meta Data */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className={`w-32 h-32 rounded-full p-1 bg-content1 shadow-xl flex items-center justify-center ${
                    isPremium
                      ? "ring-4 ring-amber-400"
                      : isPro
                        ? "ring-4 ring-success"
                        : "ring-4 ring-default-200"
                  }`}>
                    <Image
                      src={user?.image}
                      alt={user?.name}
                      width={128}
                      height={128}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>

                  {/* Badge Parameters */}
                  {isPremium && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 bg-amber-400 text-black font-black px-3 py-0.5 rounded-full text-[10px] tracking-wider shadow-md">
                      PREMIUM
                    </div>
                  )}

                  {isPro && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 bg-success text-white dark:text-zinc-950 font-black px-3 py-0.5 rounded-full text-[10px] tracking-wider shadow-md">
                      PRO
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                    {user?.name}
                  </h1>
                  <p className="text-default-400 text-sm font-medium">{user?.email}</p>
                  
                  {/* Status Pillars */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                    <span className="bg-primary-500/10 text-primary border border-primary-500/10 px-3.5 py-1 rounded-full text-xs font-bold capitalize">
                      {user?.role}
                    </span>
                    <span className={`px-3.5 py-1 rounded-full text-xs font-bold border ${
                      user?.isBlocked
                        ? "bg-danger-500/10 text-danger border-danger-500/10"
                        : "bg-success-500/10 text-success border-success-500/10"
                    }`}>
                      {user?.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Wing: Modal Trigger Layout */}
              <div className="shrink-0 flex justify-center w-full md:w-auto">
                <EditProfileModal user={user} />
              </div>

            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* Info Grid Parameters   */}
        {/* ====================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Email Information card */}
          <div className="bg-content1 border border-default-100 rounded-2xl p-5.5 shadow-sm hover:border-default-300 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-success-500/10 text-success">
                <FiMail size={18} />
              </div>
              <h3 className="font-bold text-sm text-default-400 uppercase tracking-wider">Email Address</h3>
            </div>
            <p className="text-foreground font-semibold text-sm break-all">{user?.email}</p>
          </div>

          {/* Account Permissions Matrix */}
          <div className="bg-content1 border border-default-100 rounded-2xl p-5.5 shadow-sm hover:border-default-300 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-success-500/10 text-success">
                <FiShield size={18} />
              </div>
              <h3 className="font-bold text-sm text-default-400 uppercase tracking-wider">Account Role</h3>
            </div>
            <p className="text-foreground font-bold text-base capitalize">{user?.role}</p>
          </div>

          {/* Core Timestamp Metric */}
          <div className="bg-content1 border border-default-100 rounded-2xl p-5.5 shadow-sm hover:border-default-300 transition-colors sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-success-500/10 text-success">
                <FiCalendar size={18} />
              </div>
              <h3 className="font-bold text-sm text-default-400 uppercase tracking-wider">Registration Date</h3>
            </div>
            <p className="text-foreground font-bold text-base">
              {new Date(user?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* ====================== */}
        {/* Subscription Track Card */}
        {/* ====================== */}
        <div className="mt-2">
          <div className={`rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden shadow-lg ${
            isPremium
              ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-orange-500/10"
              : isPro
                ? "bg-gradient-to-br from-success to-emerald-700 shadow-success/10"
                : "bg-gradient-to-br from-zinc-700 to-zinc-900 dark:from-zinc-800 dark:to-neutral-950 shadow-black/10"
          }`}>
            {/* Soft Ambient Vector Background for Premium Feel */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

            <span className="inline-block bg-white/20 backdrop-blur-md text-white font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-md mb-4">
              Subscription Management Matrix
            </span>

            <h2 className="text-xl md:text-2xl font-black tracking-tight">Current Subscription</h2>
            <p className="mt-1 text-white/80 text-xs md:text-sm font-medium">Your current dynamic Cookly plan tier status allocation</p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div className="space-y-1.5">
                <h3 className="text-4xl md:text-5xl font-black tracking-tight">
                  {isPremium ? "Premium" : isPro ? "Pro" : "Free"}
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  {isPremium
                    ? "Unlimited recipe posting parameters unlocked."
                    : isPro
                      ? "Configuration allocations up to 10 recipes per month."
                      : "Basic community tier parameters."}
                </p>
              </div>

              <Link href="/plans" className="w-full sm:w-auto shrink-0">
                <button className="w-full sm:w-auto bg-white hover:bg-white/95 text-black dark:text-zinc-950 px-6 h-12 rounded-2xl font-bold text-sm tracking-tight transition-transform active:scale-95 shadow-md">
                  Upgrade Plan
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}