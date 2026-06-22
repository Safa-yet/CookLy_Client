"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function MobileSidebar({ menuItems, user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-xl"
      >
        <HiMenuAlt3 />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-zinc-950 z-50 transform transition ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-green-500">RecipeHub</h2>
          <button onClick={() => setOpen(false)}>
            <HiX size={22} />
          </button>
        </div>

        {/* USER */}
        {user && (
          <div className="p-4 flex items-center gap-3 border-b">
            <img
              src={user.image}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {/* LINKS */}
        <div className="p-4 flex flex-col gap-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-700 dark:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}