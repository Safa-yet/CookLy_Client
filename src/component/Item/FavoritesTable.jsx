"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@heroui/react";

import { FiHeart, FiTrash2, FiEye } from "react-icons/fi";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FavoriteRemoveModal from "./FavoriteRemoveModal";

export default function FavoritesTable({ favorites }) {
  if (!favorites?.length) {
    return (
      <div className="bg-background text-foreground rounded-3xl p-16 text-center border">
        <div className="w-24 h-24 bg-red-50 rounded-full mx-auto flex items-center justify-center">
          <FiHeart className="text-4xl text-red-500" />
        </div>

        <h2 className="text-3xl font-bold mt-6">No Favorite Recipes</h2>

        <p className="text-gray-500 mt-3">
          You haven't added any recipes to favorites yet.
        </p>

        <Link href="/recipes">
          <Button className="mt-8 bg-[#00B96D] text-white">
            Browse Recipes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground rounded-3xl shadow-sm p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#091E21]">Saved Recipes</h2>

          <p className="text-gray-500 mt-1">All your favorite recipes</p>
        </div>

        <div className="bg-red-50 text-red-500 px-5 py-3 rounded-2xl font-semibold">
          {favorites.length} Favorites
        </div>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item._id}
            className="border rounded-3xl overflow-hidden hover:shadow-lg transition"
          >
            <Image
              src={item.recipeImage}
              alt={item.recipeName}
              width={500}
              height={300}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-bold text-[#091E21]">
                {item.recipeName}
              </h3>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                  {item.category}
                </span>

                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                  ${item.recipePrice}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                ❤️ {item.likesCount} Likes
              </div>

              <div className="flex gap-3 mt-6">
                <Link href={`/recipes/${item.recipeId}`} className="flex-1">
                  <Button
                    fullWidth
                    className="bg-[#00B96D] text-white"
                    startContent={<FiEye />}
                  >
                    View
                  </Button>
                </Link>
                <FavoriteRemoveModal favorite={item} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
