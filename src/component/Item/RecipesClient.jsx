"use client";

import { useEffect, useState } from "react";
import { Input, Spinner, Radio, RadioGroup, Button } from "@heroui/react";
import RecipeCard from "./RecipeCard";
import { ServerFetch } from "@/lib/Shared/Server";
import { BiSearch } from "react-icons/bi";
import { LuChefHat, LuSlidersHorizontal } from "react-icons/lu";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];
const difficulties = ["Beginner", "Intermediate", "Master Chef"];

export default function RecipesClient() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // FIX 1: ক্যাটাগরি সিলেকশন ট্র্যাক করার জন্য এটিকে স্ট্রিং হিসেবে ইনিশিয়ালাইজ করা হয়েছে
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search);
      }

      // FIX 2: প্রপারলি চেক করে ইউআরএল প্যারামিটারে ক্যাটাগরি অ্যাপেন্ড করা হচ্ছে
      if (selectedCategory) {
        params.append("category", selectedCategory);
      }

      const data = await ServerFetch(`/api/recipes?${params.toString()}`);
      setRecipes(data);
      setLoading(false);
    };

    fetchRecipes();
  }, [search, selectedCategory]); // এই দুটি চেঞ্জ হলেই অটোমেটিক পারফেক্ট ডেটা ফেচ হবে

  // FIX 3: হ্যান্ডেলার ফাংশনটি এখন শুধু স্টেট আপডেট করবে, কনফ্লিক্টিং এপিআই কল রিমুভ করা হয়েছে
  const handleCategory = (item) => {
    console.log(item, "handle");
    setSelectedCategory(item);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfb] dark:bg-zinc-950 transition-colors duration-300 w-full">
      
      {/* ATTRACTIVE LUXURY HERO BANNER SECTION */}
      <div className="w-full pt-10 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0b291e] via-[#071f16] to-[#030f0b] text-white p-10 md:p-16 relative shadow-2xl border border-emerald-950/40">
          
          {/* Subtle Graphic Glow and Patterns */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full filter blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-lime-500/5 rounded-full filter blur-[60px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold tracking-[0.3em] text-emerald-400 uppercase bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-900/50 inline-block">
              Browse Recipes
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight text-zinc-50">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">Culinary Library</span>
            </h1>
            
            <p className="text-zinc-400/90 max-w-xl mx-auto text-sm md:text-base font-sans font-medium">
              Discover thousands of chef-curated recipes designed for every skill level, dietary preference, and unforgettable taste.
            </p>
            
            {/* Search Input Box Box Styled inside Hero Banner */}
            <div className="max-w-md mx-auto pt-4">
              <Input
                className="w-full text-zinc-900 dark:text-white"
                classNames={{
                  inputWrapper: "h-14 bg-white/95 dark:bg-zinc-900 rounded-2xl px-5 shadow-xl border border-transparent focus-within:ring-2 focus-within:ring-emerald-500 transition-all duration-300",
                  input: "text-base text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 font-medium",
                }}
                value={search}
                startContent={<BiSearch size={22} className="text-zinc-400 mr-2 shrink-0" />}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for ingredients or dishes..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT LAYOUT (Sidebar + Grid Layout) */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDEBAR - FILTERS PANEL */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky top-28 bg-white dark:bg-zinc-900/60 p-6 rounded-[28px] border border-zinc-100 dark:border-zinc-900 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <LuSlidersHorizontal className="text-emerald-700 dark:text-emerald-400" size={16} />
                <h2 className="text-xs font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
                  Filters & Categories
                </h2>
              </div>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory("")}
                  className="text-xs font-bold text-rose-500 hover:underline transition-all"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Dynamic Category Group Selection */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block">
                Categories
              </span>
              <RadioGroup
                value={selectedCategory}
                classNames={{ wrapper: "space-y-1.5" }}
              >
                {categories.map((item) => (
                  <Radio
                    key={item}
                    value={item}
                    className="m-0 cursor-pointer w-full rounded-xl px-3 py-2.5 border border-transparent transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50 data-[selected=true]:bg-emerald-50 dark:data-[selected=true]:bg-emerald-950/30 data-[selected=true]:border-emerald-200 dark:data-[selected=true]:border-emerald-900/40"
                  >
                    <span className="text-sm w-full block font-semibold text-zinc-700 dark:text-zinc-300" onClick={()=>{
                      handleCategory(item)
                    }}>
                      {item}
                    </span>
                  </Radio>
                ))}
              </RadioGroup>
            </div>

            {/* Static Difficulty Design Layout (Image 4 Alignment) */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block">
                Difficulty
              </span>
              <div className="space-y-1">
                {difficulties.map((level) => (
                  <label 
                    key={level} 
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-zinc-400 dark:text-zinc-500 cursor-not-allowed opacity-60"
                  >
                    <div className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700" />
                    <span className="font-medium">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Button Block */}
            <Button 
              size="sm" 
              variant="flat"
              className="w-full h-10 rounded-xl font-bold text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => {
                setSearch("");
                setSelectedCategory("");
              }}
            >
              Clear All Filters
            </Button>
          </aside>

          {/* RIGHT SIDE - TITLE & DYNAMIC CARD GRID */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Header Result Bar */}
            <div className="flex flex-row justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <LuChefHat size={18} />
                </div>
                <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100">
                  {recipes.length} Recipes Found
                </h2>
              </div>
              
              <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900/60 px-3 py-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                Sorted by: <span className="text-emerald-700 dark:text-emerald-400 font-bold">Most Recent</span>
              </div>
            </div>

            {/* Content Display Switch Rendering */}
            <div>
              {loading ? (
                <div className="h-96 flex flex-col justify-center items-center gap-3">
                  <Spinner size="lg" color="success" />
                  <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase animate-pulse">
                    Filtering Recipes...
                  </span>
                </div>
              ) : recipes.length === 0 ? (
                <div className="rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 py-24 text-center bg-zinc-50/50 dark:bg-zinc-900/10 max-w-xl mx-auto">
                  <div className="text-5xl mb-4 filter grayscale opacity-75">🍲</div>
                  <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">No Recipes Matched</h3>
                  <p className="text-zinc-400 dark:text-zinc-500 mt-2 text-sm max-w-xs mx-auto">
                    We couldn't find anything matching your exact filter parameters. Try checking your keyword typo or swap categories!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}