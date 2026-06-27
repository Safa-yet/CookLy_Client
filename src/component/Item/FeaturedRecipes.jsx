'use client';

import { Card, Chip, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiArrowRight, FiClock, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FeaturedRecipes = ({ recipes }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="w-full px-6 py-16 bg-brand-cream dark:bg-zinc-950 text-brand-cream-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section from image_2a6b17.jpg */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-cream-foreground flex items-center justify-center gap-2">
            Featured Recipes <span className="text-2xl">🌿</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-brand-white-foreground dark:text-zinc-400 font-sans text-base md:text-lg">
            Easy, nourishing meals made with real ingredients you'll love.
          </p>
        </div>

        {/* Dynamic Responsive Grid Layout synced with design guidelines */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8"
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
                
                {/* Image & Floating Overlays Layout */}
                <Card.Header className="relative p-0 aspect-[4/3] w-full overflow-hidden bg-transparent">
                  <div className="w-full h-full relative">
                    <Image
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      fill
                      sizes="(max-w-768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Left Side Floating Time Badge from image_2a6b17.jpg */}
                  <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md flex flex-col items-center justify-center text-center border border-zinc-100/50 dark:border-zinc-800">
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                      {recipe.preparationTime?.replace(/[^0-9]/g, '') || '15'}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider mt-0.5">
                      min
                    </span>
                  </div>

                  {/* Right Side Floating Favorite Trigger Button */}
                  <div className="absolute top-4 right-4 z-10">
                    <button className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-md flex items-center justify-center text-zinc-400 hover:text-danger dark:hover:text-danger transition-colors">
                      <FiHeart size={16} />
                    </button>
                  </div>
                </Card.Header>

                {/* Card Content Architecture */}
                <Card.Content className="p-6 flex-1 bg-transparent flex flex-col justify-between text-left">
                  <div>
                    <Card.Title className="text-2xl font-sans font-bold text-brand-cream-foreground dark:text-zinc-100 tracking-tight line-clamp-1">
                      {recipe.recipeName}
                    </Card.Title>
                    
                    <Card.Description className="text-sm text-brand-white-foreground dark:text-zinc-400 font-sans mt-2 line-clamp-3 leading-relaxed">
                      Enjoy this authentic {recipe.cuisineType || 'homemade'} recipe curated carefully by Cookly. Packed with raw, nutritious ingredients to fuel your workflow.
                    </Card.Description>

                    {/* Metadata Badges: Prep Details */}
                    <div className="flex items-center gap-4 mt-4 text-xs text-brand-text-light dark:text-zinc-500 font-medium font-sans">
                      <span className="flex items-center gap-1">
                        <FiClock size={13} /> {recipe.preparationTime || '15 mins'}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span>{recipe.cuisineType || 'Global'}</span>
                    </div>
                  </div>

                  {/* Minimal Categorization Chips at the Bottom as per image_2a6b17.jpg */}
                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-100 dark:border-zinc-800/60">
                    <Chip 
                      variant="flat" 
                      className="bg-brand-bg-green/50 dark:bg-zinc-800 text-brand-dark dark:text-zinc-300 text-xs font-semibold px-2.5 py-1 rounded-lg"
                    >
                      {recipe.category || 'Healthy'}
                    </Chip>
                  </div>
                </Card.Content>

                {/* Card Footer Redirect Action */}
                <Card.Footer className="px-6 pb-6 pt-0 bg-transparent">
                  <Link
                    href={`/recipes/${recipe._id}`}
                    className="w-full py-3 px-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 text-sm font-sans font-semibold text-brand-cream-foreground dark:text-zinc-200 hover:bg-brand-dark hover:text-white dark:hover:bg-zinc-800 transition-all duration-300"
                  >
                    View Recipe Details
                    <FiArrowRight size={16} />
                  </Link>
                </Card.Footer>

              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore All Link Footer */}
        <div className="flex justify-end mt-10">
          <Button
            variant="light"
            endContent={<FiArrowRight />}
            className="text-brand-cream-foreground hover:opacity-80 font-sans font-semibold text-sm flex items-center gap-1"
          >
            Explore All Recipes
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedRecipes;