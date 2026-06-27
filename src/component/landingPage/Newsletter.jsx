"use client";

import React from "react";
import { Button } from "@heroui/react";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Newsletter() {
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
        className="max-w-7xl mx-auto bg-brand-bg-green dark:bg-zinc-900 rounded-[40px] p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl dark:shadow-black/30 border border-white dark:border-zinc-800 transition-colors duration-300"
      >
        {/* Left Side: Content info */}
        <div className="flex items-center gap-5 w-full lg:w-auto">
          <div className="w-14 h-14 rounded-full bg-brand-dark dark:bg-brand-lime text-white dark:text-zinc-950 flex items-center justify-center flex-shrink-0 shadow-md transition-colors duration-300">
            <FiMail size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-brand-cream-foreground font-bold transition-colors duration-300">
              Stay Updated
            </h3>
            <p className="text-brand-white-foreground dark:text-zinc-400 text-sm md:text-base font-sans mt-1 transition-colors duration-300">
              Subscribe to get special offers, new menu updates, and cooking tips.
            </p>
          </div>
        </div>

        {/* Right Side: Input & Action Button */}
        <div className="w-full lg:w-auto max-w-xl flex flex-col sm:flex-row items-center gap-3 flex-grow lg:justify-end">
          <div className="w-full sm:flex-grow max-w-md relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-brand-white dark:bg-zinc-950 text-brand-cream-foreground font-sans px-5 py-4 rounded-2xl border border-gray-200 dark:border-zinc-800 focus:outline-none focus:border-brand-dark dark:focus:border-brand-lime text-sm shadow-sm placeholder:text-brand-text-light dark:placeholder:text-zinc-600 transition-all"
            />
          </div>
          
          <Button
            className="w-full sm:w-auto bg-brand-dark dark:bg-brand-lime hover:opacity-90 text-white dark:text-zinc-950 font-sans font-semibold px-8 py-6 rounded-2xl transition-all duration-300 shadow-md"
          >
            Subscribe
          </Button>
        </div>
      </motion.div>
    </section>
  );
}