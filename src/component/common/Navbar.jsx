"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenuAlt3,
  HiX,
} from "react-icons/hi";

import {
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

import Image from "next/image";
import LightLogo from "../../img/Logo_White.png";

import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { ThemeSwitcher } from "../Item/ThemeSwitcher";

// import { ThemeSwitcher } from "../components/theme-switcher";

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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setDropdownOpen(false);
    setMobileOpen(false);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged Out");
          router.push("/");
          
        router.refresh();
        },
        onError: () => setIsLoggingOut(false),
      },
    });
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900">
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
          <Image src={LightLogo} alt="logo" width={160} height={60} />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-sm font-medium transition group ${
                  isActive
                    ? "text-green-500"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {item.label}

                {/* UNDERLINE HOVER + ACTIVE */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-green-500 transition-all duration-300
                  ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">

          {/* ================= THEME SWITCHER (ALWAYS RIGHT) ================= */}
          <ThemeSwitcher />

          {isPending || isLoggingOut ? (
            <Spinner size="sm" color="success" />
          ) : user ? (
            <div className="relative">

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    className="w-9 h-9 rounded-full object-cover"
                    alt="user"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0)}
                  </div>
                )}

                <div className="text-left hidden md:block">
                  <p className="text-[11px] text-gray-400">Welcome</p>
                  <p className="text-sm font-semibold">
                    {user.name}
                  </p>
                </div>

                <FiChevronDown />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setDropdownOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border rounded-xl shadow-lg p-2"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 p-2 rounded hover:bg-slate-100 dark:hover:bg-zinc-800"
                      >
                        <FiUser />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded"
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/signin">
                <FiLogIn className="inline" /> Login
              </Link>

              <button
                onClick={() => router.push("/auth/signup")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                <FiUserPlus className="inline" /> Register
              </button>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
        >
          {mobileOpen ? <HiX size={26} /> : <HiOutlineMenuAlt3 size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-t overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-4">

              {/* THEME SWITCHER MOBILE */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Theme</span>
                <ThemeSwitcher />
              </div>

              {navLinks.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm ${
                      isActive ? "text-green-500" : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => router.push("/auth/signin")}
                    className="border py-2 rounded"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push("/auth/signup")}
                    className="bg-green-500 text-white py-2 rounded"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}