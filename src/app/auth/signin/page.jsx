"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";
import SocialAuth from "@/component/auth/SocialAuth";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // ---------------- STATE ----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => setIsVisible(!isVisible);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SIGN IN HANDLER ----------------
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success("Welcome back to Cookly! ❤️");
            router.push(redirectTo);
            router.refresh();
          },
          onError: (ctx) => {
            const errorMessage = ctx.error?.message || "Incorrect email or password.";
            toast.error(errorMessage);
            setErrors({ form: errorMessage });
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-brand-cream dark:bg-zinc-950 px-4 py-16 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="w-full max-w-lg bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[36px] shadow-[0_20px_50px_rgba(4,47,30,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-zinc-100 dark:border-zinc-800/80 p-8 md:p-12 relative z-10 transition-colors duration-300"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <span className="text-2xl mb-2 inline-block">🍽️</span>
          <h1 className="text-3xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome to Cookly
          </h1>
          <p className="text-sm font-sans text-brand-white-foreground dark:text-zinc-400 mt-2 font-medium">
            Sign in to explore recipes & manage your culinary space.
          </p>
        </div>

        {/* ERROR STATE ALERTS */}
        {errors.form && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-2xl flex items-center gap-3 text-rose-800 dark:text-rose-400 text-sm font-semibold"
          >
            <FiAlertCircle size={18} className="shrink-0" />
            <p className="text-left">{errors.form}</p>
          </motion.div>
        )}

        {/* FORM */}
        <form onSubmit={handleSignIn} className="space-y-6">

          {/* EMAIL */}
          <div className="space-y-2 text-left">
            <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 font-sans">
              Email Address
            </label>

            <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all duration-300 bg-brand-cream/20 dark:bg-zinc-950/40
              ${errors.email 
                ? "border-rose-400 dark:border-rose-900/60" 
                : "border-zinc-100 dark:border-zinc-800 focus-within:border-emerald-700 dark:focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-zinc-950"}`}>

              <FiMail className="text-zinc-400 shrink-0" size={18} />

              <input
                type="email"
                placeholder="name@example.com"
                className="w-full outline-none bg-transparent text-zinc-800 dark:text-zinc-100 text-sm font-medium placeholder-zinc-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {errors.email && (
              <p className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1">
                <FiAlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 font-sans">
                Password
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all duration-300 bg-brand-cream/20 dark:bg-zinc-950/40
              ${errors.password 
                ? "border-rose-400 dark:border-rose-900/60" 
                : "border-zinc-100 dark:border-zinc-800 focus-within:border-emerald-700 dark:focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-zinc-950"}`}>

              <FiLock className="text-zinc-400 shrink-0" size={18} />

              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none bg-transparent text-zinc-800 dark:text-zinc-100 text-sm font-medium placeholder-zinc-400 tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button 
                type="button" 
                onClick={toggleVisibility}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors shrink-0"
              >
                {isVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1">
                <FiAlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-emerald-800 dark:bg-emerald-700 hover:opacity-95 text-white font-bold h-12 rounded-2xl text-sm shadow-md transition-all duration-300"
            endContent={!isLoading && <FiArrowRight size={16} />}
          >
            {isLoading ? "Signing In..." : "Sign In to Cookly"}
          </Button>
        </form>

        {/* OR DIVIDER LINE */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <span className="relative px-3 bg-[#fbfbfa] dark:bg-zinc-900 rounded-full text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Or continue with
          </span>
        </div>

        {/* SOCIAL LOGIN MODULE */}
        <div className="mt-6">
          <SocialAuth />
        </div>

        {/* FOOTER REDIRECT */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8 font-medium">
          Don’t have an account yet?{" "}
          <Link
            href={`/auth/signup?redirect=${redirectTo}`}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
          >
            Sign Up Now
          </Link>
        </p>
      </motion.div>
    </section>
  );
}