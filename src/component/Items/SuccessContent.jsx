"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import Link from "next/link";
import { FiCheckCircle, FiMail, FiHash, FiDollarSign, FiArrowRight, FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SuccessContent({ customerEmail, subsIndfo }) {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FBFBFA] dark:bg-zinc-950 overflow-hidden flex items-center justify-center px-4 py-12 transition-colors duration-300">
      
      {/* Premium Confetti */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={350}
        gravity={0.15}
        colors={["#00B96D", "#10B981", "#34D399", "#FBBF24", "#F59E0B"]}
      />

      {/* Decorative Premium Glow Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      {/* Main Container Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
        className="w-full max-w-xl relative z-10"
      >
        {/* Main Card */}
        <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[40px] shadow-[0_30px_70px_rgba(4,47,30,0.06)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-zinc-100 dark:border-zinc-800/60 p-8 md:p-10 text-center transition-all duration-300">
          
          {/* Animated Animated Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 12 }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 rounded-[32px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner shadow-emerald-100/50 dark:shadow-none">
              <FiCheckCircle className="text-5xl" />
            </div>
          </motion.div>

          {/* Header Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50 mt-6"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium text-sm font-sans"
          >
            Woohoo! Your premium culinary experience has been activated.
          </motion.p>

          {/* Professional Receipt/Invoice Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-brand-cream/30 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl p-6 text-left space-y-4"
          >
            <div className="border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-3 flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 font-sans">
                Order Receipt
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Email Field */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500">
                <FiMail size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Account Email</p>
                <p className="text-zinc-800 dark:text-zinc-200 font-semibold text-sm mt-0.5 break-all">{customerEmail}</p>
              </div>
            </div>

            {/* Transaction ID Field */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500">
                <FiHash size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Transaction ID</p>
                <p className="text-zinc-800 dark:text-zinc-200 font-mono font-bold text-sm mt-0.5 select-all tracking-tight">
                  {subsIndfo?.transactionId || "N/A"}
                </p>
              </div>
            </div>

            {/* Total Paid Amount Field */}
            <div className="flex items-start gap-3 bg-white/60 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-3.5">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
                <FiDollarSign size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Amount Paid</p>
                  <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-0.5 font-medium">Cookly Premium Recipe Access</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-black text-emerald-800 dark:text-emerald-400">
                    ${subsIndfo?.recipePrice}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link
              href="/dashboard/user"
              className="group flex items-center justify-center gap-2 bg-emerald-800 dark:bg-emerald-700 text-white px-8 h-12 rounded-2xl font-bold text-sm shadow-md shadow-emerald-900/10 hover:opacity-95 transition-all duration-300 active:scale-[0.98]"
            >
              <span>Go To Dashboard</span>
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/recipes"
              className="flex items-center justify-center gap-2 border-2 border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 px-8 h-12 rounded-2xl font-bold text-sm bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 active:scale-[0.98]"
            >
              <FiBookOpen size={16} />
              <span>Browse Recipes</span>
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}