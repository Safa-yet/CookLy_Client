"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button, Chip, Divider } from "@heroui/react";

import {
  FiHeart,
  FiFlag,
  FiClock,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";

import toast from "react-hot-toast";
import { redirectToLogin } from "@/lib/Reuseable/common";
import { addFavorite, likeRecipe } from "@/lib/actions/recipe";
import ReportModal from "../Item/ReportModal";

export default function RecipeDetailsClient({ recipe, user ,id}) {
  const router = useRouter();

  const isOwner = user && user.id === recipe.authorId;

  const handleLike = async () => {
    try {
      if (!user) {
        router.push(`/auth/signin?redirect=/recipes/${recipe._id}`);
        toast.error("Please Login To Like Recipe");
      }
      // TODO:
      await likeRecipe(id)

      toast.success("Recipe Liked ❤️");

      router.refresh();
    } catch {
      toast.error("Failed");
    }
  };

  const handleFavorite = async() => {
    try {
      if (!user) {
         router.push(`/auth/signin?redirect=/recipes/${recipe._id}`);
        toast.error("Please Login To Favorite Recipe");
      }
    const data = {
      authorId: user.id,
      authorEmail: user.email,
      recipeId: recipe._id,
      recipeName:recipe.recipeName,
      recipeImage:recipe.recipeImage,
      likesCount:recipe.likesCount,
      category:recipe.category,
      recipePrice:recipe.recipePrice,

    };

    const result =
      await addFavorite(data);

      toast.success("Added To Favorites ❤️");
    } catch {
      toast.error("Failed");
    }
  };

  // const handleReport = async () => {
  //   try {
  //       if (!user) {
  //        router.push(`/auth/signin?redirect=/recipes/${recipe._id}`);
  //       toast.error("Please Login To Report Recipe");
  //     }
  //     // TODO:
  //     // Open HeroUI Modal

  //     toast.success("Report Modal Open");
  //   } catch {
  //     toast.error("Failed");
  //   }
  // };

  const handlePurchase = async () => {
    try {
      if (!user) {
         router.push(`/auth/signin?redirect=/recipes/${recipe._id}`);
        toast.error("Please Login To Purchase Recipe");
      }
      // TODO:
      // Stripe Checkout

      toast.success("Redirecting To Checkout");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">

      {/* Hero */}


{isOwner && (
        <div className="flex justify-end mb-4">
          <Button
            variant="flat"
            color="primary"
            onClick={() => router.push(`/dashboard/user/recipes/${recipe._id}/edit`)}
          >
            Edit Recipe
          </Button>
        </div>
      )}
      <div className="relative rounded-4xl overflow-hidden">
        <div className="relative h-[250px] md:h-[450px]">
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-0 left-0 p-8 text-white">
            <Chip color="success" variant="flat">
              {recipe.category}
            </Chip>

            <h1 className="text-3xl md:text-5xl font-bold mt-4">
              {recipe.recipeName}
            </h1>

            <p className="mt-3 text-white/80">Created by {recipe.authorName}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        {/* LEFT */}

        <div className="lg:col-span-2 space-y-8">
          {/* Info */}

          <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Recipe Information</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-default-100 rounded-2xl p-4">
                <p className="text-sm text-default-500">Cuisine</p>

                <h4 className="font-semibold">{recipe.cuisineType}</h4>
              </div>

              <div className="bg-default-100 rounded-2xl p-4">
                <p className="text-sm text-default-500">Difficulty</p>

                <h4 className="font-semibold">{recipe.difficultyLevel}</h4>
              </div>

              <div className="bg-default-100 rounded-2xl p-4">
                <p className="text-sm text-default-500">Preparation</p>

                <h4 className="font-semibold flex items-center gap-2">
                  <FiClock />
                  {recipe.preparationTime}
                </h4>
              </div>
            </div>
          </div>

          {/* Ingredients */}

          <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Ingredients</h2>

            <div className="space-y-3">
              {recipe.ingredients?.split("\n")?.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />

                  <p>{ingredient}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}

          <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Instructions</h2>

            <p className="leading-8 text-default-600 whitespace-pre-line">
              {recipe.instructions}
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}

        <div>
          <div className="sticky top-24 bg-white dark:bg-zinc-900 border rounded-3xl p-6">
            <h3 className="font-bold text-xl mb-4">Recipe Actions</h3>

            {/* <Divider /> */}

            <div className="py-5">
              <div className="flex items-center gap-2">
                <FiHeart className="text-red-500" />

                <span className="font-medium">{recipe.likesCount} Likes</span>
              </div>
            </div>

{isOwner ? <>
<div className="flex justify-end mb-4">
         <h1>THis is not for owners</h1>
        </div>
</>

        
       :
      <>
            <div className="space-y-3">
              <Button
                fullWidth
                color="danger"
                variant="flat"
                startContent={<FiHeart />}
                onPress={handleLike}
              >
                Like Recipe
              </Button>

              <Button
                fullWidth
                color="success"
                variant="flat"
                startContent={<FiStar />}
                onPress={handleFavorite}
              >
                Add To Favorite
              </Button>

             <ReportModal recipe={recipe} user={user} />
 <form
          action="/api/payment"
          method="POST"
        >
          <input
            type="hidden"
            name="recipe_id"
            value={recipe._id} 
          />
          <input
            type="hidden"
            name="recipe_name"
            value={recipe.recipeName} 
          />
          <input
            type="hidden"
            name="recipe_price"
            value={recipe.recipePrice} 
          />


              <Button
              type="submit"
                fullWidth
                className="bg-[#00B96D] text-white"
                startContent={<FiShoppingCart />}
              >
                Purchase Recipe
              </Button>
        </form>
            </div>
      
      </>}

            {/* <Divider className="my-5" /> */}

            <div>
              <p className="text-sm text-default-500">Author</p>

              <h4 className="font-semibold">{recipe.authorName}</h4>

              <p className="text-sm text-default-500 mt-1">
                {recipe.authorEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
