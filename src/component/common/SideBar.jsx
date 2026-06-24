"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  FiGrid,
  FiFileText,
  FiFolder,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiSettings,
  FiChevronRight,
  FiBookOpen,
  FiHeart,
  FiPlusCircle,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import MobileSidebar from "./MobileSidebar";
import { FcInTransit } from "react-icons/fc";
// import MobileSidebar from "./MobileSidebar";

export default function SideBar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const role = user?.role;

  // ================= ROLE BASED LINKS =================
  const userLinks = [
    { name: "Dashboard", icon: FiGrid, path: "/dashboard/user" },
    { name: "My Recipes", icon: FiBookOpen, path: "/dashboard/user/my-recipes" },
    { name: "Add Recipe", icon: FiPlusCircle, path: "/dashboard/user/add-recipe" },
    { name: "Purchased Recipe", icon: FcInTransit, path: "/dashboard/user/purchased" },
    { name: "Favorites", icon: FiHeart, path: "/dashboard/user/favorites" },
    { name: "Profile", icon: FiUsers, path: "/dashboard/user/profile" },
  ];

  const adminLinks = [
    { name: "Dashboard", icon: FiGrid, path: "/dashboard/admin" },
    { name: "Manage Users", icon: FiUsers, path: "/dashboard/admin/users" },
    { name: "Manage Recipes", icon: FiFileText, path: "/dashboard/admin/recipes" },
    { name: "Reports", icon: FiBarChart2, path: "/dashboard/admin/reports" },
    { name: "Categories", icon: FiFolder, path: "/dashboard/categories" },
    { name: "Settings", icon: FiSettings, path: "/dashboard/settings" },
  ];

  const menuItems = role === "admin" ? adminLinks : userLinks;

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <MobileSidebar menuItems={menuItems} user={user} />

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
        hidden lg:flex
        w-72 h-[calc(100vh-80px)]
        sticky top-20
        flex-col justify-between
        bg-white dark:bg-zinc-950
        border-r border-zinc-200 dark:border-zinc-900
        px-4 py-6
        shadow-lg rounded-lg
        "
      >
        {/* TOP SECTION */}
        <div>
          <h1 className="text-2xl font-bold text-green-500 px-2 mb-6">
            RecipeHub
          </h1>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.path ||
                pathname.startsWith(item.path);

              return (
                <Link key={item.name} href={item.path}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`relative flex items-center justify-between px-4 py-3 rounded-xl transition
                      ${
                        isActive
                          ? "bg-green-500 text-white"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-lg" />
                      <span className="text-sm font-medium">
                        {item.name}
                      </span>
                    </div>

                    <FiChevronRight />

                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-green-500 rounded-xl -z-10"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* USER INFO */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-3">
            {user?.image ? (
              <img
                src={user.image}
                className="w-10 h-10 rounded-full object-cover"
                alt="user"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}

            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">
                {user?.name || "Guest"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}