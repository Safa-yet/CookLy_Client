"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiPlay, FiArrowRight } from "react-icons/fi";
import { FaRegCompass, FaTruckFast, FaStar } from "react-icons/fa6";
import { PiLeafBold } from "react-icons/pi";
import { LuBadgeCheck } from "react-icons/lu";

export default function HeroBanner() {
  // Framer Motion Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
      
      {/* Left Content Side */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="lg:col-span-6 z-10"
      >
        {/* Subtitle */}
        <motion.p 
          variants={fadeInUp}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-lime mb-4 font-sans"
        >
          Delicious. Fresh. Made For You.
        </motion.p>

        {/* Main Heading */}
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl sm:text-6xl lg:text-[72px] font-serif text-brand-text-main leading-[1.1] tracking-tight mb-6"
        >
          Good Food <br />
          Great <span className="text-brand-dark relative inline-block">
            Mood
            <svg className="absolute left-0 bottom-[-8px] w-full h-[6px] text-brand-lime" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={fadeInUp}
          className="text-brand-text-muted font-sans text-base sm:text-lg max-w-md leading-relaxed mb-8"
        >
          Experience a delightful journey of flavors made with fresh ingredients and a passion for perfection.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-4 mb-14 font-sans"
        >
          <button className="bg-brand-dark hover:opacity-95 text-brand-white px-6 py-3.5 rounded-lg font-medium flex items-center gap-2 group transition-all duration-300 shadow-md">
            Explore Menu
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="bg-brand-white hover:bg-brand-cream/50 border border-brand-text-light/20 text-brand-text-main px-6 py-3.5 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 shadow-sm">
            <span className="w-5 h-5 bg-brand-bg-green rounded-full flex items-center justify-center">
              <FiPlay className="w-3 h-3 text-brand-dark fill-current ml-0.5" />
            </span>
            Watch Video
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-brand-text-light/20 font-sans"
        >
          {[
            { icon: PiLeafBold, title: "Fresh Ingredients", desc: "Sourced Daily" },
            { icon: FaRegCompass, title: "Expert Chefs", desc: "Passionate & Skilled" },
            { icon: FaTruckFast, title: "Fast Delivery", desc: "On Time, Every Time" },
            { icon: LuBadgeCheck, title: "100% Quality", desc: "You Can Trust" },
          ].map((item, index) => (
            <motion.div variants={fadeInUp} key={index} className="flex flex-col items-start">
              <div className="p-2 bg-transparent rounded-lg mb-2 text-brand-lime">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-[13px] font-bold text-brand-text-main mb-0.5">{item.title}</h4>
              <p className="text-[11px] text-brand-text-light font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Visual Side */}
      <div className="lg:col-span-6 relative flex justify-center items-center">
        
        {/* Main Food Bowl Image Container */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[540px] aspect-square drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        >
          <Image
            src="/images/food-bowl.png" 
            alt="Delicious Pasta Bowl"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Floating Condiment Bowl */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-[10%] left-[10%] w-24 h-24 drop-shadow-md hidden sm:block"
        >
          <Image 
            src="/images/sauce-bowl.png" 
            alt="Sauce" 
            fill 
            className="object-contain"
          />
        </motion.div>

        {/* Ambient Leaves Elements */}
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-[45%] left-[5%] w-6 h-6 hidden sm:block"
        >
          <Image src="/images/leaf-1.png" alt="leaf" fill className="object-contain opacity-80" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[20%] left-[25%] w-8 h-8 hidden sm:block"
        >
          <Image src="/images/leaf-2.png" alt="leaf" fill className="object-contain opacity-80" />
        </motion.div>

        {/* Dynamic Social Floating Reviews Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute bottom-[8%] right-[2%] bg-brand-white p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-brand-bg-green/50 flex flex-col gap-1.5 min-w-[160px] font-sans"
        >
          <div className="flex items-center -space-x-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="w-7 h-7 rounded-full border-2 border-brand-white relative overflow-hidden bg-brand-cream">
                <Image 
                  src={`/images/user-${num}.jpg`} 
                  alt="Customer" 
                  fill 
                  className="object-cover" 
                />
              </div>
            ))}
            <div className="bg-brand-dark text-brand-white text-[9px] font-bold w-7 h-7 rounded-full border-2 border-brand-white flex items-center justify-center">
              4.8k+
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-brand-text-main">Happy Customers</p>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-3 h-3 text-brand-yellow" />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}