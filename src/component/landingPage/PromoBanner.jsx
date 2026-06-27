"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function PromoBanner() {
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

  return (
    <section className="w-full px-6 py-12 bg-brand-cream dark:bg-zinc-950 transition-colors duration-300">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto bg-brand-dark dark:bg-zinc-900 rounded-[40px] overflow-hidden relative min-h-[220px] flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 shadow-2xl dark:shadow-black/40 border border-brand-bg-green/10 dark:border-zinc-800 transition-colors duration-300"
      >
        {/* Background Grid Accent Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Left Side: Image and Typography Content */}
        <div className="flex flex-col md:flex-row items-center gap-8 z-10 w-full lg:w-auto">
          {/* Next.js Optimized Image Wrapped with Framer Motion Layout */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/20 dark:border-zinc-700/50 shadow-xl relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"
              alt="Delicious Salad Special Offer"
              fill
              sizes="(max-w-768px) 128px, 160px"
              className="object-cover"
            />
          </motion.div>
          
          <div className="text-center md:text-left flex-1">
            <span className="text-xs uppercase tracking-widest text-brand-lime dark:text-brand-light font-bold font-sans">
              Special Offer
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif text-white dark:text-zinc-100 mt-2 mb-3 font-medium tracking-tight leading-tight">
              Get 20% Off On Your First Order!
            </h2>
            
            <p className="text-white/80 dark:text-zinc-400 text-base font-sans max-w-xl leading-relaxed">
              Join Cookly and enjoy delicious food at a special welcome price. Explore premium dishes right now.
            </p>
            
            <div className="mt-6 flex justify-center md:justify-start">
              <Button 
                endContent={<FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
                className="group bg-brand-lime dark:bg-brand-dark hover:opacity-90 text-white font-sans font-semibold px-8 py-6 text-sm rounded-xl transition-all duration-300 shadow-md"
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Round Badge Decorator */}
        <div className="hidden lg:flex items-center justify-center z-10 pr-6 pl-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-36 h-36 rounded-full border-2 border-dashed border-white/30 dark:border-zinc-700 flex flex-col items-center justify-center text-white dark:text-zinc-300 relative bg-white/5 dark:bg-zinc-800/20 backdrop-blur-sm"
          >
            <span className="text-4xl font-serif font-bold tracking-tight">20%</span>
            <span className="text-xs uppercase tracking-widest font-sans opacity-80 mt-0.5">Off</span>
            
            {/* Minimal Vector Path for Visual Balance */}
            <svg className="absolute -bottom-6 -left-12 w-16 h-12 text-white/30 dark:text-zinc-600 transform -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}