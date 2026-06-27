"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiLogOut, FiUser, FiChevronDown, FiLogIn, FiUserPlus, FiLayout } from "react-icons/fi";
import Image from "next/image";
import LightLogo from "../../img/Logo_White.png";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { ThemeSwitcher } from "../Item/ThemeSwitcher";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role;

  const dashboardRoutes = {
    user: "/dashboard/user",
    admin: "/dashboard/admin",
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Recipes", href: "/recipes" },
  ];

  if (user) {
    navLinks.push({
      label: "Dashboard",
      href: dashboardRoutes[role || "user"],
    });
  }

  // FIX: লগআউটের পর রাউটার ক্যাশ ও স্টেট পুরোপুরি ক্লিন করার জন্য উইন্ডো রিলোড হ্যান্ডেলার
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setDropdownOpen(false);
    setMobileOpen(false);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged Out Successfully");
            // window.location ব্যবহার করলে পুরো সেশন স্টেট ফ্রেশ হয়ে রিলোড নেয়
            window.location.href = "/";
          },
          onError: () => {
            setIsLoggingOut(false);
            toast.error("Logout failed. Try again.");
          },
        },
      });
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-900/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => {
            setMobileOpen(false);
            setDropdownOpen(false);
          }}
        >
          <Image src={LightLogo} alt="logo" width={140} height={50} className="object-contain" />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-sm font-bold tracking-wide transition-colors duration-200 py-1 group ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP RIGHT PROFILE ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeSwitcher />

          {isPending || isLoggingOut ? (
            <Spinner size="sm" color="success" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/70 dark:hover:bg-zinc-900 transition-all"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-500/20"
                    alt="user profile"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 leading-none">Account</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 max-w-[100px] truncate">
                    {user.name}
                  </p>
                </div>
                <FiChevronDown className={`text-zinc-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} size={14} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl p-2 z-20 text-left"
                    >
                      <Link
                        href="/dashboard/user/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <FiUser className="text-zinc-400" size={16} />
                        My Profile
                      </Link>
                      {/* <Divider className="my-1 bg-zinc-100 dark:bg-zinc-800" /> */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                      >
                        <FiLogOut size={16} />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/auth/signin" 
                className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <FiLogIn size={15} /> Sign In
              </Link>
              <button
                onClick={() => router.push("/auth/signup")}
                className="bg-emerald-800 dark:bg-emerald-700 hover:opacity-95 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <FiUserPlus size={15} /> Register
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
        </button>
      </div>

      {/* MOBILE INTERACTIVE ACCORDION DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden shadow-inner text-left"
          >
            <div className="p-6 space-y-6">
              
              {/* Profile Block Inside Mobile Drawer */}
              {user && (
                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-100 dark:border-zinc-900">
                  {user.image ? (
                    <img src={user.image} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">{user.name}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Theme Settings Control */}
              <div className="flex items-center justify-between px-2 py-1 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-xl">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Interface Display</span>
                <ThemeSwitcher />
              </div>

              {/* Navigation Route Map */}
              <div className="flex flex-col gap-2">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-bold px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                        isActive 
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400" 
                          : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                      }`}
                    >
                      <FiLayout size={16} className="text-zinc-400 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}

                {user && (
                  <Link
                    href="/dashboard/user/profile"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-bold px-3 py-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 flex items-center gap-2.5"
                  >
                    <FiUser size={16} className="text-zinc-400 shrink-0" />
                    My Profile
                  </Link>
                )}
              </div>

              {/* Action Trigger Buttons */}
              <div className="pt-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    {isLoggingOut ? <Spinner size="sm" color="white" /> : <FiLogOut size={16} />}
                    Log Out From Account
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { setMobileOpen(false); router.push("/auth/signin"); }}
                      className="border border-zinc-200 dark:border-zinc-800 font-bold text-zinc-700 dark:text-zinc-300 py-3 rounded-xl text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { setMobileOpen(false); router.push("/auth/signup")} }
                      className="bg-emerald-800 dark:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-opacity hover:opacity-95"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}