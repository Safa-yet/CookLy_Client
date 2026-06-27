"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { IoScaleOutline, IoFitnessOutline, IoLayersOutline, IoRestaurantOutline } from "react-icons/io5";

export default function SubscriptionAdvertise() {
  const tags = [
    { icon: <IoScaleOutline className="text-xl text-emerald-600" />, label: "Weight Loss" },
    { icon: <IoFitnessOutline className="text-xl text-emerald-600" />, label: "High Protein" },
    { icon: <IoLayersOutline className="text-xl text-emerald-600" />, label: "Balanced" },
    { icon: <IoRestaurantOutline className="text-xl text-emerald-600" />, label: "Meal Prep" },
  ];

  const weeklySchedule = [
    { day: "Saturday", cal: "1600 cal" },
    { day: "Monday", cal: "1700 cal" },
    { day: "Tuesday", cal: "1750 cal" },
    { day: "Wednesday", cal: "1600 cal" },
    { day: "Thursday", cal: "1650 cal" },
    { day: "Friday", cal: "1800 cal" },
  ];

  return (
    <div className="bg-brand-cream dark:bg-zinc-950 w-full">


    <section className="relative max-w-7xl mx-auto my-12 bg-brand-cream dark:bg-zinc-950 rounded-[40px] shadow-[0_30px_70px_rgba(4,47,30,0.03)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.3)] border border-zinc-100 dark:border-zinc-800/50 overflow-hidden transition-all duration-300 font-sans select-none">
      
      {/* Decorative Background Glows & Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Edge Fresh Ingredient Decoration Visual (Right Edge) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 opacity-20 dark:opacity-10 pointer-events-none hidden md:block">
        <Image 
          src="https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=600&auto=format&fit=crop"
          alt="Fresh ingredients decoration"
          fill
          className="object-cover object-right mix-blend-multiply dark:mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-14 items-center">
        
        {/* Left Side: Headline, Description & Grid Features */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Personalized Nutrition <br />
              Made <span className="text-emerald-500 dark:text-emerald-400">Simple</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-medium max-w-xl leading-relaxed">
              Get personalized meal plans tailored to your lifestyle, dietary preferences, and wellness goals. Each plan is designed by nutrition experts and easy to follow.
            </p>
          </motion.div>

          {/* 2x2 Clean Feature Grid Buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-xl">
            {tags.map((tag, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                key={index} 
                className="flex items-center gap-3.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-2xl p-4 transition-all duration-300 hover:shadow-md"
              >
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/20 shrink-0">
                  {tag.icon}
                </div>
                <span className="font-bold text-sm md:text-base text-zinc-800 dark:text-zinc-200">
                  {tag.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-2"
          >
            <Link
              href="/plans"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 h-14 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all duration-300 group active:scale-[0.98]"
            >
              <span>Start Your Meal Plan</span>
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Showcase Weekly Card Layout */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 65 }}
            className="bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-100 dark:border-zinc-800/60 p-6 md:p-8 shadow-[0_25px_60px_rgba(4,47,30,0.04)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
          >
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-6">
              Weekly Meal Plan
            </h3>

            {/* Day list with dot and line trackers */}
            <div className="space-y-4.5">
              {weeklySchedule.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 text-sm md:text-base">
                      {item.day}
                    </span>
                  </div>
                  <div className="grow border-b border-zinc-100 dark:border-zinc-800/80 h-1 mx-2" />
                  <span className="font-medium text-zinc-400 dark:text-zinc-500 text-sm md:text-base">
                    {item.cal}
                  </span>
                </div>
              ))}

              {/* Bottom Custom Badge Verifications */}
              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
                <div className="flex items-center gap-2 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-xl p-3 text-xs md:text-sm font-bold">
                  <FiCheck size={16} className="text-emerald-600 stroke-[3] shrink-0" />
                  <span>Designed around your lifestyle</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-xl p-3 text-xs md:text-sm font-bold">
                  <FiCheck size={16} className="text-emerald-600 stroke-[3] shrink-0" />
                  <span>Personalized to your goals</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
    </div>
  );
}