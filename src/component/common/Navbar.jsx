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
  FiCheckCircle,
} from "react-icons/fi";

import Image from "next/image";
import LightLogo from "../../img/Logo_White.png";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role;

  const dashboardRoutes = {
    user: "/dashboard",
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setDropdownOpen(false);
    setMobileOpen(false);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged Out", {
            description: "You have been successfully signed out.",
            variant: "flat",
            color: "success",
            indicator: <FiCheckCircle />,
          });

          router.push("/");
          router.refresh();
        },
        onError: () => setIsLoggingOut(false),
      },
    });
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-white dark:bg-zinc-950 shadow-md"
          : "bg-white/10 dark:bg-black/10 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

        {/* ================= LOGO (NO FULL RELOAD ISSUE FIXED) ================= */}
        <Link
          href="/"
          onClick={() => {
            setMobileOpen(false);
            setDropdownOpen(false);
          }}
          className="flex items-center"
        >
          <Image
            src={LightLogo}
            alt="logo"
            width={160}
            height={60}
            priority
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-green-500 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ================= DESKTOP RIGHT SIDE ================= */}
        <div className="hidden lg:flex items-center gap-4">

          {isPending || isLoggingOut ? (
            <Spinner size="sm" color="success" />
          ) : user ? (
            <div className="relative">

              {/* ================= USER BUTTON ================= */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900 transition"
              >

                {/* AVATAR */}
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0)}
                  </div>
                )}

                {/* NAME + WELCOME */}
                <div className="text-left hidden md:block">
                  <p className="text-[11px] text-gray-400 leading-none">
                    Welcome
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {user.name}
                  </p>
                </div>

                <FiChevronDown
                  className={`transition ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ================= DROPDOWN ================= */}
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
                        onClick={() => setDropdownOpen(false)}
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
              <Link href="/auth/signin" className="text-sm">
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

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
        >
          {mobileOpen ? <HiX size={26} /> : <HiOutlineMenuAlt3 size={26} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-t overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-4">

              {/* USER INFO MOBILE */}
              {user && (
                <div className="flex items-center gap-3 pb-3 border-b">
                  {user.image ? (
                    <img
                      src={user.image}
                      className="w-10 h-10 rounded-full"
                      alt="user"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-400">Welcome</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </div>
              )}

              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-700 dark:text-slate-200"
                >
                  {item.label}
                </Link>
              ))}

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
    </motion.header>
  );
}