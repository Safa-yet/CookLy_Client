"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { PiLeafBold } from "react-icons/pi";

export default function HeroBanner() {
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerContainer = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stats = [
    {
      value: "10K+",
      label: "Recipes",
    },
    {
      value: "5K+",
      label: "Food Lovers",
    },
    {
      value: "2K+",
      label: "Premium Members",
    },
    {
      value: "50K+",
      label: "Favorites",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-cream dark:bg-zinc-950 transition-colors duration-300 w-full">
      {/* Background Blur */}
      <div className="absolute top-0 right-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-brand-bg-green opacity-40 sm:opacity-60 blur-3xl dark:bg-brand-dark pointer-events-none"></div>

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-12 lg:gap-16 px-6 py-12 lg:grid-cols-2">
        {/* Left Side */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="z-10 order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-bg-green px-4 py-2 dark:bg-zinc-800"
          >
            <PiLeafBold className="text-lg text-brand-lime" />
            <span className="text-sm font-medium text-brand-dark dark:text-zinc-200">
              Discover Amazing Recipes
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-brand-text-main dark:text-white tracking-tight"
          >
            Cook.
            <br />
            Share.
            <br />
            <span className="text-brand-lime">Inspire.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-brand-text-muted dark:text-zinc-400"
          >
            Discover thousands of delicious recipes from passionate food lovers
            around the world. Share your creations, save favorites, and unlock
            premium culinary experiences.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="mb-12 flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-7 py-4 font-semibold text-white transition-all duration-300 hover:opacity-90 w-full sm:w-auto">
              Explore Recipes
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button className="rounded-xl border border-brand-dark px-7 py-4 font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-dark hover:text-white dark:border-zinc-700 dark:text-white w-full sm:w-auto">
              Share Recipe
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 gap-6 border-t border-brand-text-light/20 pt-8 dark:border-zinc-800 md:grid-cols-4"
          >
            {stats.map((item) => (
              <motion.div
                variants={fadeInUp}
                key={item.label}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark dark:text-white">
                  {item.value}
                </h3>

                <p className="text-xs sm:text-sm text-brand-text-muted dark:text-zinc-400 mt-1">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Enhanced Responsive Wrapper */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 px-4 sm:px-10 my-6 lg:my-0">
          {/* Main Image Container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.8,
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              },
            }}
            className="relative aspect-square w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[500px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop"
              alt="Recipe Food"
              fill
              priority
              className="rounded-[32px] sm:rounded-[40px] object-cover shadow-2xl dark:shadow-black/50"
            />
          </motion.div>

          {/* Premium Card - Responsive Scaled & Positioned */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="absolute -right-2 sm:right-4 lg:-right-4 top-0  w-44 sm:w-56 rounded-2xl sm:rounded-3xl border border-brand-bg-green bg-brand-white p-3 sm:p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 text-left"
          >
            <p className="text-[10px] sm:text-sm text-brand-text-muted dark:text-zinc-400 font-medium">
              Premium Recipes
            </p>

            <h4 className="text-sm sm:text-lg font-bold text-brand-text-main dark:text-white mt-0.5 leading-snug">
              500+ Exclusive Recipes
            </h4>

            <p className="mt-1 sm:mt-2 text-xs sm:text-base font-semibold text-brand-lime">
              Starting at $2.99
            </p>
          </motion.div>

          {/* Review Card - Responsive Scaled & Positioned */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.7,
            }}
            className="absolute -bottom-8 left-0 sm:left-4 lg:-left-4 rounded-2xl sm:rounded-3xl border border-brand-bg-green bg-brand-white p-3 sm:p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 text-left"
          >
            <div className="mb-1 sm:mb-2 flex items-center gap-0.5 text-brand-yellow">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={12}
                  className="sm:w-[14px] sm:h-[14px]"
                />
              ))}
            </div>

            <h4 className="text-sm sm:text-lg font-bold text-brand-text-main dark:text-white">
              4.9 Rating
            </h4>

            <p className="text-[10px] sm:text-sm text-brand-text-muted dark:text-zinc-400 mt-0.5">
              Based on 4,800+ Reviews
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}