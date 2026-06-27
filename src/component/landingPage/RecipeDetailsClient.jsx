"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Chip, Divider } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  FiHeart, 
  FiFlag, 
  FiClock, 
  FiStar, 
  FiShoppingCart, 
  FiUser, 
  FiBookOpen, 
  FiGlobe, 
  FiAward,
  FiShield,
  FiEdit3
} from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { addFavorite, likeRecipe } from "@/lib/actions/recipe";
import ReportModal from "../Item/ReportModal";

export default function RecipeDetailsClient({ recipe, user, id }) {
  const router = useRouter();
  
  const isOwner = user && user.id === recipe.authorId;
  const isAdmin = user && user.role === "admin";

  // UX Interactive States (On-click UI feedback)
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(recipe.likesCount || 0);

  const handleLike = async () => {
    try {
      if (!user) {
        router.push(`/auth/signin?redirect=/recipes/${recipe._id}`);
        return toast.error("Please Login To Like Recipe");
      }
      
      await likeRecipe(id);
      
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
        toast.success("Recipe Liked ❤️");
      } else {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      }

      router.refresh();
    } catch {
      toast.error("Failed to update like status");
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) {
        router.push(`/auth/signin?redirect=/recipes/${recipe._id}`);
        return toast.error("Please Login To Favorite Recipe");
      }
      
      const data = {
        authorId: user.id,
        authorEmail: user.email,
        recipeId: recipe._id,
        recipeName: recipe.recipeName,
        recipeImage: recipe.recipeImage,
        likesCount: recipe.likesCount,
        category: recipe.category,
        recipePrice: recipe.recipePrice,
      };

      await addFavorite(data);
      setIsFavorited(true);
      toast.success("Added To Favorites ❤️");
    } catch {
      toast.error("Failed to add to favorites");
    }
  };

  return (<div className="w-full px-4 md:px-6 pt-8 pb-20 bg-[#fdfdfb] dark:bg-zinc-950 min-h-screen transition-colors">



    <section className="max-w-7xl mx-auto  font-sans  duration-300">
      
      {/* 1. ADMIN MODE BANNER NOTIFICATION */}
      {isAdmin && (
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 dark:border-amber-500/20 flex items-center gap-3.5 text-amber-800 dark:text-amber-400"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <FiShield size={20} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold tracking-wide">Administrator Oversight Activated</h4>
            <p className="text-xs opacity-90 mt-0.5">
              You are viewing this recipe with admin privileges. You can monitor user flags, reviews, and transaction logs.
            </p>
          </div>
        </motion.div>
      )}

      {/* 2. OWNER DASHBOARD NOTICE */}
      {isOwner && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 text-emerald-800 dark:text-emerald-400 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400">
              <FiEdit3 size={22} />
            </div>
            <div>
              <h4 className="text-base font-bold font-serif">You Own This Masterpiece</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Manage performance metrics, read student reviews, and update recipe content directly.
              </p>
            </div>
          </div>
          <Button
            variant="solid"
            startContent={<FiEdit3 size={16} />}
            className="bg-emerald-800 dark:bg-emerald-700 hover:opacity-95 text-white font-bold rounded-xl px-6 h-11 w-full sm:w-auto shadow-md"
            onClick={() => router.push(`/dashboard/user/recipes/${recipe._id}/edit`)}
          >
            Edit Recipe Content
          </Button>
        </motion.div>
      )}

      {/* TWO COLUMN MASTER GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: HERO CONTAINER, METRIC BADGES, INGREDIENTS & STEPS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* IMAGE BANNER CONTAINER */}
          <div className="relative rounded-[40px] overflow-hidden group shadow-2xl bg-zinc-900 aspect-[16/10] md:aspect-[16/9] w-full border border-zinc-100 dark:border-zinc-900">
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              fill
              priority
              className="object-cover group-hover:scale-101 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white space-y-4 w-full">
              <span className="bg-emerald-700/95 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-md inline-block">
                {recipe.category || "Exclusive Recipe"}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-none text-white drop-shadow-md text-left">
                {recipe.recipeName}
              </h1>

              <p className="text-zinc-300 font-medium text-sm md:text-base max-w-2xl opacity-90 line-clamp-2 text-left leading-relaxed">
                A carefully balanced, artisan culinary template crafted and shared by <span className="text-emerald-400 font-bold">{recipe.authorName}</span>. Perfect for culinary enthusiasts looking to perfect their skills.
              </p>
            </div>
          </div>

          {/* QUICK STATISTICS & VIEW-ONLY ACTIONS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-5 rounded-3xl shadow-sm">
            <div className="flex items-center gap-6">
              
              {/* Like Controller (Conditional View / Interactive Action based on ownership) */}
              {isOwner ? (
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-300">
                  <FaHeart className="text-rose-500" size={17} />
                  <span>{likesCount} Likes</span>
                </div>
              ) : (
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors group"
                >
                  {isLiked ? (
                    <FaHeart className="text-rose-500 scale-110 transition-transform" size={17} />
                  ) : (
                    <FiHeart className="text-zinc-400 group-hover:text-rose-500" size={17} />
                  )}
                  <span>{likesCount} Likes</span>
                </button>
              )}

              {/* Save Controller */}
              {isOwner ? (
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-300">
                  <FaStar className="text-amber-500" size={17} />
                  <span>Pinned Recipe</span>
                </div>
              ) : (
                <button 
                  onClick={handleFavorite}
                  className={`flex items-center gap-2 text-sm font-bold transition-colors group ${
                    isFavorited ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-300 hover:text-emerald-700"
                  }`}
                >
                  {isFavorited ? (
                    <FaStar className="text-amber-500 scale-110 transition-transform" size={17} />
                  ) : (
                    <FiStar className="text-zinc-400 group-hover:text-emerald-700" size={17} />
                  )}
                  <span>{isFavorited ? "Saved" : "Save"}</span>
                </button>
              )}

              {/* Flag Modal Trigger */}
              {!isOwner && (
                <div className="text-zinc-600 dark:text-zinc-300 hover:text-rose-600 font-bold text-sm transition-colors cursor-pointer flex items-center gap-1.5">
                  <FiFlag size={16} className="text-zinc-400" />
                  <ReportModal recipe={recipe} user={user} />
                </div>
              )}
            </div>

            {/* Float Action CTA Purchase for Non-Owners */}
            {!isOwner && (
              <form action="/api/payment" method="POST">
                <input type="hidden" name="recipe_id" value={recipe._id} />
                <input type="hidden" name="recipe_name" value={recipe.recipeName} />
                <input type="hidden" name="recipe_price" value={recipe.recipePrice} />
                <Button
                  type="submit"
                  size="md"
                  className="bg-[#042f1e] dark:bg-emerald-800 text-white font-bold rounded-2xl px-6 h-11 shadow-sm text-xs"
                  startContent={<FiShoppingCart size={14} />}
                >
                  PURCHASE GUIDE — ${recipe.recipePrice || "4.99"}
                </Button>
              </form>
            )}
          </div>

          {/* INGREDIENTS MATRIX GRID */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 p-6 md:p-10 rounded-[36px] shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-2.5">
              <FiBookOpen className="text-emerald-700 dark:text-emerald-400" size={22} />
              Ingredients Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipe.ingredients?.split("\n")?.map((ingredient, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#fbfbfa] dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900/80 hover:border-emerald-100 dark:hover:border-emerald-950 transition-colors text-left"
                >
                  <div className="w-5 h-5 rounded-md border-2 border-emerald-600/30 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 bg-emerald-700 dark:bg-emerald-400 rounded-full" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {ingredient}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DETAILED DIRECTIONS SECTION */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 p-6 md:p-10 rounded-[36px] shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-800 dark:text-zinc-100 mb-6">
              Step-by-Step Instructions
            </h2>
            <div className="bg-[#fbfbfa] dark:bg-zinc-950/40 p-6 md:p-8 rounded-[24px] border border-zinc-100 dark:border-zinc-900/80 text-left">
              <p className="leading-8 text-sm md:text-base font-medium text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                {recipe.instructions}
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DETAIL TABLE & ACTIONS FOR GENERAL PUBLIC */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          
          {/* STATIC DETAILED METRICS CARD */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 rounded-[32px] p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4 text-left">
              Recipe Details
            </h3>
            
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                  <FiClock size={16} className="text-zinc-400" />
                  <span>Prep Time</span>
                </div>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{recipe.preparationTime || "25 Mins"}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                  <FiGlobe size={16} className="text-zinc-400" />
                  <span>Cuisine Type</span>
                </div>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{recipe.cuisineType || "International"}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                  <FiAward size={16} className="text-zinc-400" />
                  <span>Difficulty</span>
                </div>
                <Chip 
                  size="sm" 
                  className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-900/40 rounded-lg px-2.5"
                >
                  {recipe.difficultyLevel || "Intermediate"}
                </Chip>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                  <FiBookOpen size={16} className="text-zinc-400" />
                  <span>Category</span>
                </div>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{recipe.category}</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC ACTIONS CONTAINER - ONLY VISIBLE TO NON-OWNER USERS */}
          {!isOwner && (
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 rounded-[32px] p-6 shadow-sm space-y-3.5">
              <h3 className="font-serif font-bold text-sm text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 text-left">
                Interactive Portal
              </h3>

              <Button
                fullWidth
                color="danger"
                variant={isLiked ? "solid" : "flat"}
                className={`h-12 rounded-xl font-bold tracking-wide transition-all ${
                  isLiked ? "bg-rose-600 text-white shadow-md" : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400"
                }`}
                startContent={isLiked ? <FaHeart /> : <FiHeart />}
                onPress={handleLike}
              >
                {isLiked ? "Recipe Liked" : "Like Recipe"}
              </Button>

              <Button
                fullWidth
                variant={isFavorited ? "solid" : "flat"}
                className={`h-12 rounded-xl font-bold tracking-wide transition-all ${
                  isFavorited ? "bg-amber-500 text-zinc-950 shadow-md" : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                }`}
                startContent={isFavorited ? <FaStar /> : <FiStar />}
                onPress={handleFavorite}
              >
                {isFavorited ? "Pinned in Favorites" : "Add To Favorite"}
              </Button>

              {/* <Divider className="my-2 bg-zinc-100 dark:bg-zinc-800" /> */}

              <form action="/api/payment" method="POST">
                <input type="hidden" name="recipe_id" value={recipe._id} />
                <input type="hidden" name="recipe_name" value={recipe.recipeName} />
                <input type="hidden" name="recipe_price" value={recipe.recipePrice} />
                <Button
                  type="submit"
                  fullWidth
                  className="bg-[#00B96D] hover:bg-[#00a360] text-white font-bold h-12 rounded-xl shadow-md transition-colors"
                  startContent={<FiShoppingCart size={18} />}
                >
                  Purchase Recipe Guide
                </Button>
              </form>
            </div>
          )}

          {/* CHEF'S NOTE & GOURMET HIGHLIGHTS CONTAINER */}
          <div className="bg-[#05291b] text-zinc-100 rounded-[32px] p-6 shadow-xl space-y-4 border border-emerald-950">
            <div>
              <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest text-left">
                Chef's Tip & Insights
              </h4>
              <p className="text-zinc-300 text-xs md:text-sm italic font-medium leading-relaxed mt-2.5 text-left">
                "Always measure your ingredients carefully before prepping. Perfect temperature sync and fresh aromatic spices are the core secrets behind creating a top-tier premium dish."
              </p>
            </div>
            
            {/* <Divider className="bg-emerald-900/60" /> */}
            
            {/* AUTHOR INBOX DETAILS */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm">
                <FiUser size={18} />
              </div>
              <div className="truncate text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Curated By</p>
                <h4 className="font-serif font-bold text-sm text-white truncate">{recipe.authorName}</h4>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{recipe.authorEmail}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  </div>
  );
}