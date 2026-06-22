"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@heroui/react";

import {
  FiClock,
  FiHeart,
  FiUser,
} from "react-icons/fi";

export default function RecipeCard({
  recipe,
}) {
  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-default-200 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          width={500}
          height={300}
          className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
        />

        {recipe.isFeatured && (
          <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
            {recipe.category}
          </span>

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
            {recipe.cuisineType}
          </span>
        </div>

        <h2 className="text-xl font-bold line-clamp-1">
          {recipe.recipeName}
        </h2>

        <div className="mt-4 flex flex-col gap-2 text-sm text-default-500">

          <div className="flex items-center gap-2">
            <FiUser />
            {recipe.authorName}
          </div>

          <div className="flex items-center gap-2">
            <FiClock />
            {recipe.preparationTime}
          </div>

          <div className="flex items-center gap-2">
            <FiHeart />
            {recipe.likesCount || 0} Likes
          </div>
        </div>

        <div className="mt-5">
          <Link href={`/recipes/${recipe._id}`}>
            <Button
              color="success"
              className="w-full"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}