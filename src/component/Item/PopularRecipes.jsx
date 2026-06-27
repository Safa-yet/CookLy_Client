"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { FiHeart, FiArrowRight, FiAward } from "react-icons/fi";
import { motion } from "framer-motion";

export default function PopularRecipes({ recipes }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full px-6 py-16 bg-brand-cream dark:bg-zinc-950 text-brand-cream-foreground transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Aligned perfectly with image_2a0a5a.jpg styling */}
        <div className="flex flex-col mb-8">
          <span className="text-xs uppercase tracking-widest text-brand-text-light dark:text-zinc-500 font-semibold font-sans">
            Popular Dishes
          </span>
          <div className="flex justify-between items-end mt-2">
            <h2 className="text-4xl font-serif font-bold text-brand-cream-foreground">
              Our Most Loved Dishes
            </h2>
            <Button
              variant="light"
              endContent={<FiArrowRight />}
              className="text-brand-cream-foreground hover:opacity-80 font-sans font-medium text-sm hidden md:flex items-center gap-1"
            >
              View Full Menu
            </Button>
          </div>
        </div>

        {/* Recipes Grid with Stagger Entry Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
        >
          {recipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full"
            >
              <Card className="group bg-brand-white dark:bg-zinc-900 border border-brand-bg-green/30 dark:border-zinc-800/80 rounded-[32px] overflow-hidden shadow-xl dark:shadow-black/30 h-full flex flex-col justify-between transition-colors duration-300">
                
                {/* Card Header: Next.js Optimized Image & Action Button Overlay */}
                <Card.Header className="relative p-0 aspect-[4/3] w-full overflow-hidden bg-transparent">
                  <div className="w-full h-full relative">
                    <Image
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      fill
                      sizes="(max-w-768px) 100vw, 300px"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Top Right Round Floating Action Like Trigger */}
                  <div className="absolute top-4 right-4 z-10">
                    <button className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-md flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-danger dark:hover:text-danger transition-colors">
                      <FiHeart size={16} className={recipe.likesCount > 0 ? "fill-current text-danger" : ""} />
                    </button>
                  </div>
                </Card.Header>

                {/* Card Content: Title, Description & Metadata */}
                <Card.Content className="p-5 flex-1 bg-transparent flex flex-col justify-between text-left">
                  <div className="space-y-1.5">
                    <Card.Title className="text-xl font-sans font-bold text-brand-cream-foreground dark:text-zinc-100 tracking-tight line-clamp-1">
                      {recipe.recipeName}
                    </Card.Title>
                    
                    <Card.Description className="text-sm text-brand-white-foreground dark:text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                      Deliciously prepared dish by <span className="font-medium text-brand-lime dark:text-brand-light">{recipe.authorName}</span> classified under {recipe.category}.
                    </Card.Description>
                  </div>
                </Card.Content>

                {/* Card Footer: Metrics & Interactive View Details CTA Button */}
                <Card.Footer className="px-5 pb-5 pt-2 bg-transparent flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-xs uppercase tracking-wider text-brand-text-light dark:text-zinc-500 font-sans font-semibold">
                      Community Rating
                    </span>
                    <span className="text-base font-bold text-brand-cream-foreground dark:text-white flex items-center gap-1 mt-0.5">
                      ❤️ {recipe.likesCount} <span className="text-xs text-brand-text-light font-normal">likes</span>
                    </span>
                  </div>

                  <Link
                    href={`/recipes/${recipe._id}`}
                    className="w-10 h-10 rounded-full bg-brand-dark dark:bg-brand-lime text-white dark:text-zinc-950 flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                  >
                    <FiArrowRight size={18} />
                  </Link>
                </Card.Footer>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}