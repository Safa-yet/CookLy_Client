"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Form, Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUpload,
  FiArrowRight,
  FiAlertCircle,
  FiImage,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import SocialAuth from "@/component/auth/SocialAuth";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const uploadToImageBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    return result?.data?.display_url || result?.data?.url || "";
  };

  // ---------------- VALIDATION ----------------
  const validateForm = (formInfo) => {
    const newErrors = {};

    if (!formInfo.name) {
      newErrors.name = "Full name is required";
    }

    if (!formInfo.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formInfo.password) {
      newErrors.password = "Password is required";
    } else {
      if (formInfo.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (!/[A-Z]/.test(formInfo.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      }
      if (!/[a-z]/.test(formInfo.password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
      }
      if (!/[0-9]/.test(formInfo.password)) {
        newErrors.password = "Password must contain at least one number";
      }
    }

    if (!formInfo.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formInfo.password !== formInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const getFormInfo = Object.fromEntries(formData.entries());

    if (!validateForm(getFormInfo)) {
      toast.error("Please correct the form errors first.");
      return;
    }

    try {
      setLoading(true);

      let profileImage = "";

      // Upload Image To ImageBB
      if (imageFile) {
        profileImage = await uploadToImageBB(imageFile);
      }

      const userData = {
        name: getFormInfo.name,
        email: getFormInfo.email,
        password: getFormInfo.password,
        image: profileImage,
        role: "user",
        plan: "user_free",
        isBlocked: false,
        createdAt: new Date(),
      };

      console.log("Signup Data =>", userData);

      // ==========================
      // Better Auth Signup
      // ==========================
      const { data, error } = await authClient.signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        image: userData.image,
        role: userData.role,
        plan: userData.plan,
        isBlocked: userData.isBlocked,
        createdAt: userData.createdAt,
      });

      if (error) {
        toast.error(error.message || "Signup failed. Try again.");
        setErrors({ form: error.message });
        return;
      }

      toast.success("Account created successfully! Welcome to Cookly ❤️");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-brand-cream dark:bg-zinc-950 px-4 py-16 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorative Glow Bubbles */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="w-full max-w-2xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[40px] shadow-[0_20px_50px_rgba(4,47,30,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-zinc-100 dark:border-zinc-800/80 p-8 md:p-12 relative z-10 transition-colors duration-300"
      >
        <Form onSubmit={handleSubmit} className="w-full">
          <div className="w-full text-left">
            
            {/* HEADER */}
            <div className="text-center mb-8">
              <span className="text-2xl mb-2 inline-block">🌿</span>
              <h1 className="text-4xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Join Cookly
              </h1>
              <p className="text-sm font-sans text-brand-white-foreground dark:text-zinc-400 mt-2 font-medium">
                Create your account, explore recipes & join our culinary community.
              </p>
            </div>

            {/* ERROR STATE ALERT */}
            {errors.form && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-2xl flex items-center gap-3 text-rose-800 dark:text-rose-400 text-sm font-semibold"
              >
                <FiAlertCircle size={18} className="shrink-0" />
                <p>{errors.form}</p>
              </motion.div>
            )}

            <div className="space-y-6">
              
              {/* PROFILE PHOTO IMAGE UPLOADER */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 font-sans">
                  Profile Photo
                </label>

                <label className="mt-2 h-48 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-500 dark:hover:border-emerald-600 bg-brand-cream/20 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-950 relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {preview ? (
                    <div className="w-full h-full relative">
                      <Image
                        src={preview}
                        alt="preview Avatar"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 p-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                        <FiUpload size={20} />
                      </div>
                      <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                        Upload Profile Image
                      </p>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        Supports PNG, JPG, or WEBP formats
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* FULL NAME */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 font-sans">
                  Full Name
                </label>
                <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all duration-300 bg-brand-cream/20 dark:bg-zinc-950/40
                  ${errors.name 
                    ? "border-rose-400 dark:border-rose-900/60" 
                    : "border-zinc-100 dark:border-zinc-800 focus-within:border-emerald-700 dark:focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-zinc-950"}`}>
                  <FiUser className="text-zinc-400 shrink-0" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Safayet"
                    className="w-full outline-none bg-transparent text-zinc-800 dark:text-zinc-100 text-sm font-medium placeholder-zinc-400"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
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
                    name="email"
                    placeholder="you@example.com"
                    className="w-full outline-none bg-transparent text-zinc-800 dark:text-zinc-100 text-sm font-medium placeholder-zinc-400"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD AND CONFIRM PASSWORD GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 font-sans">
                    Password
                  </label>
                  <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all duration-300 bg-brand-cream/20 dark:bg-zinc-950/40
                    ${errors.password 
                      ? "border-rose-400 dark:border-rose-900/60" 
                      : "border-zinc-100 dark:border-zinc-800 focus-within:border-emerald-700 dark:focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-zinc-950"}`}>
                    <FiLock className="text-zinc-400 shrink-0" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="w-full outline-none bg-transparent text-zinc-800 dark:text-zinc-100 text-sm font-medium placeholder-zinc-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors shrink-0"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1 leading-normal">
                      <FiAlertCircle size={12} className="shrink-0 mt-0.5" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 font-sans">
                    Confirm Password
                  </label>
                  <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all duration-300 bg-brand-cream/20 dark:bg-zinc-950/40
                    ${errors.confirmPassword 
                      ? "border-rose-400 dark:border-rose-900/60" 
                      : "border-zinc-100 dark:border-zinc-800 focus-within:border-emerald-700 dark:focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-zinc-950"}`}>
                    <FiLock className="text-zinc-400 shrink-0" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="w-full outline-none bg-transparent text-zinc-800 dark:text-zinc-100 text-sm font-medium placeholder-zinc-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors shrink-0"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.confirmPassword}
                    </p>
                  )}
                </div>

              </div>

              {/* ACTION REGISTRATION SUBMIT BUTTON */}
              <Button
                type="submit"
                isLoading={loading}
                className="w-full h-12 bg-emerald-800 dark:bg-emerald-700 hover:opacity-95 text-white font-bold rounded-2xl text-sm shadow-md transition-all duration-300 mt-4"
                endContent={!loading && <FiArrowRight size={16} />}
              >
                {loading ? "Creating Account..." : "Create Cookly Account"}
              </Button>

            </div>
          </div>
        </Form>

        {/* CONTINGENCY DIVIDER LAYOUT */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <span className="relative px-3 bg-[#fbfbfa] dark:bg-zinc-900 rounded-full text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Or Register with
          </span>
        </div>

        {/* SOCIAL AUTH COMPONENT */}
        <div className="mt-6">
          <SocialAuth />
        </div>

        {/* FOOTER REDIRECT */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8 font-medium">
          Already have an account?{" "}
          <Link
            href={`/auth/signin?redirect=${redirectTo}`}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline ml-1"
          >
            Sign In Instead
          </Link>
        </p>

      </motion.div>
    </section>
  );
}