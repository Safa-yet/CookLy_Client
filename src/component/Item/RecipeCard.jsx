"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FiClock, FiHeart, FiUser } from "react-icons/fi";

export default function RecipeCard({ recipe }) {
  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-[28px] overflow-hidden border border-zinc-100 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-emerald-200/60 dark:hover:border-emerald-950/40 transition-all duration-300 flex flex-col h-full">
      
      {/* IMAGE CONTAINER WITH GRADIENT OVERLAY */}
      <div className="relative overflow-hidden aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          width={500}
          height={375}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Floating Badge (Featured) */}
        {recipe.isFeatured && (
          <span className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
            Featured
          </span>
        )}

        {/* Hover subtle dark vignette on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* CARD BODY CONTENT */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Categories / Tags Section */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide">
              {recipe.category}
            </span>
            {recipe.cuisineType && (
              <span className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border border-zinc-100 dark:border-zinc-800">
                {recipe.cuisineType}
              </span>
            )}
          </div>

          {/* Recipe Title heading */}
          <h3 className="text-xl font-serif font-bold text-zinc-800 dark:text-zinc-100 tracking-tight line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {recipe.recipeName}
          </h3>

          {/* Meta Info Grid Row (Image 3 Style Setup) */}
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 grid grid-cols-3 gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 truncate">
              <FiUser className="text-zinc-400 shrink-0" size={14} />
              <span className="truncate">{recipe.authorName}</span>
            </div>

            <div className="flex items-center gap-1.5 justify-center">
              <FiClock className="text-zinc-400 shrink-0" size={14} />
              <span>{recipe.preparationTime}</span>
            </div>

            <div className="flex items-center gap-1.5 justify-end">
              <FiHeart className="text-rose-400 shrink-0 fill-rose-50/10" size={14} />
              <span>{recipe.likesCount || 0}</span>
            </div>
          </div>
        </div>

        {/* VIEW DETAILS ACTION BUTTON */}
        <div className="mt-6">
          <Link href={`/recipes/${recipe._id}`} className="block w-full">
            <Button
              className="w-full h-11 rounded-xl font-bold text-sm tracking-wide bg-emerald-800 dark:bg-emerald-700 text-white shadow-sm hover:bg-emerald-900 dark:hover:bg-emerald-600 transition-all duration-200"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}